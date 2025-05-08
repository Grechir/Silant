from rest_framework import serializers

# Поле company_name обязательно, если выбрана роль service, в ином случае его можно не заполнять
def validate_company_for_service(role, company_name):
    if role != 'manager' and not company_name:
        raise serializers.ValidationError({
            'company_name': 'Это поле обязательно для заполнения.'
        })
