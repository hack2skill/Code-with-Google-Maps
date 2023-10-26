from django.urls import path
from .views import FindBusinessAccounts  ,CuisineListCreateView ,ReviewsByBusinessId,create_review

urlpatterns = [
    path('find_business_accounts/', FindBusinessAccounts.as_view(), name='find-business-accounts'),
    
     path('review/', create_review, name='create-reviewpara'),
    path('cuisines/', CuisineListCreateView.as_view(), name='cuisine-list-create'),
    path('<int:business_id>/reviews/', ReviewsByBusinessId.as_view(), name='business-reviews'),
    
]
