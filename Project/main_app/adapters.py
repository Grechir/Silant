from allauth.account.adapter import DefaultAccountAdapter

class NoNewAccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        return False  # запрет регистрации
