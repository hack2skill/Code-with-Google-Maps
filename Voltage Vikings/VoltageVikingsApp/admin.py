from django.contrib import admin
from .models import UserProfile, Requests, ChargingStations

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Requests)
admin.site.register(ChargingStations)
