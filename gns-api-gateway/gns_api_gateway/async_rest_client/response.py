import json  # Для сериализации/десериализации тела ответа.
from dataclasses import dataclass  # Упрощённое объявление класса данных (автоматически создаёт init, repr и т.д.).
from typing import Any  # Универсальный тип, может быть что угодно.


__all__ = ["Response"]  # Экспортируется только класс Response при использовании from module import *.



@dataclass
class Response:
    """
    Класс-обёртка для представления HTTP-ответа.
    Хранит:
    - content: тело ответа в байтах
    - status_code: код состояния HTTP (например, 200, 404)
    - headers: словарь заголовков ответа

    Предоставляет удобные методы для чтения и изменения содержимого.
    """
    content: bytes  # Сырой ответ сервера (в байтах).
    status_code: int  # HTTP-статус (например, 200, 404, 500).
    headers: dict[str, Any]  # Заголовки ответа, полученные от сервера.

    def get_content(self) -> Any:
        """
        Десериализует content из JSON в Python-объект.
        Используется, если сервер возвращает JSON (например, {"message": "OK"}).
        :return: dict/list/str/int — в зависимости от содержимого.
        """
        return json.loads(self.content)


    def change_content(self, content: Any) -> None:
        """
        Изменяет тело ответа и автоматически обновляет заголовок 'Content-Length'.
        Преобразует переданный объект в JSON-строку, кодирует в байты и обновляет headers.

        :param content: новый контент (например, dict)
        """
        self.content = json.dumps(content).encode()  # Сериализация + кодирование в байты.
        self.headers["Content-Length"] = str(len(self.content))  # Обновляем длину тела.


    def status_code_ok(self) -> bool:
        """
        Проверка, успешен ли ответ (код < 400).
        Используется для фильтрации ошибок (например, 404, 500 и т.д.).
        :return: True, если статус < 400 (успешный или редирект).
        """
        return self.status_code < 400

