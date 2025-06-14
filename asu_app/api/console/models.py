# Импорт модели из Django ORM
from django.db import models
# Импорт функции reverse для генерации URL-ов по именам маршрутов
from django.shortcuts import reverse


# Модель MainCommands описывает основную команду, которую можно задавать для устройства
class MainCommands(models.Model):
    # Название команды (уникальное)
    command_name = models.CharField(
        max_length=150,  # Максимальная длина строки
        unique=True,     # Названия не могут повторяться
        verbose_name='Команда'  # Отображаемое имя поля в админке
    )
    # Текстовое описание команды
    description = models.TextField(verbose_name='Описание')

    # Метод для строкового представления модели (удобно при отладке и отображении в админке)
    def __str__(self):
        return 'Команда "{}"'.format(self.command_name)

    # Метод для получения абсолютного URL (используется в шаблонах и ссылках)
    def get_absolute_url(self):
        return reverse('command_detail', kwargs={'com_id': self.id})

    # Метод возвращает URL для изменения команды в админке
    def get_update_url(self):
        return '/admin/console/maincommands/{}/change/'.format(self.id)

    # Метод возвращает URL для удаления команды в админке
    def get_delete_url(self):
        return '/admin/console/maincommands/{}/delete/'.format(self.id)

    # Метаинформация для админки
    class Meta:
        verbose_name = 'Команда'  # Название в единственном числе
        verbose_name_plural = 'Команды'  # Название во множественном числе


# Модель Subcommands описывает подкоманды, которые относятся к конкретной основной команде
class Subcommands(models.Model):
    # Связь с основной командой (многие к одному)
    command_id = models.ForeignKey(
        MainCommands,               # Ссылаемся на модель MainCommands
        on_delete=models.CASCADE,   # При удалении команды — удаляются и все её подкоманды
        verbose_name='Название',    # Название поля в админке
        related_name='subcommands'  # Название для обратной связи: maincommand.subcommands.all()
    )
    # Название подкоманды
    subcommand_name = models.CharField(
        max_length=150,
        verbose_name='Подкоманда'
    )
    # Описание подкоманды
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return 'Подкоманда "{}" к {}'.format(
            self.subcommand_name, self.command_id)

    class Meta:
        verbose_name = 'Подкоманда'
        verbose_name_plural = 'Подкоманды'


# Модель Devices описывает устройство, к которому можно применять команды
class Devices(models.Model):
    name = models.CharField(
        max_length=80,
        verbose_name='Название устройства',
        unique=True  # Название устройства должно быть уникальным
    )
    host = models.CharField(
        max_length=50,
        verbose_name='Хост'  # IP-адрес или DNS-имя устройства
    )
    port = models.CharField(
        max_length=20,
        default="",
        verbose_name='Порт',
        unique=True  # Предполагается, что комбинация хост:порт уникальна
    )
    username = models.CharField(
        max_length=150,
        default="",
        verbose_name='Имя пользователя'  # Логин для подключения к устройству
    )
    password = models.CharField(
        max_length=150,
        verbose_name='Пароль'  # Пароль для подключения (в открытом виде, можно улучшить)
    )

    def __str__(self):
        return 'Устройство "{}" на {}:{}'.format(
            self.name, self.host, self.port)

    def get_absolute_url(self):
        return reverse('device_detail', kwargs={'dev_id': self.id})

    def get_update_url(self):
        return '/admin/console/devices/{}/change/'.format(self.id)

    def get_delete_url(self):
        return '/admin/console/devices/{}/delete/'.format(self.id)

    class Meta:
        verbose_name = 'Устройство'
        verbose_name_plural = 'Устройства'
