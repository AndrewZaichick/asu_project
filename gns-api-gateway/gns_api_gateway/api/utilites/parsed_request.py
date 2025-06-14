import json
from typing import Any, Union

from fastapi import Request
from starlette.datastructures import Headers

from gns_api_gateway.async_rest_client import Methods

__all__ = ["ParsedRequest"]  # Указание, что класс ParsedRequest экспортируется при импорте *


class ParsedRequest:
    """
    Обёртка над FastAPI-запросом, позволяющая легко управлять URL, заголовками, телом запроса и преобразованиями.
    """

    def __init__(self, request: Request) -> None:
        self._request = request  # Исходный FastAPI Request
        self.url = request.url.path  # Сохраняем только путь из полного URL
        self.headers = request.headers  # Устанавливаем заголовки

    @property
    def method(self) -> Methods:
        # Возвращает HTTP-метод запроса в виде перечисления Methods (GET, POST, и т.д.)
        return Methods(self._request.method)

    @property
    def url(self) -> str:
        # Геттер для URL пути
        return self._url

    @url.setter
    def url(self, url: str) -> None:
        # Сеттер для URL пути
        self._url = url

    @property
    async def form(self) -> dict[str, Any]:
        # Асинхронно возвращает данные формы (если тип запроса — form-data)
        form_data = await self._request.form()
        return {key: value for key, value in form_data.items()}

    @property
    def headers(self) -> dict[str, Any]:
        # Геттер для заголовков
        return self._headers

    @headers.setter
    def headers(self, headers: Union[Headers, dict[str, Any]]) -> None:
        # Сеттер для заголовков, приводящий их к обычному словарю
        if isinstance(headers, Headers):
            self._headers = dict(headers)
        else:
            self._headers = headers

    @property
    async def json_data(self) -> dict[str, Any]:
        # Асинхронно возвращает тело запроса, интерпретированное как JSON
        return json.loads(await self._request.body())

    def add_element_in_headers(self, element: dict[str, Any]) -> None:
        # Добавляет элемент(ы) в словарь заголовков
        self.headers.update(element)

    def change_url(self, current_prefix: str, new_prefix: str) -> "ParsedRequest":
        # Заменяет часть URL и возвращает обновлённый ParsedRequest
        self.url = self.url.replace(current_prefix, new_prefix)
        return self

    async def change_body(self, new_body: bytes) -> None:
        """
        Позволяет заменить тело запроса новым содержимым.
        Используется для повторной передачи запроса с другим телом.
        """

        async def receive() -> dict[str, Any]:
            return {"type": "http.request", "body": new_body, "more_body": False}

        # Пересоздаём Request с новым "receive", возвращающим новое тело
        self._request = Request(self._request.scope.copy(), receive=receive)

    async def to_dict(self) -> dict[str, Any]:
        """
        Преобразует запрос в словарь, пригодный для передачи в прокси-клиент.
        Содержит метод, полный URL (включая query-параметры), заголовки и тело.
        """
        url = self.url
        if self._request.url.query:
            url = "?".join((self.url, self._request.url.query))  # Добавляем query string к URL

        return {
            "method": self.method,
            "url": url,
            "headers": self.headers,
            "data": await self._request.body(),  # Возвращает тело в байтах
        }
