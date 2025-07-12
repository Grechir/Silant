from types import GetSetDescriptorType

from rest_framework import viewsets
from rest_framework import filters
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User


from .mixins import RoleBasedQuerysetMixin
from .permissions import RoleBasedAccessPermission
from .filters import MachineFilter, MaintenanceFilter, ComplaintFilter, DirectoryFilter
from .models import Profile, Machine, Maintenance, Complaint, Directory
from .serializers import (
    UserWithProfileSerializer,
    ProfileSerializer,
    MachineSerializer,
    PublicMachineSerializer,
    MaintenanceSerializer,
    ComplaintSerializer,
    DirectorySerializer
)

class UserWithProfileViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserWithProfileSerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'client': [],
        'service': [],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'client': ['GET'],
        'service': ['GET'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class PublicMachineViewSet(viewsets.ModelViewSet):
    """
    Публичное представление списка машин с поиском по серийному номеру.
    По умолчанию ничего не показывается. При наличии фильтра (серийного номера)
    возвращаются данные.
    """
    queryset = Machine.objects.all()
    serializer_class = PublicMachineSerializer
    permission_classes = [RoleBasedAccessPermission]
    filter_backends = [filters.SearchFilter]
    search_fields = ['serial_number']

    permission_config = {
        'client': [],
        'service': [],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        'anonymous': ['GET'],
    }

    def get_queryset(self):
        queryset = super().get_queryset()

        # Проверка на наличие фильтра
        serial_number = self.request.query_params.get('search', None)  # берем search из url
        if serial_number:
            return Machine.objects.filter(serial_number=serial_number).order_by('id')
        return Machine.objects.none()


class MachineViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Machine.objects.all().order_by('-shipmentDate')  # сортировка по умолчанию
    serializer_class = MachineSerializer
    permission_classes = [RoleBasedAccessPermission]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MachineFilter

    permission_config = {
        'client': ['GET'],
        'service': ['GET'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }


class MaintenanceViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Maintenance.objects.all().order_by('-maintenanceDate')  # сортировка по умолчанию
    serializer_class = MaintenanceSerializer
    permission_classes = [RoleBasedAccessPermission]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = MaintenanceFilter

    permission_config = {
        'client': ['GET', 'POST', 'PUT', 'PATCH'],
        'service': ['GET', 'POST', 'PUT', 'PATCH'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class ComplaintViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Complaint.objects.all().order_by('-breakdownDate')  # сортировка по умолчанию
    serializer_class = ComplaintSerializer
    permission_classes = [RoleBasedAccessPermission]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ComplaintFilter

    permission_config = {
        'client': ['GET'],
        'service': ['GET', 'POST', 'PUT', 'PATCH'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer
    permission_classes = [RoleBasedAccessPermission]
    filterset_class = DirectoryFilter

    permission_config = {
        'client': ['GET'],
        'service': ['GET'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }
