from django.db import models
from django.shortcuts import reverse  # Используется для генерации URL-ов в методах моделей
from api.groups.models import Speciality  # Импорт модели специальности для связи с предметами
from django.conf import settings  # Для получения значения из конфигурации (например, ID системной дисциплины)


# Модель учебной дисциплины
class Subject(models.Model):
    name = models.CharField(
        max_length=150,
        unique=True,
        verbose_name='Название'  # Название предмета
    )
    allowed_specialities = models.ManyToManyField(
        Speciality,
        related_name='allowed_subjects',  # Обратная связь: speciality.allowed_subjects.all()
        verbose_name='Специальности, которым доступна данная дисциплина'
    )

    # Флаг: разрешена ли работа с консолью на этом предмете (например, системное администрирование)
    @property
    def allow_console(self):
        return True if self.id == settings.SYSTEM_ADMINISTRATION_SUBJECT_ID else False

    def __str__(self):
        return f'Предмет: "{self.name}"'

    class Meta:
        verbose_name = 'Предмет (учебная дисциплина)'
        verbose_name_plural = 'Предметы (учебные дисциплины)'


# Модель семестра (привязан к конкретному предмету)
class Semester(models.Model):
    name = models.CharField(max_length=30, verbose_name='Название')
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,  # При удалении предмета удаляются все его семестры
        related_name='semesters',
        verbose_name='Предмет'
    )

    # URL для папок
    def get_absolute_url(self):
        return reverse('folders', kwargs={
            'subj_id': self.subject.id,
            'sem_id': self.id
        })

    # URL для лабораторных работ
    def get_labs_url(self):
        return reverse('labs', kwargs={
            'subj_id': self.subject.id,
            'sem_id': self.id
        })

    # URL для лекций
    def get_lectures_url(self):
        return reverse('lectures', kwargs={
            'subj_id': self.subject.id,
            'sem_id': self.id
        })

    # URL для редактирования и удаления в админке
    def get_update_url(self):
        return f'/admin/labs/semester/{self.id}/change/'

    def get_delete_url(self):
        return f'/admin/labs/semester/{self.id}/delete/'

    def __str__(self):
        return f'Семестр: "{self.name}", {self.subject}'

    class Meta:
        verbose_name = 'Семестр'
        verbose_name_plural = 'Семестры'


# Модель лабораторной работы
class Lab(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название')
    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name='labs',
        verbose_name='Семестр'
    )
    file = models.FileField(upload_to='labs/', verbose_name='Файл(лаба)')

    # URL для страницы лабораторной
    def get_absolute_url(self):
        return reverse('lab_detail', kwargs={
            'subj_id': self.semester.subject.id,
            'sem_id': self.semester.id,
            'lab_id': self.id
        })

    # URL для тестов, привязанных к лабораторной
    def get_lab_tests_url(self):
        return reverse('tests_list', kwargs={
            'subj_id': self.semester.subject.id,
            'sem_id': self.semester.id,
            'lab_id': self.id
        })

    def get_update_url(self):
        return f'/admin/labs/lab/{self.id}/change/'

    def get_delete_url(self):
        return f'/admin/labs/lab/{self.id}/delete/'

    def __str__(self):
        return f'Лаба "{self.name}", {self.semester}'

    class Meta:
        verbose_name = 'Лабораторная работа'
        verbose_name_plural = 'Лабораторные работы'


# Модель лекции
class Lecture(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название')
    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name='lectures',
        verbose_name='Семестр'
    )
    file = models.FileField(upload_to='lectures/', verbose_name='Файл(лекция)')

    def get_absolute_url(self):
        return reverse('lecture_detail', kwargs={
            'subj_id': self.semester.subject.id,
            'sem_id': self.semester.id,
            'lecture_id': self.id
        })

    def get_lecture_tests_url(self):
        return reverse('tests_list', kwargs={
            'subj_id': self.semester.subject.id,
            'sem_id': self.semester.id,
            'lecture_id': self.id
        })

    def get_update_url(self):
        return f'/admin/labs/lecture/{self.id}/change/'

    def get_delete_url(self):
        return f'/admin/labs/lecture/{self.id}/delete/'

    def __str__(self):
        return f'Лекция "{self.name}", {self.semester}'

    class Meta:
        verbose_name = 'Лекция'
        verbose_name_plural = 'Лекции'


# Модель папки, содержащей дополнительные файлы
class Folder(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название')
    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name='folders',
        verbose_name='Семестр'
    )

    def get_absolute_url(self):
        return reverse('folder_detail', kwargs={
            'subj_id': self.semester.subject.id,
            'sem_id': self.semester.id,
            'folder_id': self.id
        })

    def get_update_url(self):
        return f'/admin/labs/folder/{self.id}/change/'

    def get_delete_url(self):
        return f'/admin/labs/folder/{self.id}/delete/'

    def __str__(self):
        return f'Папка "{self.name}", {self.semester}'

    class Meta:
        verbose_name = 'Папка'
        verbose_name_plural = 'Папки'


# Модель файла, принадлежащего папке
class File(models.Model):
    name = models.CharField(max_length=150, verbose_name='Название')
    folder = models.ForeignKey(
        Folder,
        on_delete=models.CASCADE,
        related_name='files',
        verbose_name='Папка'
    )
    file = models.FileField(
        upload_to='additional_files/',
        verbose_name='Файл'
    )

    def __str__(self):
        return f'Файл "{self.name}", {self.folder}'

    class Meta:
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы'
