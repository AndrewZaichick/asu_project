# Импортируем базовый модуль сериализации из Django REST Framework
from rest_framework import serializers

# Импортируем модели, которые будем сериализовать
from api.console.models import MainCommands, Devices, Subcommands


# Сериализатор для модели Devices
# Позволяет автоматически преобразовывать все поля модели Devices в JSON и обратно
class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devices               # Модель, которую сериализуем
        fields = '__all__'           # Сериализуются все поля модели


# Сериализатор для подкоманд (Subcommands)
# Используется как вложенный сериализатор для основного объекта команды
class SubCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcommands
        # Список полей, которые будут сериализованы
        fields = ('subcommand_name', 'description')


# Сериализатор для основной команды (MainCommands)
# Включает вложенный сериализатор подкоманд, но только для чтения (read_only=True)
class CommandSerializer(serializers.ModelSerializer):
    # Вложенное поле subcommands — сериализует связанные подкоманды, связанные через related_name='subcommands'
    subcommands = SubCommandSerializer(many=True, read_only=True)

    class Meta:
        model = MainCommands
        # Сериализуются все поля модели, включая автоматически добавленное поле subcommands
        fields = '__all__'
