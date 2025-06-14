"""asu_app URL Configuration

Этот файл отвечает за маршрутизацию URL-адресов в проекте Django.
Базовый путь: http://<host>/

Для дополнительной информации:
https://docs.djangoproject.com/en/3.0/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include, re_path  # Подключаем функции для маршрутизации
from rest_framework.authtoken.views import obtain_auth_token  # Вьюха для получения токена по логину и паролю
from django.conf import settings
from django.conf.urls.static import static  # Для отдачи статических и медиафайлов в режиме разработки

# Список путей API, включающий маршруты из всех внутренних модулей
apipatterns = [
    path('', include('api.users.urls')),        # Пользователи: регистрация, аутентификация, управление
    path('', include('api.groups.urls')),       # Группы и специальности
    path('', include('api.subjects.urls')),     # Предметы, семестры, лабораторные, лекции и файлы
    path('', include('api.console.urls')),      # Консольные команды и устройства
    path('', include('api.simple_tests.urls')), # Простые тесты и результаты
]

# Основные маршруты проекта
urlpatterns = [
    path('admin/', admin.site.urls),  # Админка Django по адресу /admin/
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # Эндпоинт для получения токена
    path('api/', include((apipatterns, 'api'), namespace='api')),  # Включаем все пути из apipatterns под префиксом /api/
    re_path(r'^_nested_admin/', include('nested_admin.urls'))  # Поддержка вложенного админ-интерфейса
]

# Добавление поддержки отдачи медиафайлов и статики в режиме DEBUG
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Настройка заголовков административной панели
admin.site.site_header = 'Управление платформой кафедры АСУ'
admin.site.index_title = 'Панель администрирования'
admin.site.site_title = 'Управление платформой кафедры АСУ'
