from django.contrib import admin
from .models import Cuisine, Image, Review, User, BusinessAccount, Account

@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['title']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['rating', 'user_account', 'business_account']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['phone_number', 'is_vegetarian']

@admin.register(BusinessAccount)
class BusinessAccountAdmin(admin.ModelAdmin):
    list_display = ['business_name', 'street_name', 'locality']

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'is_user', 'is_business']

    # Optionally, customize the form in the admin panel
    fieldsets = (
        ('Account Info', {'fields': ('email', 'username', 'is_user', 'is_business')}),
        ('Profile', {'fields': ('user_profile', 'business_profile')}),
        ('Permissions', {'fields': ('groups', 'user_permissions')}),
    )
