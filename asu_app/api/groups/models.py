# Импорт моделей Django ORM
from django.db import models
# Импорт reverse для генерации URL-ов по именам маршрутов
from django.shortcuts import reverse


# Модель Group — представляет учебную группу студентов
class Group(models.Model):
    # Название группы (например, "АСОИ-211")
    name = models.CharField(
        max_length=30,
        verbose_name='Название'  # Название поля в админке
    )

    # Связь с моделью Speciality (многие группы могут относиться к одной специальности)
    speciality = models.ForeignKey(
        'Speciality',               # Ссылаемся на модель ниже (можно и без кавычек, но так надёжнее при переименованиях)
        on_delete=models.SET_NULL,  # При удалении специальности — не удалять группы, а установить null
        null=True,                  # Разрешено отсутствие специальности
        related_name='groups',      # Обратная связь: speciality.groups.all()
        verbose_name='Специальность'
    )

    # Метод возвращает URL для генерации отчёта по данной группе
    def get_report_url(self):
        return reverse('group_report', kwargs={'group_id': self.id})

    # Человекочитаемое представление объекта (например, в админке)
    def __str__(self):
        return 'Группа "{}"'.format(self.name)

    class Meta:
        verbose_name = 'Группа'            # Название модели в единственном числе
        verbose_name_plural = 'Группы'     # Название модели во множественном числе


# Модель Speciality — представляет учебную специальность (например, "Информационные системы")
class Speciality(models.Model):
    # Название специальности
    name = models.CharField(
        max_length=150,
        verbose_name='Название'
    )

    def __str__(self):
        return 'Специальность "{}"'.format(self.name)

    class Meta:
        verbose_name = 'Специальность'
        verbose_name_plural = 'Специальности'
