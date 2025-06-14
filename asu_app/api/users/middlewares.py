import datetime  # Для записи текущего времени
from django.core.cache import cache  # Используется для хранения времени последней активности
from django.conf import settings  # Для доступа к настройкам проекта
from rest_framework.authtoken.models import Token  # DRF токены для аутентификации



# Промежуточный слой (middleware), отслеживающий активность пользователя на основе токена авторизации
class ActiveUserMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response  # Сохраняем ссылку на функцию, обрабатывающую запрос

    def __call__(self, request):
        # Получаем заголовок авторизации (Authorization: Token <ключ>)
        header_token = request.META.get('HTTP_AUTHORIZATION')
        if header_token:
            token = header_token[6:]  # Убираем "Token " в начале строки
            try:
                # Пытаемся найти токен в базе
                token_obj = Token.objects.get(key=token)
                current_user = token_obj.user
                now = datetime.datetime.now()  # Текущее время

                # Сохраняем в кеше метку последнего действия пользователя
                # Ключ: seen_<user_id>, значение: время, TTL задаётся в настройках
                cache.set(f'seen_{current_user.id}', now, settings.USER_LASTSEEN_TIMEOUT)
            except Token.DoesNotExist:
                pass  # Если токен не найден — просто игнорируем

        # Передаём запрос дальше по цепочке middleware
        response = self.get_response(request)

        return response  # Возвращаем ответ
