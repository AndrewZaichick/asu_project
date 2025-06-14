from typing import Any

from gns_api_gateway.api import get_user_token  # Получение токена текущего пользователя
from gns_api_gateway.domain import UserRole  # Роли пользователей (STUDENT, TEACHER)
from gns_api_gateway.infrastructure import GNS3Proxy, UserRepository  # Прокси и репозиторий пользователя

__all__ = ["GNS3Service"]  # Экспортируемый класс

class GNS3Service:
    """
    Сервис для работы с GNS3-проектами в контексте конкретного пользователя.
    Обеспечивает привязку проектов к пользователю и фильтрацию по правам доступа.
    """

    def __init__(self, gns3_proxy: GNS3Proxy, user_repository: UserRepository) -> None:
        # Прокси к GNS3-серверу и репозиторий для работы с пользователями
        self._gns3_proxy = gns3_proxy
        self._user_repository = user_repository

    async def add_project_to_user(self, project_id: str) -> None:
        """
        Добавляет идентификатор проекта к списку проектов пользователя.
        Используется после успешного создания проекта.
        """
        user = await self._user_repository.get_user_by_token(get_user_token())
        user.add_project(project_id)  # Добавляем проект в JSONField
        await self._user_repository.update(user)  # Сохраняем изменения

    async def get_user_projects(self, projects: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """
        Фильтрует список проектов GNS3 в зависимости от роли пользователя:
        - Студенты видят только свои проекты;
        - Преподаватели и админы — все.
        """
        user = await self._user_repository.get_user_by_token(get_user_token())

        if user.role == UserRole.STUDENT:
            # Только те проекты, которые присутствуют в user.projects
            return [p for p in projects if p["project_id"] in user.projects]

        return projects  # Преподаватели и админы видят все

    async def remove_project_from_user(self, project_id: str) -> None:
        """
        Удаляет проект у пользователя из списка при удалении его в GNS3.
        """
        user = await self._user_repository.get_user_by_token(get_user_token())
        user.delete_project(project_id)  # Удаляем ID проекта из списка
        await self._user_repository.update(user)  # Сохраняем пользователя
