from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Directory, Machine, Maintenance, Complaint
from .validators import validate_company_for_service

from .utils.directory_sync import (
    update_profile_directories_on_company_name_change,
    sync_profile_directories,
)
from .utils.serialezer_helpers import (
    add_directory_fields
)

class UserWithProfileSerializer(serializers.ModelSerializer):

    role = serializers.ChoiceField(
        source='profile.role',
        choices=Profile.ROLE_CHOICES
    )
    company_name = serializers.CharField(
        source='profile.company_name',
        required=False,
        allow_blank=True,
    )
    company_description = serializers.CharField(
        source='profile.company_description',
        required=False,
        allow_blank=True
    )

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'role',
            'company_name',
            'company_description',
            'first_name',
            'last_name',
            'email',
        ]

        extra_kwargs = {
            'password': {'write_only': True}
        }

    # создаем объекты моделей User и Profile в одном блоке
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        role = profile_data.pop('role')
        company_name = profile_data.pop('company_name', '')
        company_description = profile_data.pop('company_description', '')

        user = User.objects.create_user(**validated_data)  # create_user для вызова .set_password() и хеширования пароля

        profile = Profile.objects.create(
            user=user,
            role=role,
            company_name=company_name if role != 'manager' else '',
            company_description=company_description if role != 'manager' else '',
        )

        sync_profile_directories(profile)  # утилита

        return user

    # обновление полей модели Profile
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        company_name = profile_data.get('company_name')
        company_description = profile_data.get('company_description')

        # обновляем сам объект User без полей Profile
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # обновляем Profile (полю role решил не давать возможности для обновления)
        if company_name is not None:
            old_profile = Profile.objects.get(pk=instance.profile.pk)
            instance.profile.company_name = company_name
            instance.profile.company_description = company_description
            instance.profile.save()
            update_profile_directories_on_company_name_change(old_profile, instance.profile)  # утилита

        return instance

    # валидатор в отдельном файле
    def validate(self, attrs):
        profile_data = attrs.get('profile', {})
        role = profile_data.get('role')
        company_name = profile_data.get('company_name')
        validate_company_for_service(role, company_name)
        return attrs


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ['role', 'company_name', 'company_description']

    def validate(self, attrs):
        validate_company_for_service(attrs.get('role'), attrs.get('company_name'))
        return attrs


class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Directory
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Machine
        fields = '__all__'

    # Создаваемые вручную + автоматически создаваемые справочники
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # создаем словарь для удобства отображения справочников
        fields_info = {
            'engine': ('Модель двигателя', 'Модель двигателя'),
            'transmission': ('Модель трансмиссии', 'Модель трансмиссии'),
            'drivingAxle': ('Модель ведущего моста', 'Модель ведущего моста'),
            'controlledAxle': ('Модель управляемого моста', 'Модель управляемого моста'),
            'model': ('Модель машины', 'Модель машины'),
            'client': ('Клиент', 'Клиент'),
            'serviceCompany': ('Сервисная компания', 'Сервисная компания')
        }

        # создаем поля справочников на основе словаря для Машины
        add_directory_fields(self, fields_info)  # утилита


class MaintenanceSerializer(serializers.ModelSerializer):

    # автоматически создаваемый справочник
    machine = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(),
        label='Зав. № машины'
    )

    class Meta:
        model = Maintenance
        fields = '__all__'

    # Создаваемые вручную + автоматически создаваемые справочники
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # создаем словарь для удобства отображения справочников
        fields_info = {
            'maintenanceType': ('Вид ТО', 'Вид ТО'),
            'maintenance_org': ('Организация, проводившая ТО', 'Организация, проводившая ТО'),
            'serviceCompany': ('Сервисная компания', 'Сервисная компания')
        }

        # создаем поля справочников на основе словаря для ТО
        add_directory_fields(self, fields_info)  # утилита


class ComplaintSerializer(serializers.ModelSerializer):

    # автоматически создаваемый справочник
    machine = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(),
        label='Зав. № машины'
    )

    class Meta:
        model = Complaint
        fields = '__all__'

    # Создаваемые вручную + автоматически создаваемые справочники
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # создаем словарь для удобства отображения справочников
        fields_info = {
            'breakdownNode': ('Узел поломки', 'Узел поломки'),
            'recoveryMethod': ('Способ восстановления', 'Способ восстановления'),
            'serviceCompany': ('Сервисная компания', 'Сервисная компания')
        }

        # создаем поля справочников на основе словаря для ТО
        add_directory_fields(self, fields_info)  # утилита
