import json

from fastapi.responses import Response

# Импорт бизнес-логики работы с GNS3
from gns_api_gateway.application import GNS3Service
# Импорт HTTP-методов и проксируемого ответа
from gns_api_gateway.async_rest_client import Methods, Response as ProxyResponse
# Ключ для хранения токена в cookie
from gns_api_gateway.constants import TOKEN_KEY
# Прокси-клиент для взаимодействия с GNS3-сервером
from gns_api_gateway.infrastructure import GNS3Proxy
# Абстрактный маршрутизатор, тип маршрутов
from .abstract_router import AbstractRouter, RequestMapper
# Функция получения токена текущего пользователя
from ..auth import get_user_token
# Утилиты для парсинга запроса и построения ответа
from ..utilites import ParsedRequest, ResponseBuilder

__all__ = ["GNS3Router"]  # Экспортируемый объект


# Класс маршрутизатора для обработки запросов к GNS3-серверу
class GNS3Router(AbstractRouter):
    def __init__(self, client: GNS3Proxy, service: GNS3Service) -> None:
        super().__init__(client)  # Инициализация родительского класса
        self._service = service  # Сервис для управления проектами пользователя

    @property
    def request_mapper(self) -> RequestMapper:
        # Словарь маршрутов: (метод, паттерн URL) → обработчик
        return {
            (Methods.GET, rf"^/$"): self._set_auth_token,
            (Methods.GET, rf"^/v2/projects$"): self._get_projects,
            (Methods.POST, rf"^/v2/projects$"): self._create_project,
            (Methods.DELETE, rf"^/v2/projects/\d+$"): self._delete_project,
        }

    # Устанавливает токен текущего пользователя как cookie
    async def _set_auth_token(self, request: ParsedRequest) -> Response:
        response = await self._client.request(method=Methods.GET, url="/")  # Проксируем базовый GET-запрос
        return (
            ResponseBuilder()
            .with_content(response.content)
            .with_status(response.status_code)
            .with_headers(response.headers)
            .with_cookie(key=TOKEN_KEY, value=get_user_token())  # Устанавливаем токен в cookie
            .build()
        )

    # Получение списка проектов пользователя
    async def _get_projects(self, request: ParsedRequest) -> Response:
        response = await self._make_default_request(request)
        projects = response.get_content()  # Получаем данные проектов из ответа GNS3
        response.change_content(await self._service.get_user_projects(projects))  # Фильтруем или дополняем по пользователю

        return self._return_default_response(response)

    # Создание нового проекта и привязка его к пользователю
    async def _create_project(self, request: ParsedRequest):
        response = await self._make_default_request(request)
        if response.status_code_ok():
            await self._service.add_project_to_user(response.get_content()["project_id"])  # Сохраняем проект пользователю

        return self._return_default_response(response)

    # Удаление проекта и отвязка от пользователя
    async def _delete_project(self, request: ParsedRequest):
        response = await self._make_default_request(request)
        if response.status_code_ok():
            await self._service.remove_project_from_user(response.get_content()["project_id"])  # Удаляем привязку

        return self._return_default_response(response)

    # Унифицированный метод для отправки проксируемого запроса
    async def _make_default_request(self, request: ParsedRequest) -> ProxyResponse:
        return await self._client.request(**await request.to_dict())

    # Унифицированный метод для построения ответа FastAPI из ProxyResponse
    @staticmethod
    def _return_default_response(response: ProxyResponse) -> Response:
        return (
            ResponseBuilder()
            .with_content(response.content)
            .with_status(response.status_code)
            .with_headers(response.headers)
            .build()
        )
