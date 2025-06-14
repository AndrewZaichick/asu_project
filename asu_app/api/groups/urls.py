# Импорт роутера из Django REST Framework — позволяет автоматически генерировать стандартные маршруты
from rest_framework import routers

# Импорт ViewSet-классов, которые реализуют CRUD-операции
from api.groups.views import GroupViewSet, SpecialityViewSet

# Импорт стандартных функций Django для маршрутизации
from django.urls import path, include


# Создаём экземпляр роутера, который автоматически сгенерирует маршруты для ViewSet'ов
router = routers.DefaultRouter()

# Регистрируем маршруты:
# /groups/ — список и создание групп, /groups/{id}/ — детали, обновление и удаление
router.register(r'groups', GroupViewSet)

# /specialities/ — список и создание специальностей, /specialities/{id}/ — детали, обновление и удаление
router.register(r'specialities', SpecialityViewSet)

# Объединяем все маршруты в список URL-шаблонов
urlpatterns = [
    path('', include(router.urls)),  # Подключаем сгенерированные маршруты в корень URL-пространства
]
