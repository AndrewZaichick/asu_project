import json  # Используется для сериализации контекста пользователя в JSON-строку.
from contextvars import ContextVar  # Предоставляет переменные, локальные для текущего контекста исполнения (например, асинхронного запроса).
from typing import Optional  # Для описания опционального возвращаемого значения.

from .client_utils import CommonDictType  # Обобщённый тип словаря, например Dict[str, str].
from .interfaces import IBaseAuthProvider  # Интерфейс, от которого наследуются все классы авторизации.

__all__ = ["BaseAuthProvider", "TokenAuthProvider"]  # Явно указываем, какие имена будут экспортированы при импорте через "*".



class BaseAuthProvider(IBaseAuthProvider):
    """
    Базовый класс провайдера авторизации.
    Реализует интерфейс, но не добавляет никаких заголовков.
    Может использоваться, если авторизация не требуется.
    """
    def make_headers(self) -> CommonDictType:
        return {}  # Возвращает пустой словарь — заголовки авторизации отсутствуют.



class TokenAuthProvider(BaseAuthProvider):
    """
    Провайдер, добавляющий авторизационный токен в заголовки запроса.
    Токен извлекается из contextvars.ContextVar и сериализуется в JSON.
    """
    TOKEN_HEADER = "token"  # Название заголовка, в который будет помещён токен.


    def __init__(self, user_context: ContextVar) -> None:
        """
        :param user_context: переменная контекста, содержащая данные о пользователе (например, user_id, роль и т.д.)
        ContextVar обеспечивает безопасность при использовании в асинхронном коде.
        """
        self._user_context = user_context


    def make_headers(self) -> CommonDictType:
        """
        Генерирует HTTP-заголовки авторизации.
        Если контекст пользователя найден — сериализует его и добавляет в заголовок.
        :return: словарь заголовков (например, {"token": "..."}).
        """
        headers = {}
        if user_context := self._get_user_context():  # Проверяем, установлен ли контекст.
            headers[self.TOKEN_HEADER] = json.dumps(user_context)  # Сериализация контекста в JSON.
        return headers


    def _get_user_context(self) -> Optional[CommonDictType]:
        """
        Извлекает значение переменной контекста, если оно установлено.
        Безопасная обёртка, возвращающая None, если переменная не задана.
        :return: словарь контекста пользователя или None.
        """
        return (
            self._user_context.get()
            if self._user_context and self._user_context.get(None)
            else None
        )

