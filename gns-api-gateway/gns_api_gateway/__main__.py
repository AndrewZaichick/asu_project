import click  # Библиотека для создания CLI-команд (альтернатива argparse, но более удобная).

from gns_api_gateway.entrypoint import run_api  # Функция, запускающая основное API-приложение (сервер).



@click.group()
def cli() -> None:
    """
    Основная CLI-группа. Используется как корень для добавления подкоманд.
    Вызов без аргументов ничего не делает.
    """
    pass



@click.command()
def serve() -> None:
    """
    Подкоманда `serve`, которая запускает сервер приложения.
    Вызывается как: `python -m gns_api_gateway serve`
    """
    run_api()  # Запуск основной точки входа (FastAPI, aiohttp, Sanic и т.п.).



if __name__ == "__main__":
    cli.add_command(serve)  # Добавляем подкоманду `serve` в CLI-группу.
    cli()  # Запуск CLI-приложения.

