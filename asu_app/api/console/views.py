# Импортируем библиотеку Netmiko для работы с сетевыми устройствами через Telnet/SSH
import netmiko

# Импорт базовых представлений и классов Django REST Framework
from rest_framework import viewsets, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

# Импорт моделей и сериализаторов
from api.console.models import Devices, MainCommands
from api.console.serializers import DeviceSerializer, CommandSerializer

# Импорт классов прав доступа
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from asu_app.custom_permissions import ReadOnlyIfAllowed, ConsolePermissions

# Импорт редиректа и настроек
from django.shortcuts import redirect
from asu_app.settings import WEB_GNS_HOST


# Класс, инкапсулирующий работу с CLI устройств через Telnet (Netmiko)
class Console():
    def __init__(self):
        self.is_connected = False  # Флаг активного соединения
        self.send_term_length = True  # Один раз отправляется "terminal length 0" для отключения постраничного вывода

    def connect(self, request, device):
        # Устанавливаем соединение с устройством по параметрам из модели Devices
        self.__gns = netmiko.ConnectHandler(
            device_type='generic_termserver_telnet',  # Тип устройства — эмулятор (можно адаптировать)
            ip=str(device.host),
            username=str(device.username),
            password=str(device.password),
            port=str(device.port)
        )
        self.is_connected = True
        # Отключаем постраничный вывод, чтобы получать весь результат команды сразу
        if self.send_term_length:
            self.__gns.send_command("terminal length 0")
            self.send_term_length = False

    def disconnect(self):
        # Закрываем соединение
        self.__gns.disconnect()
        self.is_connected = False

    def execute_command(self, command):
        if not self.is_connected:
            return "Connection error"
        # Отправка команды без тайм-аута ожидания (быстрое выполнение)
        result = self.__gns.send_command_timing(command, delay_factor=0)
        prompt = self.__gns.find_prompt()  # Получаем текущую командную строку устройства
        return result, prompt


# Экземпляр консоли, используется во всех APIView
console = Console()


# Функция получения описания команды и её подкоманд из БД (если такая команда найдена)
def command_info(command):
    command = command.replace('?', '').replace(' ', '')
    try:
        db_command = MainCommands.objects.get(command_name__iexact=command)
    except Exception:
        return f'Command "{command}" not found'

    result = f'Command: {db_command.command_name}\nDescription: {db_command.description}\n'
    subcommands = db_command.subcommands.all()
    if subcommands:
        result += 'Subcommands:\n'
        subcommand_result = '\n'.join(
            [f'Subcommand: {subcom.subcommand_name}\nDescription: {subcom.description}' for subcom in subcommands]
        )
        return result + subcommand_result
    return result + 'Subcommands not found'


# ViewSet для модели Devices: включает все CRUD-операции
class DeviceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnlyIfAllowed]
    queryset = Devices.objects.all()
    serializer_class = DeviceSerializer


# ViewSet для модели MainCommands: включает поиск по подкомандам
class CommandViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser | ReadOnlyIfAllowed]
    queryset = MainCommands.objects.all()
    serializer_class = CommandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['command_name', 'subcommands__subcommand_name']


# POST-запрос на подключение к устройству
class ConnectToDeviceView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser | ConsolePermissions]

    def post(self, request, format='json'):
        try:
            device = Devices.objects.get(pk=request.data['id'])  # Получаем устройство по ID
            console.connect(request, device)  # Подключаемся
            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# POST-запрос на отключение от устройства
class DisconnectFromDeviceView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser | ConsolePermissions]

    def post(self, request, format='json'):
        try:
            console.disconnect()
            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# POST-запрос на выполнение команды на устройстве
class ExecuteCommandView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser | ConsolePermissions]

    def post(self, request, format='json'):
        try:
            # Получаем устройство из параметров запроса
            device = Devices.objects.get(pk=request.query_params['id'])
            console.connect(request, device)  # Подключаемся
            command = request.data["command"]
            result, prompt = console.execute_command(command)  # Выполняем команду
            console.disconnect()  # Закрываем соединение
            return Response({"result": result, "prompt": prompt}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)  # Отладочный вывод
            return Response(status=status.HTTP_400_BAD_REQUEST)


# Представление для перенаправления на внешний адрес GNS (из настроек)
class WebGNSView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser | ConsolePermissions]

    def get(self, request):
        redirect(WEB_GNS_HOST)


# Функция-представление для прямого редиректа (используется в urls.py)
def web_gns_view(request):
    return redirect(WEB_GNS_HOST)
