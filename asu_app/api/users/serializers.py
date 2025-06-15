from django.contrib.auth import get_user_model  # Получаем текущую модель пользователя (может быть кастомной)
from rest_framework import serializers
from rest_framework.validators import UniqueValidator  # Валидатор уникальности (например, username, email)
from api.users.models import User, UserRole  # Наша модель пользователя и enum ролей
from api.subjects.models import Subject  # Для выбора предметов преподавателем
from asu_app.settings import SYSTEM_ADMINISTRATION_SUBJECT_ID  # ID системной дисциплины (используется для прав)
from django.contrib.auth.models import Permission  # Django permissions (для выдачи прав преподавателям)



class UserSerializer(serializers.ModelSerializer):
    is_online = serializers.ReadOnlyField()  # Свойство из модели — отображает, онлайн ли пользователь
    last_seen = serializers.ReadOnlyField()  # Свойство из модели — время последней активности

    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'group',
            'role',
            'is_online',
            'last_seen',
        )


class UserDetailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # Email должен быть уникален
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]  # Username тоже уникален
    )
    password = serializers.CharField(
        min_length=8, required=True, write_only=True  # Пароль скрыт при сериализации
    )
    is_superuser = serializers.BooleanField(read_only=True)  #  Явно указать
    role = serializers.IntegerField(read_only=True)          #  Явно указать

    def create(self, validated_data):
        # Создание пользователя через встроенный create_user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            group=validated_data['group'],  # Группа обязательна для студентов
        )
        return user

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'group',
            'teacher_subjects',
            'is_superuser',
            'role',
        )



class TeacherSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        min_length=8, required=True, write_only=True
    )

    # Преподаватель выбирает дисциплины, которые он ведёт
    teacher_subjects = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), many=True
    )

    def create(self, validated_data):
        # Создаём преподавателя без группы
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        # Привязываем дисциплины
        user.teacher_subjects.set(validated_data['teacher_subjects'])

        # Назначаем права на основные сущности (тесты, лекции, лабораторные, папки и т.п.)
        user.user_permissions.add(
            *Permission.objects.filter(codename__iendswith='test').all(),
            *Permission.objects.filter(codename__iendswith='lab').all(),
            *Permission.objects.filter(codename__iendswith='lecture').all(),
            *Permission.objects.filter(codename__iendswith='folder').all(),
            *Permission.objects.filter(codename__iendswith='file').all(),
            *Permission.objects.filter(codename__iendswith='semester').all(),
            *Permission.objects.filter(codename__iendswith='question').all(),
            *Permission.objects.filter(codename__iendswith='answeroption').all(),
            Permission.objects.get(codename='view_testsresult'),  # Просмотр результатов тестов
        )

        # Если преподаватель ведёт системное администрирование — выдаём доступ к консоли
        if (
            SYSTEM_ADMINISTRATION_SUBJECT_ID
            in [subj.id for subj in validated_data['teacher_subjects']]
        ):
            user.user_permissions.add(
                *Permission.objects.filter(codename__iendswith='maincommands').all(),
                *Permission.objects.filter(codename__iendswith='subcommands').all(),
                *Permission.objects.filter(codename__iendswith='devices').all(),
            )

        user.is_staff = True  # Доступ к админке
        user.role = UserRole.TEACHER  # Назначаем роль преподавателя
        user.save()

        return user

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'group',
            'teacher_subjects'
        )

