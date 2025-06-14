# Импорт базового класса ModelViewSet из Django REST Framework
from rest_framework import viewsets

# Импорт моделей
from api.groups.models import Group, Speciality

# Импорт сериализаторов
from api.groups.serializers import GroupSerializer, SpecialitySerializer

# Импорт классов прав доступа
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from asu_app.custom_permissions import ReadOnly  # Кастомное разрешение: только чтение для определённых ролей

# Импорт модели пользователя (используется для фильтрации по роли)
from api.users.models import UserRole


# ViewSet для модели Group — включает все CRUD-операции и фильтрацию по роли преподавателя
class GroupViewSet(viewsets.ModelViewSet):
    # Доступ: администратор — полный доступ, все остальные — только чтение
    permission_classes = [IsAdminUser | ReadOnly]

    # Базовый запрос — выбираем группы с привязанной специальностью
    queryset = Group.objects.all().select_related('speciality').distinct()
    serializer_class = GroupSerializer

    # Переопределяем queryset, чтобы фильтровать данные в зависимости от роли пользователя
    def get_queryset(self):
        # Если пользователь — суперпользователь или анонимный — получаем все группы
        if self.request.user.is_superuser or self.request.user.is_anonymous:
            return Group.objects.all().select_related('speciality').distinct()

        # Если преподаватель — возвращаем только те группы, которые связаны с его учебными дисциплинами
        if self.request.user.role == UserRole.TEACHER:
            return (
                Group.objects
                .filter(speciality__allowed_subjects__in=self.request.user.teacher_subjects.all())
                .select_related('speciality')
                .distinct()
            )


# ViewSet для модели Speciality — полный CRUD-доступ для админов, остальным только чтение
class SpecialityViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = Speciality.objects.all()
    serializer_class = SpecialitySerializer
