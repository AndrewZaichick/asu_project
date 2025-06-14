# Импорт стандартного модуля Django для регистрации моделей в админ-панели
from django.contrib import admin

# Импортируем модели, которые будем регистрировать в админке
from .models import MainCommands, Subcommands, Devices

# Создаём встроенный (inline) класс для отображения связанных подкоманд (Subcommands)
# Этот класс позволяет отображать подкоманды внутри формы основной команды (MainCommands)
class SubCommandInline(admin.StackedInline):
    model = Subcommands  # Указываем, какая модель будет встроена

# Определяем, как будет выглядеть модель MainCommands в админке
class MainCommandAdmin(admin.ModelAdmin):
    inlines = [SubCommandInline]  # Встраиваем подкоманды в интерфейс основной команды

# Регистрируем модель MainCommands с кастомной конфигурацией (MainCommandAdmin)
admin.site.register(MainCommands, MainCommandAdmin)

# Строчка ниже закомментирована — если раскомментировать, можно будет отдельно управлять подкомандами,
# но сейчас предполагается, что они доступны только через MainCommands
# admin.site.register(Subcommands)

# Регистрируем модель Devices с дефолтным отображением в админке
admin.site.register(Devices)
