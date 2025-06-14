"""
WSGI config for asu_app project.

Этот файл содержит конфигурацию WSGI (Web Server Gateway Interface) для запуска проекта Django
в продакшене с использованием серверов, поддерживающих WSGI, таких как Gunicorn, uWSGI и др.

Документация:
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os  # Работа с переменными окружения и путями

from django.core.wsgi import get_wsgi_application  # Функция, создающая WSGI-приложение

# Ниже закомментирован код, который можно использовать, если требуется вручную добавить путь до папки 'api'
# Это может понадобиться при специфической структуре проекта или ошибках импорта
# app_path = os.path.abspath(os.path.join(
#     os.path.dirname(os.path.abspath(__file__)), os.pardir))
# sys.path.append(os.path.join(app_path, 'api'))

# Устанавливаем путь к модулю настроек Django по умолчанию
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asu_app.settings')

# Получаем объект WSGI-приложения, который будет использоваться сервером
application = get_wsgi_application()
