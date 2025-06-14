from django.contrib import admin  # Импорт регистратора моделей в административной панели Django
from api.users.models import User  # Импорт пользовательской модели User, определённой в проекте

# Регистрируем модель User в административной панели,
# чтобы можно было управлять пользователями через стандартный интерфейс Django admin.
admin.site.register(User)
