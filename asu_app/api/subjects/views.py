from rest_framework import viewsets  # Базовый класс для создания ViewSet'ов в DRF
from api.subjects.models import Subject, Semester, Lecture, Lab, Folder, File
from api.subjects.serializers import (
    SubjectSerializer,
    SemesterSerializer,
    LabSerializer,
    LectureSerializer,
    FolderSerializer,
    FileSerializer
)
from django_filters.rest_framework import DjangoFilterBackend  # Поддержка фильтрации в ViewSet'ах
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from asu_app.custom_permissions import ReadOnly  # Кастомное разрешение: доступ только для чтения
from api.users.models import UserRole  # Для определения роли пользователя (студент, преподаватель и т.д.)


# ViewSet для предметов
class SubjectViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]  # Только авторизованные, не-админы читают
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            # Администратор видит все предметы
            return Subject.objects.all()

        if self.request.user.role == UserRole.STUDENT:
            # Студент видит только предметы, доступные его специальности (через группы)
            return Subject.objects.filter(
                allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('allowed_specialities__groups')

        # Преподаватель видит только свои предметы
        return Subject.objects.filter(
            id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('allowed_specialities')


# ViewSet для семестров
class SemesterViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = Semester.objects.all().select_related('subject')
    serializer_class = SemesterSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['subject']  # Позволяет фильтровать семестры по предмету

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Semester.objects.all().select_related('subject')

        if self.request.user.role == UserRole.STUDENT:
            # Студент видит только семестры по разрешённым предметам
            return Semester.objects.filter(
                subject__allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('subject__allowed_specialities__groups')

        # Преподаватель — только по своим дисциплинам
        return Semester.objects.filter(
            subject__id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('subject__allowed_specialities')


# ViewSet для лабораторных работ
class LabViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = Lab.objects.all().select_related('semester__subject')
    serializer_class = LabSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['semester']  # Фильтрация по семестру

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Lab.objects.all().select_related('semester__subject')

        if self.request.user.role == UserRole.STUDENT:
            # Студент — только по своей специальности
            return Lab.objects.filter(
                semester__subject__allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('semester__subject__allowed_specialities__groups')

        # Преподаватель — только свои
        return Lab.objects.filter(
            semester__subject__id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('semester__subject__allowed_specialities')


# ViewSet для лекций
class LectureViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = Lecture.objects.all().select_related('semester__subject')
    serializer_class = LectureSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['semester']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Lecture.objects.all().select_related('semester__subject')

        if self.request.user.role == UserRole.STUDENT:
            return Lecture.objects.filter(
                semester__subject__allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('semester__subject__allowed_specialities__groups')

        return Lecture.objects.filter(
            semester__subject__id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('semester__subject__allowed_specialities')


# ViewSet для папок (например, с методичками, презентациями и т.д.)
class FolderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = Folder.objects.all().select_related('semester__subject')
    serializer_class = FolderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['semester']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Folder.objects.all().select_related('semester__subject')

        if self.request.user.role == UserRole.STUDENT:
            return Folder.objects.filter(
                semester__subject__allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('semester__subject__allowed_specialities__groups')

        return Folder.objects.filter(
            semester__subject__id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('semester__subject__allowed_specialities')


# ViewSet для отдельных файлов (внутри папок)
class FileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnly]
    queryset = File.objects.all().select_related('folder__semester__subject')
    serializer_class = FileSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['folder']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return File.objects.all().select_related('folder__semester__subject')

        if self.request.user.role == UserRole.STUDENT:
            return File.objects.filter(
                folder__semester__subject__allowed_specialities__groups__in=[self.request.user.group]
            ).prefetch_related('folder__semester__subject__allowed_specialities__groups')

        return File.objects.filter(
            folder__semester__subject__id__in=[s.id for s in self.request.user.teacher_subjects.all()]
        ).prefetch_related('folder__semester__subject__allowed_specialities')
