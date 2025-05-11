import django_filters
from .models import Machine, Maintenance, Complaint

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
            'machine': ['icontains'],
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











