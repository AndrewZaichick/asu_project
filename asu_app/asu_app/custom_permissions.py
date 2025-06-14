from rest_framework.permissions import BasePermission, SAFE_METHODS  # Базовый класс и список безопасных методов
from asu_app.settings import SYSTEM_ADMINISTRATION_SUBJECT_ID  # ID дисциплины "Системное администрирование"
from api.subjects.models import Subject  # Импорт модели дисциплины
from api.users.models import UserRole  # Роли пользователей (STUDENT, TEACHER)



class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class ReadOnlyIfAllowed(BasePermission):

    def has_permission(self, request, view):
        # Получаем объект системной дисциплины и её разрешённые специальности
        sys_adm_subj = Subject.objects.prefetch_related('allowed_specialities').get(
            pk=SYSTEM_ADMINISTRATION_SUBJECT_ID
        )

        if request.user.role == UserRole.STUDENT:
            # Студент может только читать, если его специальность допущена к системной дисциплине
            if (
                request.method in SAFE_METHODS and
                request.user.group.speciality in sys_adm_subj.allowed_specialities.all()
            ):
                return True
            return False

        else:
            # Преподаватель может читать, если он ведёт системную дисциплину
            if (
                request.method in SAFE_METHODS and
                sys_adm_subj in request.user.teacher_subjects.all()
            ):
                return True
            return False



class ConsolePermissions(BasePermission):

    def has_permission(self, request, view):
        sys_adm_subj = Subject.objects.prefetch_related('allowed_specialities').get(
            pk=SYSTEM_ADMINISTRATION_SUBJECT_ID
        )
         # Студент может использовать консоль, если его специальность допущена
        if request.user.role == UserRole.STUDENT:
            if (
                request.user.group.speciality
                in sys_adm_subj.allowed_specialities.all()
            ):
                return True
            return False
        else:
            if (
                 # Преподаватель — если ведёт системную дисциплину
                sys_adm_subj in request.user.teacher_subjects.all()
            ):
                return True
            return False


class ReadOnlyIfTeacher(BasePermission):

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS and request.user.role == UserRole.TEACHER
