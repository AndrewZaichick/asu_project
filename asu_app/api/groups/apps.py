# Импорт базового класса конфигурации приложения из Django
from django.apps import AppConfig


# Класс конфигурации для приложения "groups"
class GroupsConfig(AppConfig):
    # Полное имя Python-пакета приложения, используется Django для регистрации
    name = 'api.groups'

    # Человекочитаемое имя, которое будет отображаться в административной панели
    verbose_name = 'Управление группами'
