from dependency_injector import containers, providers, resources
# containers — базовый модуль для создания контейнеров зависимостей
# providers — механизмы создания зависимостей (Singleton, Factory, Resource и т.д.)
# resources — абстракция для управления ресурсами (с инициализацией/освобождением)


# Импортируем внутренние компоненты проекта
from gns_api_gateway.api import GNS3Router  # HTTP-роутер (например, FastAPI router)
from gns_api_gateway.application import GNS3Service  # Сервисный слой (бизнес-логика)
from gns_api_gateway.datasource import Database  # Класс для подключения к PostgreSQL
from gns_api_gateway.infrastructure import GNS3Proxy  # Клиент для общения с внешним GNS3 API
from gns_api_gateway.infrastructure.repositories import UserRepository, TokenRepository  # Работа с БД

class DatabaseResource(resources.Resource):
    def init(self, username: str, password: str, host: str, port: int, database: str) -> Database:
        """
        Инициализация ресурса БД при старте приложения.
        Подключается к базе через Database.connect().
        """
        db = Database(username=username, password=password, host=host, port=port, database=database)
        db.connect()  # ⚠️ Здесь должен быть await! Возможно, ошибка (connect — async).
        return db

    def shutdown(self, resource: Database) -> None:
        """
        Закрытие соединения при завершении работы.
        """
        resource.close()  # ⚠️ Аналогично — close скорее всего async.


class Datasources(containers.DeclarativeContainer):
    config = providers.Configuration()  # Ожидаем конфигурацию вида config.database.user и т.п.

    postgres_datasource: providers.Provider[Database] = providers.Resource(
        DatabaseResource,
        config.user,
        config.password,
        config.host,
        config.port,
        config.db,
    )


class Repositories(containers.DeclarativeContainer):
    datasources = providers.DependenciesContainer()  # Принимаем внешний контейнер с источниками данных

    user: providers.Singleton[UserRepository] = providers.Singleton(
        UserRepository,
        datasources.postgres_datasource,  # Передаём БД как зависимость
    )

    token: providers.Singleton[TokenRepository] = providers.Singleton(
        TokenRepository,
        datasources.postgres_datasource,
    )



class ExternalServices(containers.DeclarativeContainer):
    config = providers.Configuration()

    gns3_proxy: providers.Singleton[GNS3Proxy] = providers.Singleton(
        GNS3Proxy,
        base_url=config.gns3_url,
    )


class Routers(containers.DeclarativeContainer):
    application = providers.DependenciesContainer()
    external_services = providers.DependenciesContainer()

    gns3_router: providers.Singleton[GNS3Router] = providers.Singleton(
        GNS3Router,
        client=external_services.gns3_proxy,
        service=application.gns3,
    )


class Application(containers.DeclarativeContainer):
    external_services = providers.DependenciesContainer()
    repositories = providers.DependenciesContainer()

    gns3: providers.Singleton[GNS3Service] = providers.Singleton(
        GNS3Service,
        gns3_proxy=external_services.gns3_proxy,
        user_repository=repositories.user,
    )


class Containers(containers.DeclarativeContainer):
    config = providers.Configuration()

    datasources: providers.Container[Datasources] = providers.Container(
        Datasources,
        config=config.database,
    )
    repositories: providers.Container[Repositories] = providers.Container(
        Repositories,
        datasources=datasources,
    )
    external_services: providers.Container[ExternalServices] = providers.Container(
        ExternalServices,
        config=config,
    )
    application: providers.Container[Application] = providers.Container(
        Application,
        external_services=external_services,
        repositories=repositories,
    )
    routers: providers.Container[Routers] = providers.Container(
        Routers,
        application=application,
        external_services=external_services,
    )
