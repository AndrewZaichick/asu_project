import logging  # Стандартный модуль для настройки логирования.

from gns_api_gateway.settings import Settings  # Импорт настроек приложения (класс Settings).


logging.basicConfig(
    level=Settings().logger_level.upper(),  # Уровень логирования (например, INFO, DEBUG), получаем из настроек.
    format="[%(asctime)s] [%(name)s: %(levelname)s]  %(message)s",  # Формат строки лога: дата, имя логгера, уровень, сообщение.
    datefmt="%Y-%m-%d %I:%M:%S",  # Формат отображения даты и времени.
)
