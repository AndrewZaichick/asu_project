from typing import Union, Optional

from fastapi.responses import JSONResponse, Response

from gns_api_gateway.constants import JSON_CONTENT_TYPE  # Ожидаемое значение: 'application/json'

__all__ = ["ResponseBuilder"]  # Экспортируемый класс

# Допустимые типы содержимого в ответе
AnyPossibleContent = Union[str, bytes, dict, list, None]


class ResponseBuilder:
    """
    Класс-помощник для поэтапной сборки HTTP-ответов с гибкими настройками:
    заголовки, куки, статус-код, тип содержимого и само содержимое.
    """

    def __init__(self):
        # Устанавливаем значения по умолчанию
        self._content_type = JSON_CONTENT_TYPE  # Тип содержимого: JSON
        self._response_payload = None  # Тело ответа
        self._status_code = 200  # Код состояния HTTP
        self._headers = {}  # Пользовательские заголовки
        self._cookie = {}  # Куки, которые нужно установить

    def with_content(self, payload: AnyPossibleContent):
        # Устанавливает содержимое ответа, если оно задано
        if payload is not None:
            self._response_payload = payload

        return self  # Возвращает self для цепочки вызовов

    def with_cookie(self, key: str, value: str):
        # Добавляет cookie в ответ
        self._cookie[key] = value

        return self

    def with_status(self, status: Optional[int] = None):
        # Устанавливает HTTP-статус, если задан
        if status is not None:
            self._status_code = status

        return self

    def with_content_type(self, content_type: Optional[str] = None):
        # Устанавливает MIME-тип содержимого, если задан
        if content_type is not None:
            self._content_type = content_type

        return self

    def with_headers(self, headers: Optional[dict] = None):
        # Добавляет/обновляет заголовки
        if headers is not None:
            self._headers.update(headers)

        return self

    def build(self) -> Response:
        """
        Финализирует объект ответа. Если содержимое сериализуемо (dict/list) и
        content_type — JSON, используется JSONResponse. Иначе — обычный Response.
        Также устанавливаются все заданные cookies.
        """
        if self._is_serializable() and self._content_type == JSON_CONTENT_TYPE:
            return JSONResponse(
                content=self._response_payload,
                status_code=self._status_code,
                headers=self._headers
            )

        response = Response(
            content=self._response_payload,
            status_code=self._status_code,
            media_type=self._content_type,
            headers=self._headers,
        )

        if self._cookie:
            for key, value in self._cookie.items():
                response.set_cookie(key=key, value=value)

        return response

    def _is_serializable(self):
        # Проверяет, может ли тело быть сериализовано в JSON
        return isinstance(self._response_payload, (dict, list))
