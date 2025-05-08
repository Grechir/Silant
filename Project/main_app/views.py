from rest_framework import viewsets
from django.contrib.auth.models import User
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

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

class ComplaintViewSet(viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

class DirectoryViewSet(viewsets.ModelViewSet):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer
