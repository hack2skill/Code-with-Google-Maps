from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    account_number = models.CharField(max_length=30, null=True, blank=True)
    bank_name = models.CharField(max_length=100, null=True, blank=True)
    ifsc_code = models.CharField(max_length=15, null=True, blank=True)
    branch = models.CharField(max_length=100, null=True, blank=True)
    upi_id = models.CharField(max_length=50, null=True, blank=True)
    home_address = models.CharField(max_length=200, null=True, blank=True)
    district = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    zipcode = models.CharField(max_length=10, null=True, blank=True)
    lat = models.FloatField(max_length=120, null=True, blank=True)
    lon = models.FloatField(max_length=120, null=True, blank=True)
    available = models.BooleanField(default=False)
    got_loc = models.BooleanField(default=False)
    completed_profile = models.BooleanField(default=False)
    wallet = models.FloatField(max_length=120, blank=True, default=0.0)


class Requests(models.Model):
    from_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sent_requests')
    to_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='received_requests')
    timestamp = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    charge_amt = models.FloatField(max_length=120, blank=True, null=True)
    charge_time = models.FloatField(max_length=120, blank=True, null=True)
    adv_pay_status = models.BooleanField(default=False)
    fin_pay_status = models.BooleanField(default=False)


class ChargingStations(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    lat = models.FloatField(max_length=120, null=True, blank=True)
    lon = models.FloatField(max_length=120, null=True, blank=True)
