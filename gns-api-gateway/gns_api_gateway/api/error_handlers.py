import logging
from http import HTTPStatus

from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from starlette import status
from starlette.requests import Request

from gns_api_gateway.api.serializers import ErrorModel  # Сериализатор для форматирования ошибок
from gns_api_gateway.domain.exceptions import BaseApiGatewayException, NotFoundError  # Кастомные исключения

logger = logging.getLogger(__name__)  # Логгер текущего модуля

def json_api_gateway_exception_error_handler(error: BaseApiGatewayException, status_code: int):
    """
    Общий обработчик для всех исключений, унаследованных от BaseApiGatewayException.
    Возвращает JSON-ответ с кодом и сообщением ошибки.
    """
    return JSONResponse(
        status_code=status_code,
        content=ErrorModel(code=error.code, message=str(error)).dict(),  # Форматируем ошибку с помощью ErrorModel
    )  # noqa: WPS221

def register_error_handler(app: FastAPI) -> None:
    """
    Регистрирует кастомные обработчики ошибок в FastAPI-приложении.
    Вызывается при старте приложения.
    """
    
    @app.exception_handler(BaseApiGatewayException)
    def handle_api_gateway_exception(req: Request, error: BaseApiGatewayException):  # noqa: WPS430
        """
        Обрабатывает все ошибки, унаследованные от BaseApiGatewayException,
        в зависимости от их конкретного типа.
        """
        mapper = [
            (NotFoundError, HTTPStatus.NOT_FOUND),  # Например, NotFoundError = 404
            (BaseApiGatewayException, HTTPStatus.BAD_REQUEST),  # Остальные — 400
        ]

        for error_type, status_code in mapper:
            if issubclass(type(error), error_type):
                return json_api_gateway_exception_error_handler(error, status_code)

    @app.exception_handler(ValidationError)
    def bad_request(req: Request, exc: ValidationError):  # noqa: WPS430
        """
        Обработка ошибок валидации Pydantic-моделей.
        Возвращает статус 400 и сериализованную ошибку.
        """
        return JSONResponse(
            status_code=HTTPStatus.BAD_REQUEST,
            content=ErrorModel(code="bad_request", message=str(exc)).dict(),
        )

    @app.exception_handler(Exception)
    def handle_all_errors(req: Request, error: Exception):  # noqa: WPS430
        """
        Глобальный обработчик всех необработанных исключений.
        Возвращает статус 500 и логирует ошибку.
        """
        logger.error(f"Unhandled error {error}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ErrorModel(code="unhandled_error", message=str(error)).dict(),
        )
