"""
URL configuration for Project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main_app.views import (
    UserWithProfileViewSet,
    ProfileViewSet,
    MachineViewSet,
    PublicMachineViewSet,
    MaintenanceViewSet,
    ComplaintViewSet,
    DirectoryViewSet
)

router = DefaultRouter()
router.register('users', UserWithProfileViewSet)
router.register('profile', ProfileViewSet)
router.register('machine', MachineViewSet)
router.register('public/machine', PublicMachineViewSet)
router.register('maintenance', MaintenanceViewSet)
router.register('complaint', ComplaintViewSet)
router.register('directory', DirectoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/', include('allauth.urls')),
]
