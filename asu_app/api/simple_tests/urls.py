# Импорт роутеров из Django REST Framework — автоматическое создание стандартных маршрутов
from rest_framework import routers

# Импорт ViewSet-классов для тестов и их результатов
from api.simple_tests.views import (
    TestViewSet,         # CRUD-операции над тестами
    TestResultViewSet,   # CRUD-операции над результатами тестов
)

# Импорт утилит Django для маршрутизации
from django.urls import path, include


# Создаём объект роутера, который автоматически генерирует маршруты для ViewSet'ов
router = routers.DefaultRouter()
router.register(r'tests', TestViewSet)                # /tests/
router.register(r'tests-results', TestResultViewSet)  # /tests-results/

# Объединяем все маршруты в список URL-шаблонов
urlpatterns = [
    path('', include(router.urls)),  # Подключаем сгенерированные маршруты в корневую точку этого приложения
]
