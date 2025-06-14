import logging  # Для записи ошибок и событий в лог.
from asyncio import sleep  # Асинхронная пауза между повторными попытками.
from functools import wraps  # Сохраняет метаданные декорируемой функции.


logger = logging.getLogger(__name__)  # Логгер текущего модуля.


__all__ = ["async_backoff"]  # Экспортируется только декоратор async_backoff.



def async_backoff(
    start_sleep_time: float = 0.1,  # Начальная задержка между попытками (в секундах).
    factor: int = 2,                # Множитель, по которому увеличивается задержка (экспоненциально).
    max_sleep_time: int = 6,       # Максимальная пауза между попытками (в секундах).
    times: int = 5,                # Общее число попыток.
):
    """
    Асинхронный декоратор для повторного выполнения функции при исключениях.
    Использует экспоненциальную задержку между попытками.
    """
    def func_wrapper(func):
        @wraps(func)
        async def inner(*args, **kwargs):
            time = start_sleep_time  # Начальная задержка.
            attempts = times  # Счётчик оставшихся попыток.
            while True:
                try:
                    return await func(*args, **kwargs)  # Пытаемся выполнить функцию.
                except Exception as err:
                    if not attempts:  # Если попытки закончились — пробрасываем исключение.
                        raise
                    # Экспоненциальное увеличение задержки, с ограничением максимума.
                    time = (time * 2 ** factor) if time < max_sleep_time else max_sleep_time
                    attempts -= 1
                    logger.error(  # Записываем ошибку и номер попытки в лог.
                        f"Error occured in {func.__name__}: {err}.\n"
                        f"Try to repeat {func.__name__}, attempt # {times - attempts}. "
                        f"Delay before attempt: {time} sec."
                    )
                await sleep(time)  # Пауза перед повторной попыткой.

        return inner  # Возвращаем обёртку.
    return func_wrapper  # Возвращаем декоратор.

