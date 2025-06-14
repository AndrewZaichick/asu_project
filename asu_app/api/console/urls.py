# Импортируем роутеры DRF (Django REST Framework) — позволяют автоматически создавать CRUD-маршруты
from rest_framework import routers

# Импорт представлений (ViewSet'ов и обычных Views), реализующих бизнес-логику
from api.console.views import (
    DeviceViewSet,              # ViewSet для модели устройств (Devices)
    CommandViewSet,             # ViewSet для модели команд (MainCommands)
    ConnectToDeviceView,        # View для подключения к устройству
    DisconnectFromDeviceView,   # View для отключения от устройства
    ExecuteCommandView,         # View для отправки команды на устройство
    web_gns_view,               # Функция-представление для отображения GNS (например, HTML-страница или iframe)
)

# Импорт утилит Django для маршрутизации
from django.urls import path, include

# Создаём "умный" роутер, который сам сгенерирует стандартные маршруты для ViewSet'ов
router = routers.DefaultRouter()
router.register(r'devices', DeviceViewSet)  # /devices/, /devices/<id>/
router.register(r'commands', CommandViewSet)  # /commands/, /commands/<id>/

# Основной список URL-маршрутов для приложения
urlpatterns = [
    path('', include(router.urls)),  # Включаем маршруты, сгенерированные ViewSet'ами

    # Ручные пути к специфическим операциям:
    path('connect/', ConnectToDeviceView.as_view(), name='connect'),               # POST-запрос для подключения
    path('disconnect/', DisconnectFromDeviceView.as_view(), name='disconnect'),    # POST-запрос для отключения
    path('exec-command/', ExecuteCommandView.as_view(), name='exec-command'),      # POST-запрос для выполнения команды
    path('web-gns/', web_gns_view, name='web-gns'),                                 # Отображение веб-интерфейса PnetLab
]
