# Импортируем базовые классы сериализаторов из Django REST Framework
from rest_framework import serializers

# Импортируем модели, которые будем сериализовать
from api.groups.models import Group, Speciality


# Сериализатор для модели Speciality
# Преобразует объекты Speciality в JSON и обратно
class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality     # Сериализуемая модель
        fields = '__all__'     # Включаем все поля модели


# Сериализатор для модели Group
class GroupSerializer(serializers.ModelSerializer):
    # Вложенный сериализатор специальности: только для чтения
    # Это позволяет выводить всю информацию о специальности, а не только её ID
    speciality = SpecialitySerializer(read_only=True)

    class Meta:
        model = Group
        fields = '__all__'     # Сериализуются все поля, включая вложенную специальность
