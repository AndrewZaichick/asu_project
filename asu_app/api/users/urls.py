from rest_framework import routers  # Импорт роутеров для генерации CRUD-маршрутов
from api.users.views import UserViewSet  # ViewSet для пользователей
from django.urls import path, include  # Стандартные функции Django для маршрутизации
from api.users.views import RegisterUser, LoginView, TeacherCreateView  # Дополнительные APIView'шки



# Создаём DRF-роутер для автоматического создания маршрутов к UserViewSet
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)  # /users/ — список, создание, обновление, удаление пользователей


# Основной список маршрутов, объединяющий:
# 1) CRUD-операции через ViewSet
# 2) Явно указанные пути для регистрации, логина и создания преподавателя
urlpatterns = [
    path('', include(router.urls)),  # Включаем все маршруты, созданные роутером (/users/ и др.)
    
    # POST /register/ — регистрация нового пользователя (обычно студента)
    path('register/', RegisterUser.as_view(), name='register'),

    # POST /token-auth/ — авторизация по логину и паролю (возвращает токен)
    path('token-auth/', LoginView.as_view(), name='token-auth'),

    # POST /create-teacher/ — отдельная точка для создания преподавателя (с выдачей прав)
    path('create-teacher/', TeacherCreateView.as_view(), name='create-teacher'),
]

