from captcha.fields import CaptchaField
from allauth.account.forms import LoginForm, SignupForm
from django import forms
from .models import UserProfile
from django.core.exceptions import ValidationError


class CaptchaLoginForm(LoginForm):
    captcha = CaptchaField()


class CaptchaSignUpForm(SignupForm):
    captcha = CaptchaField()


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ['lat', 'lon', 'available', 'got_loc', 'completed_profile', 'user']

        def clean_phone_number(self):
            phone_number = self.cleaned_data['phone_number']
            if not phone_number:
                return phone_number
            if len(phone_number) < 10:
                raise ValidationError("Phone number must be at least 10 digits")
            if not phone_number.isdigit():
                raise ValidationError("Phone number must contain only digits")
            return phone_number

        def clean_account_number(self):
            account_number = self.cleaned_data['account_number']
            if not account_number:
                return account_number
            if len(account_number) < 10:
                raise ValidationError("Account number must be at least 10 digits")
            if not account_number.isdigit():
                raise ValidationError("Account number must contain only digits")
            return account_number

        def clean_ifsc_code(self):
            ifsc_code = self.cleaned_data['ifsc_code']
            if not ifsc_code:
                return ifsc_code
            if len(ifsc_code) != 11:
                raise ValidationError("IFSC code must be 11 characters long")
            if not ifsc_code.isupper():
                raise ValidationError("IFSC code must be in uppercase")
            return ifsc_code

        def clean_zipcode(self):
            zipcode = self.cleaned_data['zipcode']
            if not zipcode:
                return zipcode
            if len(zipcode) < 6:
                raise ValidationError("Zipcode must be at least 6 digits")
            if not zipcode.isdigit():
                raise ValidationError("Zipcode must contain only digits")
            return zipcode

        def clean_home_address(self):
            home_address = self.cleaned_data['home_address']
            if not home_address:
                raise ValidationError("Home address is required")
            if len(home_address) < 10:
                raise ValidationError("Home address must be at least 10 characters long")
            return home_address

        def clean_district(self):
            district = self.cleaned_data['district']
            if not district:
                raise ValidationError("District is required")
            if len(district) < 3:
                raise ValidationError("District must be at least 3 characters long")
            return district

        def clean_state(self):
            state = self.cleaned_data['state']
            if not state:
                raise ValidationError("State is required")
            if len(state) < 3:
                raise ValidationError("State must be at least 3 characters long")
            return state

        def clean_country(self):
            country = self.cleaned_data['country']
            if not country:
                raise ValidationError("Country is required")
            if len(country) < 3:
                raise ValidationError("Country must be at least 3 characters long")
            return country

        def clean(self):
            cleaned_data = super().clean()
            return cleaned_data

