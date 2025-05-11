from rest_framework import viewsets
from django.contrib.auth.models import User

from .mixins import RoleBasedQuerysetMixin
from .permissions import RoleBasedAccessPermission
from .models import Profile, Machine, Maintenance, Complaint, Directory
from .serializers import (
    UserWithProfileSerializer,
    ProfileSerializer,
    MachineSerializer,
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
        'client': [],
        'service': [],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class MachineViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'anonymous': ['GET'],
        'client': ['GET'],
        'service': ['GET'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }


class MaintenanceViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'client': ['GET', 'POST', 'PUT', 'PATCH'],
        'service': ['GET', 'POST', 'PUT', 'PATCH'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class ComplaintViewSet(RoleBasedQuerysetMixin, viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'client': ['GET'],
        'service': ['GET', 'POST', 'PUT', 'PATCH'],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer
    permission_classes = [RoleBasedAccessPermission]

    permission_config = {
        'client': [],
        'service': [],
        'manager': ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    }
