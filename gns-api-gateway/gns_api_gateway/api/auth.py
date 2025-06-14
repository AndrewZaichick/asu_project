from fastapi import Request

from gns_api_gateway.constants import TOKEN_KEY  # Ключ, по которому ищется токен в параметрах запроса или cookie
from gns_api_gateway.domain.exceptions import AuthError  # Кастомное исключение на случай отсутствия токена
from gns_api_gateway.infrastructure import user  # Контекстное хранилище текущего пользователя

__all__ = ["get_token", "set_user_from_token", "get_user_token"]

# Публичные эндпоинты, которые не требуют проверки авторизации
PUBLIC_ENDPOINTS_POSTFIXES = (
    "/docs",          # Swagger UI
    "/openapi.json",  # JSON-описание API
    "/favicon.ico",   # Иконка сайта
)

def get_token(request: Request) -> str:
    """
    Извлекает токен авторизации из запроса:
    - сначала пытается взять из query-параметров (?auth=...)
    - затем из cookies
    - если не найдено — возбуждает исключение
    """
    if token := request.query_params.get(TOKEN_KEY):
        return token

    if token := request.cookies.get(TOKEN_KEY):
        return token

    raise AuthError("Token is not provided")

def set_user_from_token(request: Request) -> None:
    """
    Привязывает пользователя к текущему запросу на основе токена.
    Для публичных эндпоинтов ничего не делает.
    """
    if request.url.path.endswith(PUBLIC_ENDPOINTS_POSTFIXES):
        return

    token = get_token(request)
    user.set(token)  # Сохраняем токен в contextvars

def get_user_token() -> str:
    """
    Возвращает текущий токен пользователя, сохранённый ранее.
    Если токена нет — возбуждает исключение.
    """
    if token := user.get(None):
        return token

    raise AuthError("Token is not provided")
