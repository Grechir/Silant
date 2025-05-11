from rest_framework.permissions import BasePermission, SAFE_METHODS

class RoleBasedAccessPermission(BasePermission):
    """
     Универсальный RBAC permission.
     Требует наличия:
        - permission_config: dict, где ключ — строка с ролью пользователя, значение — список разрешённых HTTP-методов.
     (RBAC - Role-Based Access Control - управление доступом на основе ролей).
     """
    def has_permission(self, request, view):
        config = getattr(view, 'permission_config', {})
        role = None  # role всегда существует, даже если никакое условие не выполнилось

        if request.user.is_authenticated:
            role = getattr(request.user.profile, 'role', None)
        else:
            role = 'anonymous'

        method = request.method  # сохраняем метод запроса, чтобы потом сравнить его с разрешенными методами
        allowed_methods = config.get(role, [])

        # OPTIONS - служебный метод. Нужен всегда независимо от роли, к примеру, для CORS или swagger
        if method == 'OPTIONS':
            return True

        # определенные нами доступные методы
        if method in allowed_methods:
            return True

        # если есть GET, то и остальные безопасные методы из SAFE_METHODS должны быть разрешены (HEAD, OPTIONS)
        if method in SAFE_METHODS and 'GET' in allowed_methods:
            return True

        return False




