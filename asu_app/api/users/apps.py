from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'api.users'
    label = 'users'  # это важно!
    verbose_name = 'Работа с пользователями'
