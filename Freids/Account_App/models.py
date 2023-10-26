from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Cuisine(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.title

class Review(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(6)]

    rating = models.IntegerField(
        choices=RATING_CHOICES,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    comment = models.TextField()
    user_account = models.ForeignKey('Account_App.User', on_delete=models.CASCADE, related_name='account_reviews',null=True,blank=True)
    business_account = models.ForeignKey('Account_App.BusinessAccount', on_delete=models.CASCADE, related_name='account_reviews',null=True,blank=True)
    images = models.ManyToManyField(Image,blank=True)

    def __str__(self):
        return f"Review by {self.user_account} for {self.business_account}"




class User(models.Model):
    phone_number = models.CharField(max_length=15)
    image = models.ImageField(upload_to='user_images/',null=True,blank=True)
    is_vegetarian = models.BooleanField()

class BusinessAccount(models.Model):
    business_name = models.CharField(max_length=100)
    street_name = models.CharField(max_length=100)
    locality = models.CharField(max_length=100)
    cuisines = models.ManyToManyField(Cuisine)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    reviews = models.ManyToManyField(Review, related_name='business_accounts', blank=True)
    images = models.ManyToManyField(Image, related_name='business_account_images', blank=True)
    menu = models.ManyToManyField(Image, related_name='business_account_menu', blank=True)
    primage = models.ImageField(upload_to='images/',blank=True,null=True)

    def __str__(self):
        return f"{self.business_name} (ID: {self.id})"


class AccountManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)


class Account(AbstractUser,PermissionsMixin):
    username = models.CharField(unique=True, max_length=30)
  
    is_user = models.BooleanField(default=False)
    is_business = models.BooleanField(default=False)
    user_profile = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='account_user_profile')
    business_profile = models.OneToOneField(BusinessAccount, on_delete=models.CASCADE, null=True, blank=True, related_name='account_business_profile')
    groups = models.ManyToManyField(Group, verbose_name=_('groups'), blank=True, related_name='account_groups')
    user_permissions = models.ManyToManyField(Permission, verbose_name=_('user permissions'), blank=True, related_name='account_user_permissions')
  
    objects = AccountManager()

    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.email












