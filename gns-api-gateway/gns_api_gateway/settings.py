from pydantic import BaseSettings, Field
# BaseSettings — специальный класс pydantic для загрузки настроек из переменных окружения (.env, system env).
# Field — позволяет указывать значения по умолчанию, алиасы, описание и источник значения.


class DatabaseSettings(BaseSettings):
    user: str  # POSTGRES_USER
    password: str  # POSTGRES_PASSWORD
    host: str  # POSTGRES_HOST
    port: str  # POSTGRES_PORT
    db: str  # POSTGRES_DB

    class Config:
        env_prefix = "POSTGRES_"  # Все переменные окружения начинаются с этого префикса.



class Settings(BaseSettings):
    env: str = "development"  # Среда выполнения (development / production).
    version: str = "1.0"  # Версия приложения.
    logger_level: str = Field("INFO", env="LOG_LEVEL")  # Уровень логирования, настраивается через переменную LOG_LEVEL.
    documentation_enabled: bool = True  # Включить/отключить Swagger-документацию.

    gns3_url: str  # URL до GNS3-сервера (например, http://localhost:3080/api)
    database: DatabaseSettings = DatabaseSettings()  # Вложенные настройки базы данных.

    gns3_server_url: str  # Дополнительный адрес сервера GNS3 (может быть для отдельной цели).

