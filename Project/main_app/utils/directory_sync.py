from ..models import Directory, Profile

def sync_profile_directories(profile: Profile):
    """Создает или обновляет связанные справочники при сохранении профиля"""
    if profile.role in ['service', 'client']:
        Directory.objects.update_or_create(
            entity=dict(Profile.ROLE_CHOICES).get(profile.role),
            name=profile.company_name,
            defaults={
                'description': profile.company_description or '',
                'user': profile.user,
                      }
        )

    if profile.role == 'service':
        Directory.objects.update_or_create(
            entity='Организация, проводившая ТО',
            name=profile.company_name,
            defaults={
                'description': profile.company_description or '',
                'user': profile.user,
                      }
        )


def delete_profile_directories(profile: Profile):
    """Удаляет справочники, связанные с профилем"""
    if profile.role in ['service', 'client']:
        Directory.objects.filter(
            entity=dict(Profile.ROLE_CHOICES).get(profile.role),
            name=profile.company_name
        ).delete()

    if profile.role == 'service':
        Directory.objects.filter(
            entity='Организация, проводившая ТО',
            name=profile.company_name
        ).delete()


def update_profile_directories_on_company_name_change(old_profile: Profile, new_profile: Profile):
    """Обновляет справочники, если изменилось название компании"""
    if old_profile.company_name != new_profile.company_name:
        delete_profile_directories(old_profile)
        sync_profile_directories(new_profile)
