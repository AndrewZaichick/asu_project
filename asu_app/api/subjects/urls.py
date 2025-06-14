from rest_framework import routers  # DRF-роутер для автоматической генерации CRUD-маршрутов

# Импорт ViewSet-классов, реализующих бизнес-логику для всех сущностей
from api.subjects.views import (
    SubjectViewSet,   # Предметы
    SemesterViewSet,  # Семестры
    LabViewSet,       # Лабораторные
    LectureViewSet,   # Лекции
    FolderViewSet,    # Папки
    FileViewSet       # Файлы
)

from django.urls import path, include  # Подключение маршрутов к основному urls.py


# Создаём роутер и регистрируем маршруты для каждого ViewSet'а
router = routers.DefaultRouter()

# Каждый вызов .register() создаёт набор стандартных маршрутов (list, retrieve, create, update, destroy)
router.register(r'subjects', SubjectViewSet)      # /subjects/
router.register(r'semesters', SemesterViewSet)    # /semesters/
router.register(r'labs', LabViewSet)              # /labs/
router.register(r'lectures', LectureViewSet)      # /lectures/
router.register(r'folders', FolderViewSet)        # /folders/
router.register(r'files', FileViewSet)            # /files/

# Общий список маршрутов, подключаем их в корень текущего модуля
urlpatterns = [
    path('', include(router.urls)),  # Включаем все маршруты, сгенерированные роутером
]
