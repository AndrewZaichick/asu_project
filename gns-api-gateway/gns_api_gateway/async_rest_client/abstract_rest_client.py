import abc  # Модуль для поддержки абстрактных базовых классов (ABC).
import logging  # Стандартная библиотека для логирования.
from typing import Optional  # Для аннотаций типов, здесь — поддержка опциональных значений.

# Асинхронный HTTP-клиент и дополнительные инструменты:
from aiohttp import ClientSession, ClientTimeout, TCPConnector
from aiohttp_retry import ExponentialRetry, RetryClient  # Для повторных попыток при ошибках.

# Вспомогательные модули из текущего пакета:
from .auth_providers import BaseAuthProvider  # Базовый класс для авторизации.
from .client_utils import CommonDictType, check_arguments  # Тип словаря и декоратор для проверки аргументов.
from .constants import Methods  # Перечисление поддерживаемых HTTP-методов.
from .response import Response  # Класс для обертки HTTP-ответа.

__all__ = ["AbstractRestClient"]  # Экспортируется только этот класс.


class AbstractRestClient(abc.ABC):
    """
    Абстрактный асинхронный REST-клиент с поддержкой повторных попыток, заголовков, авторизации и логирования.
    Может быть расширен для реализации конкретной логики запросов к REST API.
    """
    # Набор HTTP-статусов, при которых будут предприняты повторные попытки (например, перегрузка, ошибки сервера).
    RETRIED_STATUSES: set[int] = {429, 500, 502, 503, 504}
    # Количество попыток повторить запрос в случае ошибок из списка выше.
    RETRY_ATTEMPTS: int = 8

    def __init__(
        self,
        base_url: str,
        *,
        verify_ssl: bool = False,
        timeout: int = 60,
        headers: Optional[CommonDictType] = None,
    ) -> None:
        """
        Инициализация клиента:
        - base_url: Базовый URL для всех запросов.
        - verify_ssl: Проверять ли SSL-сертификат (обычно True на проде, False — для тестов).
        - timeout: Таймаут соединения, сек.
        - headers: Начальные HTTP-заголовки для сессии.
        """
        self._session = ClientSession(
            base_url=base_url,
            connector=TCPConnector(verify_ssl=verify_ssl),
            timeout=ClientTimeout(total=timeout),
        )
        self._session_headers = headers  # Сохраняем начальные заголовки (если есть).
        self._logger = logging.getLogger(self.__class__.__name__)  # Отдельный логгер для каждого клиента.
        self._initialize()  # Вспомогательный метод для инициализации клиента.

    @check_arguments  # Декоратор для проверки корректности аргументов метода.
    async def request(self, *, method: Methods, url: str, **kwargs) -> Response:
        """
        Выполнить асинхронный HTTP-запрос с поддержкой повторов, авторизации и пользовательских заголовков.
        - method: HTTP-метод (GET, POST и т.д.).
        - url: относительный путь (без base_url).
        - kwargs: дополнительные параметры aiohttp (data, json, params и т.д.).
        Возвращает объект Response с содержимым ответа, статусом и заголовками.
        """
        headers = self._unify_headers(kwargs)  # Объединение базовых и пользовательских заголовков.
        async with self._client.request(
            method=method,
            url=url,
            headers=headers,
            **kwargs,
        ) as response:
            return Response(
                content=await response.read(),  # Считываем всё тело ответа.
                status_code=response.status,
                headers=dict(response.headers),  # aiohttp возвращает CIMultiDict — приводим к обычному словарю.
            )

    async def close(self) -> None:
        """
        Асинхронно закрыть все соединения и клиентские объекты.
        Важно для корректного завершения работы (особенно в тестах и при длительных фоновых задачах).
        """
        await self._client.close()
        await self._session.close()

    def _initialize(self) -> None:
        """
        Вспомогательный метод для полной инициализации клиента:
        - создание RetryClient
        - установка заголовков
        - инициализация авторизации
        """
        self._create_client()
        self._set_session_headers()
        self._set_authentication()

    def _create_client(self) -> None:
        """
        Создаёт клиент с поддержкой повторных попыток (RetryClient) на основе текущей сессии.
        - retry_options настраивает экспоненциальную стратегию повторов.
        - logger используется для записи событий (ошибки, повторы и др.).
        """
        self._client = RetryClient(
            client_session=self._session,
            retry_options=ExponentialRetry(
                attempts=self.RETRY_ATTEMPTS,
                retry_all_server_errors=False,
                statuses=self.RETRIED_STATUSES,
            ),
            logger=self._logger,
        )

    def _set_session_headers(self) -> None:
        """
        Устанавливает начальные HTTP-заголовки для текущей сессии,
        если они были переданы при создании клиента.
        """
        if self._session_headers is not None:
            self._session.headers.update(self._session_headers)

    def _set_authentication(self) -> None:
        """
        Инициализирует поставщика авторизации (по умолчанию — базовый провайдер, ничего не делает).
        Этот метод рекомендуется переопределять в потомках для кастомной авторизации.
        """
        self._auth_provider = BaseAuthProvider()

    def _unify_headers(self, kwargs: CommonDictType) -> CommonDictType:
        """
        Объединяет заголовки, добавляемые авторизационным провайдером, с пользовательскими заголовками из kwargs.
        - Сначала используются заголовки от авторизации.
        - Затем (при наличии) они дополняются или перекрываются заголовками из kwargs['headers'].
        """
        headers = self._auth_provider.make_headers()
        if "headers" in kwargs:
            kwargs_headers = kwargs.pop("headers")
            headers.update(kwargs_headers)
        return headers
