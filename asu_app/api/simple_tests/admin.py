# Импорт стандартной админки Django
from django.contrib import admin

# Импорт моделей текущего приложения
from api.simple_tests.models import Test, TestsResult, Question, AnswerOption

# Импорт моделей из другого приложения — предметы, лекции и лабораторные работы
from api.subjects.models import Lab, Lecture

# Импорт расширения nested_admin — позволяет создавать вложенные inlines (вложенные формы внутри формы)
import nested_admin


# Inline-форма для вариантов ответов (AnswerOption), отображается внутри вопроса
class AnswerOptionInline(nested_admin.NestedStackedInline):
    model = AnswerOption  # Модель, которую отображаем
    extra = 2             # Количество пустых полей по умолчанию


# Inline-форма для вопросов, которая включает вложенные варианты ответов
class QuestionInline(nested_admin.NestedStackedInline):
    model = Question                  # Вопросы, принадлежащие тесту
    extra = 1                         # Один пустой вопрос по умолчанию
    inlines = [AnswerOptionInline]   # Вопрос включает варианты ответов


# Основная административная форма для модели Test с вложенными вопросами и вариантами ответов
class TestAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline]

    # Ограничение списка лабораторных и лекций при выборе, если пользователь не суперпользователь
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # Ограничиваем список лабораторных работ по дисциплинам преподавателя
        if db_field.name == "lab" and not request.user.is_superuser:
            kwargs["queryset"] = Lab.objects.filter(
                semester__subject__in=request.user.teacher_subjects.all())

        # Ограничиваем список лекций по дисциплинам преподавателя
        if db_field.name == "lecture" and not request.user.is_superuser:
            kwargs["queryset"] = Lecture.objects.filter(
                semester__subject__in=request.user.teacher_subjects.all())

        # Возвращаем обновлённое поле формы
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Регистрируем модель Test с кастомным отображением через TestAdmin
admin.site.register(Test, TestAdmin)

# Регистрируем модель результатов тестов — простое отображение
admin.site.register(TestsResult)

# Регистрируем модель вопросов — также без кастомизации
admin.site.register(Question)
