from rest_framework import serializers
from ..models import Directory, User, Machine


class UserCompanyField(serializers.PrimaryKeyRelatedField):
    """
        Кастомное поле для отображения пользователя: сначала `company_name`, если нет — `username`.
        В случае ошибки возвращает строковое представление пользователя. display_value для API
    """
    def display_value(self, value):
        try:
            return value.profile.company_name or value.username
        except Exception:
            return str(value)


def add_directory_fields(serializer_instance, fields_info: dict):
    from ..serializers import DirectorySerializer, UserWithProfileSerializer, MachineSerializer
    """
       Добавляет поля в сериализатор на основе словаря `fields_info`. Для полей 'client' и 'serviceCompany'
       фильтрует пользователей по ролям. Для остальных полей добавляет обычные связи с Directory.
    """
    for field_name, (entity, label) in fields_info.items():
        if field_name == 'client':
            queryset = User.objects.filter(profile__role='client')
            serializer_instance.fields[field_name] = UserCompanyField(
                queryset=queryset,
                label=label,
            )
            serializer_instance.fields[f'{field_name}_data'] = UserWithProfileSerializer(
                source=field_name,
                read_only=True
            )

        elif field_name == 'serviceCompany':
            queryset = User.objects.filter(profile__role='service')
            serializer_instance.fields[field_name] = UserCompanyField(
                queryset=queryset,
                label=label,
            )
            serializer_instance.fields[f'{field_name}_data'] = UserWithProfileSerializer(
                source=field_name,
                read_only=True
            )

        elif field_name == 'machine':
            queryset = Machine.objects.all()
            serializer_instance.fields[field_name] = serializers.PrimaryKeyRelatedField(
                queryset=queryset,
                label=label,
            )
            serializer_instance.fields[f'{field_name}_data'] = MachineSerializer(
                source=field_name,
                read_only=True
            )

        else:
            queryset = Directory.objects.filter(entity=entity)
            serializer_instance.fields[field_name] = serializers.PrimaryKeyRelatedField(
                queryset=queryset,
                label=label,
            )
            serializer_instance.fields[f'{field_name}_data'] = DirectorySerializer(
                source=field_name,
                read_only=True
            )
