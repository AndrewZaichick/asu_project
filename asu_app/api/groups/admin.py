# Импорт административного интерфейса Django
from django.contrib import admin

# Импортируем модели, которые хотим зарегистрировать в админке
from api.groups.models import Speciality, Group

# Регистрируем модель Group — теперь она будет доступна для просмотра и редактирования в административной панели
admin.site.register(Group)

# Регистрируем модель Speciality — аналогично, появляется в интерфейсе администратора
admin.site.register(Speciality)
