import django_filters
from .models import Machine, Maintenance, Complaint, Directory


class MachineFilter(django_filters.FilterSet):
    class Meta:
        model = Machine
        fields = {
            'model': ['exact'],
            'engine': ['exact'],
            'transmission': ['exact'],
            'drivingAxle': ['exact'],
            'controlledAxle': ['exact'],
        }


class MaintenanceFilter(django_filters.FilterSet):
    class Meta:
        model = Maintenance
        fields = {
            'maintenanceType': ['exact'],
            'machine': ['exact'],
            'serviceCompany': ['exact'],
        }


class ComplaintFilter(django_filters.FilterSet):
    class Meta:
        model = Complaint
        fields = {
            'breakdownNode': ['exact'],
            'recoveryMethod': ['exact'],
            'serviceCompany': ['exact'],
        }


class DirectoryFilter(django_filters.FilterSet):
    class Meta:
        model = Directory
        fields = {
            'entity': ['exact'],  # фильтр по точному совпадению entity
        }








