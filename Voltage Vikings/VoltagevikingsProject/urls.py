from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('VoltageVikingsApp.urls')),
    path('admin/', admin.site.urls),
]
