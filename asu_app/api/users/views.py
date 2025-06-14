from rest_framework import viewsets  # Базовый класс для ViewSet'ов
from api.users.models import User, UserRole  # Модель пользователя и enum ролей
from api.users.serializers import UserSerializer, UserDetailSerializer, TeacherSerializer  # Сериализаторы
from rest_framework.views import APIView  # Для отдельных действий (регистрация, логин и т.п.)
from rest_framework.response import Response  # Для возврата ответа клиенту
from rest_framework import status  # HTTP-статусы (200, 400, 404 и т.п.)
from django.contrib.auth import authenticate  # Проверка логина/пароля
from rest_framework.authtoken.models import Token  # Используется для выдачи токенов
from rest_framework.permissions import AllowAny, IsAdminUser  # Разрешения
from django_filters.rest_framework import DjangoFilterBackend  # Фильтрация по полям в списке пользователей

from asu_app.custom_permissions import ReadOnlyIfTeacher  # Кастомное разрешение: преподавателям только чтение



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser | ReadOnlyIfTeacher]  # Админ — полный доступ, преподаватель — только просмотр
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['group', 'role']  # Фильтрация по группе и роли

    def get_queryset(self):
        if self.request.user.is_superuser:
            # Админ видит всех пользователей
            return User.objects.all().select_related('group')

        if self.request.user.role == UserRole.TEACHER:
            # Преподаватель видит только студентов, привязанных к его предметам
            return (
                User.objects
                .filter(role=UserRole.STUDENT)
                .filter(
                    group__speciality__allowed_subjects__in=self.request.user.teacher_subjects.all()
                )
                .select_related('group')
                .distinct()
            )



class RegisterUser(APIView):
    permission_classes = [AllowAny]  # Доступно всем (в том числе неавторизованным)

    def post(self, request, format='json'):
        serializer = UserDetailSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response([], status=status.HTTP_201_CREATED)  # Успешно создан
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]  # Доступно всем

    def post(self, request, format='json'):
        serializer = UserDetailSerializer(data=request.data)
        # Аутентификация по логину и паролю
        user = authenticate(
            username=serializer.initial_data.get("username"),
            password=serializer.initial_data.get("password")
        )

        if not user:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)

        # Если пользователь найден — получаем/создаём токен
        serializer = UserDetailSerializer(user)
        token, _ = Token.objects.get_or_create(user=user)

        # Возвращаем токен + данные пользователя
        json = {'token': token.key}
        json.update(serializer.data)

        return Response(json, status=status.HTTP_200_OK)



class TeacherCreateView(APIView):
    permission_classes = [IsAdminUser]  # Только админ может создавать преподавателей

    def post(self, request, format='json'):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response([], status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

