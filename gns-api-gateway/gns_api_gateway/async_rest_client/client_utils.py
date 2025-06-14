from functools import wraps  # Для сохранения метаданных функции при применении декоратора.
from typing import Any  # Для универсального указания типа.

from .constants import Methods  # Перечисление допустимых HTTP-методов (например, GET, POST).
from .exceptions import AsyncRestClientError  # Кастомное исключение клиента.

__all__ = ["CommonDictType", "check_arguments"]  # Экспортируемые элементы модуля.


# Универсальный тип для словаря, обычно используемого как headers, params и т.д.
# Пример: {"Authorization": "Bearer ...", "Accept": "application/json"}
CommonDictType = dict[str, Any]



def check_arguments(func):
    """
    Декоратор для асинхронных методов REST-клиента.
    Перед выполнением проверяет, что аргумент `method` имеет тип `Methods`.
    Полезен для валидации входных параметров и отлова ошибок на ранней стадии.
    """
    @wraps(func)
    async def checking(self, *args, **kwargs):  # noqa: WPS430 — отключение предупреждения линтера
        _check_methods_argument_type(kwargs)  # Проверка аргумента 'method'
        return await func(self, *args, **kwargs)  # Выполняем оригинальную функцию
    return checking



def _check_methods_argument_type(kwargs: CommonDictType) -> None:
    """
    Проверяет, что аргумент 'method' в kwargs имеет тип `Methods`.
    Если тип не совпадает — возбуждается исключение `AsyncRestClientError`.
    """
    if method := kwargs.get("method"):  # Пытаемся извлечь метод
        if not isinstance(method, Methods):  # Если тип не соответствует перечислению
            raise AsyncRestClientError(  # Поднимаем специфичное исключение клиента
                f"Argument 'method' must be {Methods} type, {type(method)} gotten"
            )
