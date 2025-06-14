from rest_framework import serializers
from api.simple_tests.models import Test, Question, AnswerOption, TestsResult, AnswerResult


# Простой сериализатор для базовой информации о тесте
class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'  # Включаем все поля модели


# Сериализатор для варианта ответа (используется внутри вопроса)
class AnswerOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerOption
        fields = ('answer', 'id')  # Только текст ответа и его ID


# Сериализатор для вопроса с вложенными вариантами ответов
class QuestionSerializer(serializers.ModelSerializer):
    # Вложенные варианты ответов (только для чтения)
    answers = AnswerOptionSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('question', 'image', 'answers', 'id')  # Только нужные поля


# Сериализатор для детального отображения теста с вопросами
class TestDetailSerializer(serializers.ModelSerializer):
    # Вложенные вопросы
    questions = QuestionSerializer(read_only=True, many=True)

    class Meta:
        model = Test
        fields = '__all__'  # Можно заменить на конкретные поля при необходимости


# Сериализатор результатов теста (для отображения таблиц и журналов)
class TestResultSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='test.name', read_only=True)  # Название теста
    outer_url = serializers.CharField(source='test.outer_url', read_only=True)  # URL, если тест внешний
    student = serializers.SerializerMethodField()  # Читабельное имя студента
    group = serializers.SerializerMethodField()    # Название группы студента

    class Meta:
        model = TestsResult
        fields = ['id', 'mark', 'completion_date', 'test', 'student', 'name', 'outer_url', 'student', 'group']  # noqa

    # Получение ФИО студента
    @staticmethod
    def get_student(instance):
        return f'{instance.student.last_name} {instance.student.first_name}'

    # Получение группы студента, если есть
    @staticmethod
    def get_group(instance):
        if getattr(instance.student, 'group'):
            return instance.student.group.name


# Сериализатор для одного варианта ответа с информацией, был ли выбран и был ли верным
class AnswerResultSerializer(serializers.ModelSerializer):
    answer = serializers.CharField(read_only=True, source="answer_text")  # Переименование поля

    class Meta:
        model = AnswerResult
        fields = ('is_right', 'is_checked', 'answer', 'id')


# Сериализатор для вопроса с результатами по каждому варианту ответа
class QuestionResultSerializer(serializers.ModelSerializer):
    answers_res = AnswerResultSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('question', 'image', 'answers_res', 'id')


# Сериализатор для теста, включающего результаты по каждому вопросу
class TestForResultSerializer(serializers.ModelSerializer):
    questions = QuestionResultSerializer(read_only=True, many=True)

    class Meta:
        model = Test
        fields = '__all__'


# Детальный сериализатор результата теста — включает вложенный тест с вопросами и ответами
class TestResultDetailSerializer(serializers.ModelSerializer):
    test = TestForResultSerializer()

    class Meta:
        model = TestsResult
        fields = '__all__'
