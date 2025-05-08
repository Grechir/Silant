from rest_framework import serializers
from ..models import Directory

def add_directory_fields(serializer_instance, fields_info: dict):
    """
    Добавляет в сериализатор поля PrimaryKeyRelatedField на основе справочников Directory.
    :param serializer_instance: Экземпляр сериализатора (self)
    :param fields_info: Словарь вида { 'field_name': ('entity', 'label') }
    """
    for field_name, (entity, label) in fields_info.items():
        serializer_instance.fields[field_name] = serializers.PrimaryKeyRelatedField(
            queryset=Directory.objects.filter(entity=entity),
            label=label
        )
