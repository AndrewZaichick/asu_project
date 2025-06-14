from urllib.parse import urlparse, urlunparse  # Для изменения части URL-ов

from rest_framework import serializers
from api.subjects.models import Lab, Lecture, Folder, File, Subject, Semester
from api.groups.serializers import SpecialitySerializer  # Вложенный сериализатор специальностей


# Вспомогательная функция — заменяет хост/порт в URL-е файла
def replace_url(url: str) -> str:
    parsed_url = urlparse(url)  # Разбираем URL на части
    new_netloc = f"{parsed_url.hostname}:3081"  # Меняем порт на 3081 (используется фронтендом)
    return urlunparse(parsed_url._replace(netloc=new_netloc))  # Собираем URL обратно


# Сериализатор для модели Subject (дисциплина)
class SubjectSerializer(serializers.ModelSerializer):
    allowed_specialities = SpecialitySerializer(read_only=True, many=True)  # Сериализация списка специальностей
    allow_console = serializers.ReadOnlyField()  # Флаг (рассчитанное поле)

    class Meta:
        model = Subject
        fields = '__all__'  # Все поля модели


# Сериализатор для модели Semester
class SemesterSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)  # Вложенная сериализация предмета

    class Meta:
        model = Semester
        fields = '__all__'


# Сериализатор для лабораторной работы
class LabSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer(read_only=True)  # Вложенный семестр
    file = serializers.SerializerMethodField()  # Поле обрабатывается через кастомную функцию

    class Meta:
        model = Lab
        fields = '__all__'

    def get_file(self, obj):
        request = self.context.get('request')  # Получаем запрос из контекста
        if obj.file:
            file_url = obj.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)  # Превращаем путь в абсолютный URL
            file_url = replace_url(file_url)  # Меняем хост/порт
            return file_url
        return None


# Сериализатор для лекции
class LectureSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer(read_only=True)
    file = serializers.SerializerMethodField()

    class Meta:
        model = Lecture
        fields = '__all__'

    def get_file(self, obj):
        request = self.context.get('request')
        if obj.file:
            file_url = obj.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)
            file_url = replace_url(file_url)
            return file_url
        return None


# Сериализатор для папки с файлами
class FolderSerializer(serializers.ModelSerializer):
    semester = SemesterSerializer(read_only=True)

    class Meta:
        model = Folder
        fields = '__all__'


# Сериализатор для отдельного файла в папке
class FileSerializer(serializers.ModelSerializer):
    folder = FolderSerializer(read_only=True)
    file = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = '__all__'

    def get_file(self, obj):
        request = self.context.get('request')
        if obj.file:
            file_url = obj.file.url
            if request:
                file_url = request.build_absolute_uri(file_url)
            file_url = replace_url(file_url)
            return file_url
        return None
