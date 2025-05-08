from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Profile
from .utils.directory_sync import delete_profile_directories

@receiver(post_delete, sender=Profile)
def delete_directory_on_profile_delete(sender, instance, **kwargs):
    delete_profile_directories(instance)
