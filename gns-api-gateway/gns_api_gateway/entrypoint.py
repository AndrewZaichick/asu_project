import logging
import os
from typing import Awaitable, Callable  # Для типов middleware.

import uvicorn  # Сервер ASGI, используется для запуска FastAPI.
from fastapi import FastAPI, Request
from fastapi.responses import Response


from gns_api_gateway.async_rest_client import Methods  # Перечисление HTTP-методов.
from gns_api_gateway import api, constants  # Модули с роутерами и константами.
from gns_api_gateway.api.error_handlers import (
    json_api_gateway_exception_error_handler,
    register_error_handler,
)
from gns_api_gateway.containers import Containers  # Корневой DI-контейнер.
from gns_api_gateway.domain.exceptions import AuthError  # Кастомное исключение авторизации.
from gns_api_gateway.settings import Settings  # Конфигурация приложения.


logger = logging.getLogger(__name__)  # Логгер текущего файла.



def init_containers() -> Containers:
    settings = Settings()  # Загружаем конфигурацию (обычно из env или pydantic).
    containers = Containers()  # Создаём корневой контейнер.

    containers.config.from_pydantic(settings)  # Передаём настройки в контейнер.
    containers.init_resources()  # Инициализируем ресурсы (например, БД).

    # Прокладываем зависимости в модули (автоматическое связывание).
    containers.wire(packages=(api,))
    containers.application.wire(packages=(api,))

    return containers


def create_fastapi() -> FastAPI:
    containers: Containers = init_containers()  # Контейнеры с зависимостями.

    fastapi_app = FastAPI(
        title=constants.PROJECT_NAME,
        version=containers.config.version(),
        docs_url=f"{constants.API_PREFIX}{constants.SWAGGER_DOC_URL}"
        if containers.config.documentation_enabled()
        else None,
        description=constants.DESCRIPTION,
        openapi_url=f"{constants.API_PREFIX}/openapi.json" if containers.config.documentation_enabled() else None,
    )

    fastapi_app.containers = containers  # Прикрепляем контейнер к приложению.


    # Регистрация маршрутов, авторизации, обработчиков ошибок
    if containers.config.sentry.enabled():
        import sentry_sdk  # noqa: WPS433
        from sentry_sdk.integrations.asgi import SentryAsgiMiddleware  # noqa: WPS433

        sentry_sdk.init(
            dsn=containers.config.sentry.dsn(),
            traces_sample_rate=containers.config.sentry.traces_sample_rate(),
            environment=containers.config.env(),
            release=containers.config.info.hash(),
            debug=False,
        )
        fastapi_app.add_middleware(SentryAsgiMiddleware)

        logger.info("SENTRY ENABLED!")

    add_routers(fastapi_app)
    register_auth(fastapi_app)
    register_error_handler(fastapi_app)

    return fastapi_app


def register_auth(app: FastAPI):
    @app.middleware("http")
    async def handle_authorization(request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
        try:
            api.auth.set_user_from_token(request)  # Установка пользователя из токена.
        except AuthError as err:
            return json_api_gateway_exception_error_handler(err, err.status_code)  # Обработка ошибки авторизации.
        return await call_next(request)  # Продолжение обработки запроса.



def add_routers(fastapi_app: FastAPI):
    api_methods = list(Methods)  # ["GET", "POST", "PUT", ...]
    fastapi_app.add_route(
        path=f"/{{path:path}}",  # Обработка любого пути.
        route=fastapi_app.containers.routers.gns3_router().route,  # Центральный роутер для проксирования GNS3.
        methods=api_methods,
    )


# Запуск Uvicorn-сервера
def run_api():
    use_web_concurrency = "WEB_CONCURRENCY" in os.environ
    options = {
        "host": "0.0.0.0",
        "port": 8000,
        "log_level": "debug",
        "workers": int(os.getenv("WEB_CONCURRENCY")) if use_web_concurrency else 3,  # Поддержка многопроцессности.
        "reload": os.getenv("ENV", "prod") == "development",  # Горячая перезагрузка в режиме разработки.
        "debug": True,
    }

    uvicorn.run("gns_api_gateway.entrypoint:create_fastapi", **options)
