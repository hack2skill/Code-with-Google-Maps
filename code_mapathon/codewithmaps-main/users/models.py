# Importing the models module
from django.db import models

# Importing the User model from django.contrib.auth.models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    """
    Model representing a user profile, with fields for address, location, and other details.

    Fields:
    - timestamp: DateTimeField that automatically records the date and time the object was created.
    - updated: DateTimeField that automatically records the date and time the object was last updated.
    - user: OneToOneField that links the profile to a User object.
    - address: CharField that represents the user's address.
    - town: CharField that represents the user's town or city.
    - county: CharField that represents the user's county.
    - postcode: CharField that represents the user's postal code.
    - country: CharField that represents the user's country.
    - longitude: CharField that represents the user's longitude.
    - latitude: CharField that represents the user's latitude.
    - captcha_score: FloatField that represents the user's captcha score.
    - has_profile: BooleanField that indicates whether the user has a profile.
    - is_active: BooleanField that indicates whether the user is active.
    """

    # Fields for the Profile model

    # Auto generated fields
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    # One to one relationship with the User model
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Char fields
    address = models.CharField(
        verbose_name="Address", max_length=100, null=True, blank=True
    )
    town = models.CharField(
        verbose_name="Town/City", max_length=100, null=True, blank=True
    )
    county = models.CharField(
        verbose_name="County", max_length=100, null=True, blank=True
    )
    postcode = models.CharField(
        verbose_name="Post Code", max_length=8, null=True, blank=True
    )
    country = models.CharField(
        verbose_name="Country", max_length=100, null=True, blank=True
    )
    longitude = models.CharField(
        verbose_name="Longitude", max_length=50, null=True, blank=True
    )
    latitude = models.CharField(
        verbose_name="Latitude", max_length=50, null=True, blank=True
    )

    # Float fields
    captcha_score = models.FloatField(default=0.0)

    # Boolean fields
    has_profile = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    # String representation of the Profile model
    def __str__(self):
        return f"{self.user}"
