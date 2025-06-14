from datetime import datetime

import pytz  # Для работы с timezone-aware временем
from django.core.cache import cache  # Используется для хранения времени теста
from django.db.models import Q  # Для сложной фильтрации
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from api.simple_tests.models import Test, TestsResult, AnswerResult
from api.simple_tests.serializers import (
    TestSerializer,
    TestDetailSerializer,
    TestResultSerializer,
    TestResultDetailSerializer,
)
from api.users.models import UserRole
from asu_app.custom_permissions import ReadOnly


class TestViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Test.objects.all().distinct()
    serializer_class = TestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['lab', 'lecture']  # Позволяет фильтровать тесты по лекции и лабораторной

    # Возвращаем другой сериализатор, если запрашивают детальный просмотр
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TestDetailSerializer
        return self.serializer_class

    # Получение теста студентом с проверкой доступности и расчётом оставшегося времени
    def retrieve(self, request, pk=None):
        test = Test.objects.prefetch_related('questions__answers').get(pk=pk)
        serializer = TestDetailSerializer(test)

        # Проверка доступности теста по времени
        now = datetime.now().replace(tzinfo=pytz.UTC)
        start_date = test.start_date.replace(tzinfo=pytz.UTC)
        end_date = test.end_date.replace(tzinfo=pytz.UTC)
        if start_date > now or end_date < now:
            return Response({'message': 'В данный момент тест недоступен.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Проверка попыток — если студент уже прошёл все доступные попытки
        test_results = TestsResult.objects.filter(test=test, student=request.user)
        if len(test_results) == int(test.attempts):
            return Response({'message': 'Вы потратили все попытки на выполнение этого теста.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Ключи кеша для времени теста и момента начала
        test_time_key = f'timer_test_{test.id}_{request.user.id}'
        test_date_key = f'date_test_{test.id}_{request.user.id}'

        # Если студент впервые начинает тест — создаём запись в кеше
        if not cache.get(test_time_key):
            cache.set(test_time_key, test.timer * 60, test.timer * 60 * 2)
            cache.set(test_date_key, datetime.now().timestamp(), test.timer * 60 * 2)

        # Вычисление оставшегося времени
        estimated_time = int(cache.get(test_time_key) -
                             (datetime.now().timestamp() - cache.get(test_date_key)))

        data = {'estimated_time': estimated_time}
        data.update(serializer.data)
        return Response(data, status=status.HTTP_200_OK)

    # Обработка результатов теста (отправка ответов)
    def update(self, request, pk=None):
        test = Test.objects.prefetch_related('questions__answers').get(pk=pk)

        # Очистка кеша времени
        test_time_key = f'timer_test_{test.id}_{request.user.id}'
        test_date_key = f'date_test_{test.id}_{request.user.id}'
        cache.delete(test_time_key)
        cache.delete(test_date_key)

        max_weight = 0
        result_weight = 0
        answers_results = []

        # Расчёт оценки
        for question in test.questions.all():
            max_weight += question.weight
            answers = set(request.data.get(f'question_{question.id}'))
            if not answers:
                continue

            answers_max_weight = 0
            answers_result_weight = 0

            # Подсчёт веса правильных и неправильных ответов
            for answer in question.answers.all():
                if answer.is_right:
                    answers_max_weight += answer.weight
                if answer.answer in answers:
                    answers_result_weight += answer.weight

                # Сохраняем результат по каждому варианту ответа
                answers_results.append(AnswerResult(
                    question=question,
                    is_right=answer.is_right,
                    is_checked=answer.answer in answers,
                    answer_text=answer.answer,
                ))

            # Обнуляем отрицательные значения
            if answers_result_weight < 0:
                answers_result_weight = 0

            # Учитываем вес вопроса при подсчёте итогов
            result_weight += question.weight * (answers_result_weight / answers_max_weight)

        # Вычисляем оценку
        result_mark = round((result_weight / max_weight) * 10, 2) if max_weight else 0
        mark = -1 if test.is_outer else result_mark

        # Сохраняем результат теста
        result = TestsResult.objects.create(student=request.user, test=test, mark=mark)

        # Сохраняем результаты по каждому варианту
        for answer_result in answers_results:
            answer_result.test_result = result
            answer_result.save()

        serializer = TestResultSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Ограничение видимости тестов в зависимости от роли пользователя
    def get_queryset(self):
        if self.request.user.is_superuser:
            return Test.objects.all().distinct()

        if self.request.user.role == UserRole.STUDENT:
            return Test.objects.filter(
                Q(lab__semester__subject__allowed_specialities__groups__in=[self.request.user.group]) |
                Q(lecture__semester__subject__allowed_specialities__groups__in=[self.request.user.group])
            ).prefetch_related(
                'lab__semester__subject__allowed_specialities__groups',
                'lecture__semester__subject__allowed_specialities__groups'
            ).distinct()

        return Test.objects.filter(
            Q(lab__semester__subject__in=self.request.user.teacher_subjects.all()) |
            Q(lecture__semester__subject__in=self.request.user.teacher_subjects.all())
        ).prefetch_related(
            'lab__semester__subject',
            'lecture__semester__subject'
        ).distinct()


class TestResultViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = TestsResult.objects.all().select_related('student__group', 'test')
    serializer_class = TestResultSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student', 'student__group', 'test']  # Фильтрация по студенту, группе и тесту

    # Просмотр детального результата теста (включает ответы)
    def retrieve(self, request, pk=None):
        result = TestsResult.objects.prefetch_related(
            'student', 'test__questions__answers_results'
        ).get(pk=pk)

        # Привязываем ответы к каждому вопросу вручную
        for question in result.test.questions.all():
            question.answers_res = question.answers_results.filter(test_result__id=pk).all()

        serializer = TestResultDetailSerializer(result)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Ограничение выборки результатов по ролям
    def get_queryset(self):
        if self.request.user.is_superuser:
            return TestsResult.objects.all().select_related('student__group', 'test')

        if self.request.user.role == UserRole.TEACHER:
            return TestsResult.objects.filter(
                Q(test__lab__semester__subject__in=self.request.user.teacher_subjects.all()) |
                Q(test__lecture__semester__subject__in=self.request.user.teacher_subjects.all())
            ).select_related('student__group', 'test').distinct()

        return TestsResult.objects.filter(
            student=self.request.user
        ).select_related('student__group', 'test').distinct()
