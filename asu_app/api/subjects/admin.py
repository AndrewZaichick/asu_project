from django.contrib import admin
from api.subjects.models import Lab, Subject, Semester, Folder, File, Lecture


# Вложенная форма для отображения файлов внутри папки
class FileInline(admin.StackedInline):
    model = File
    extra = 1  # Кол-во пустых строк по умолчанию в админке


# Админка для папок с вложенными файлами
class FolderAdmin(admin.ModelAdmin):
    inlines = [FileInline]

    # Ограничиваем список семестров преподавателю только теми, где он ведет дисциплины
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "semester" and not request.user.is_superuser:
            kwargs["queryset"] = Semester.objects.filter(
                subject__in=request.user.teacher_subjects.all()
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Вложенные формы для отображения папок внутри семестра
class FolderInline(admin.StackedInline):
    model = Folder
    extra = 1


# Вложенные формы для лабораторных внутри семестра
class LabInline(admin.StackedInline):
    model = Lab
    extra = 1


# Вложенные формы для лекций внутри семестра
class LectureInline(admin.StackedInline):
    model = Lecture
    extra = 1


# Админка семестра с отображением всех связанных сущностей (лекции, лабораторные, папки)
class SemesterAdmin(admin.ModelAdmin):
    inlines = [FolderInline, LabInline, LectureInline]

    # Ограничиваем список предметов — преподаватели видят только свои дисциплины
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "subject" and not request.user.is_superuser:
            kwargs["queryset"] = Subject.objects.filter(
                id__in=[subj.id for subj in request.user.teacher_subjects.all()]
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Админка для лабораторных с ограничением по семестрам
class LabAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "semester" and not request.user.is_superuser:
            kwargs["queryset"] = Semester.objects.filter(
                subject__in=request.user.teacher_subjects.all()
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Админка для лекций с ограничением по семестрам
class LectureAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "semester" and not request.user.is_superuser:
            kwargs["queryset"] = Semester.objects.filter(
                subject__in=request.user.teacher_subjects.all()
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Админка для файлов с ограничением по доступным папкам
class FileAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "folder" and not request.user.is_superuser:
            kwargs["queryset"] = Folder.objects.filter(
                semester__subject__in=request.user.teacher_subjects.all()
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Регистрация моделей в админке
admin.site.register(Lab, LabAdmin)
admin.site.register(Subject)  # Предмет — без ограничений
admin.site.register(Semester, SemesterAdmin)
admin.site.register(Folder, FolderAdmin)
admin.site.register(File, FileAdmin)
admin.site.register(Lecture, LectureAdmin)
