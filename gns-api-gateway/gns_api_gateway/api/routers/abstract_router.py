import logging
import re
from abc import ABC  # Для создания абстрактных базовых классов
from typing import Any, Awaitable, Callable, Dict, Optional

from fastapi import Request, Response  # Запросы и ответы FastAPI

from gns_api_gateway.async_rest_client import Methods  # Перечисление HTTP-методов (GET, POST и т.д.)
from gns_api_gateway.infrastructure import GenericRestClient  # Универсальный REST-клиент
from ..utilites import ParsedRequest, ResponseBuilder  # Парсинг запросов и построение ответов

__all__ = ["AbstractRouter", "RequestMapper"]  # Публичные элементы модуля

# Тип: словарь, ключом является пара (метод, url-паттерн), значением — асинхронный обработчик
RequestMapper = Dict[tuple[Methods, str], Callable[[Any], Awaitable[Any]]]


# Абстрактный маршрутизатор, который определяет, как обрабатывать входящие HTTP-запросы
class AbstractRouter(ABC):
    def __init__(self, client: GenericRestClient) -> None:
        self._client = client  # REST-клиент для проксирования запросов
        self._logger = logging.getLogger(self.__class__.__name__)  # Логгер для отладки

    @property
    def request_mapper(self) -> RequestMapper:
        # Возвращает словарь маршрутов, который может быть переопределён в дочерних классах
        return {}

    async def route(self, request: Request) -> Response:
        """
        Основной метод маршрутизации запроса:
        1. Парсит входящий FastAPI-запрос.
        2. Пытается найти кастомный обработчик.
        3. Если не найден — делегирует выполнение REST-клиенту.
        4. Возвращает собранный Response.
        """
        try:
            parsed_request = ParsedRequest(request)  # Преобразуем FastAPI-запрос в ParsedRequest
            request_processor = self.get_request_processor(parsed_request)  # Ищем кастомный обработчик

            if request_processor:
                return await request_processor(parsed_request)  # Если найден, используем его

            # Если нет кастомного обработчика — проксируем запрос через REST-клиент
            response = await self._client.request(**await parsed_request.to_dict())

            # Формируем и возвращаем FastAPI-ответ
            return (
                ResponseBuilder()
                .with_content(response.content)
                .with_status(response.status_code)
                .with_headers(response.headers)
                .build()
            )
        except Exception:
            # Логируем исключение с деталями запроса для отладки
            self._logger.debug("Request to the service failed.\n Failed request: %s.", request.__dict__)
            raise  # Повторно выбрасываем исключение

    def get_request_processor(self, request: ParsedRequest) -> Optional[Callable]:
        """
        Метод для поиска подходящего обработчика в request_mapper.
        Возвращает функцию-обработчик, если метод и URL совпадают с шаблоном.
        """
        for (method, url), processor in self.request_mapper.items():
            if request.method == method and re.match(url, request.url):
                return processor  # Возвращаем соответствующий обработчик

        return None  # Если подходящего обработчика нет
