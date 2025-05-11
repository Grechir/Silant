from main_app.models import Machine


class RoleBasedQuerysetMixin:
    """
    Миксин для автоматического фильтра по роли пользователя. Наследуется представлениями.
    """
    def get_queryset(self):
        user = self.request.user

        if not user.is_authenticated:
            return self.queryset.filter(public=True)  # или можно сделать .only(...) public - придется применять к полям в модели

        role = getattr(user.profile, 'role', None)

        if role == 'client':
            machines = Machine.objects.filter(client=user)

            if machines.exists():
                return self.queryset.filter(machine=machines)
            else:
                return self.queryset.none()

        if role == 'service':
            return self.queryset.filter(serviceCompany=user)
        if role == 'manager':
            return self.queryset.all()

        return self.queryset.none()
