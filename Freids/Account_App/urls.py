from django.urls import path
from .views import (
    AccountLoginView,
    AccountLogoutView,
    UserAccountUpdateView,
    BusinessAccountUpdateView,
    UserDetailsView,  
  SignupView,  
  BusinessAccountDetailView
)

urlpatterns = [
    path('update/user/', UserAccountUpdateView.as_view(), name='user-account-update'),
    path('update/business/', BusinessAccountUpdateView.as_view(), name='business-account-update'),
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('logout/', AccountLogoutView.as_view(), name='account-logout'),
    path('user/details/', UserDetailsView.as_view(), name='user-details'),
    path('signup/', SignupView.as_view(), name='signup'),  # Add the path for signup
    path('business/<int:pk>/', BusinessAccountDetailView.as_view(), name='business-account-detail'),
]