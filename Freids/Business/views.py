from django.db.models import Q
from django.http import JsonResponse
from rest_framework.views import APIView
from Account_App.models import BusinessAccount
from .get_distance import get_distances  # Import the get_distances function from your module
from rest_framework import permissions
from Account_App.models import Review
from .serializers import ReviewSerializer
from rest_framework import generics
from django.db.models import Avg
from django.db.models import F, ExpressionWrapper, fields
from django.db.models.functions import Sqrt
from django.db.models import Value, CharField
from Account_App.models import Cuisine
from rest_framework.response import Response
from .serializers import CuisineSerializer

class CuisineListCreateView(generics.ListCreateAPIView):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer

class ReviewsByBusinessId(APIView):
    def get(self, request, business_id):
        try:
            reviews = Review.objects.filter(business_account=business_id)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        except Review.DoesNotExist:
            return Response(
                {"error": "Reviews not found for this business ID"},
                status=status.HTTP_404_NOT_FOUND
            )

class FindBusinessAccounts(APIView):
    def get(self, request):
        try:
             # Get parameters from the request
            latitude = float(request.GET.get('latitude'))
            longitude = float(request.GET.get('longitude'))
            max_range = float(request.GET.get('max_range'))
            cuisine_names = request.GET.getlist('cuisine_name')

            # Use the get_distances function to get distances to all business accounts
            source = F('latitude') + F('longitude')  # A placeholder to use in the annotate expression
            destination = ExpressionWrapper(
                Sqrt(
                    (F('latitude') - latitude) * (F('latitude') - latitude) +
                    (F('longitude') - longitude) * (F('longitude') - longitude)
                ) * 111.32,  # Convert to kilometers (approximate)
                output_field=fields.FloatField()
            )
            businesses = BusinessAccount.objects.all().annotate(distance=destination)

            # Filter business accounts within the specified range
            if max_range:
                businesses = businesses.filter(distance__lte=max_range)

            # Filter business accounts by cuisine names
            if cuisine_names:
                businesses = businesses.filter(cuisines__name__in=cuisine_names)

            # Calculate average ratings
            businesses = businesses.annotate(avg_rating=Avg('reviews__rating'))

            # Sort results based on average rating and distance
            businesses = businesses.order_by('-avg_rating', 'distance')

            # Serialize the results
            data = [{
                'business_name': business.business_name,
                'street_name': business.street_name,
                'locality': business.locality,
                'avg_rating': business.avg_rating,
                'distance': business.distance,
                'id':business.id,
                'image':(business.primage and business.primage.url) or None
                # Include other fields you want to return
            } for business in businesses]

            return JsonResponse({'business_accounts': data})
            
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)


# class ReviewCreateView(generics.CreateAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         business_account_id = self.request.data.get('business_account_id')
#         try:
#             business_account = BusinessAccount.objects.get(id=business_account_id)
#             serializer.save(user_account=self.request.user, business_account=business_account)
#         except BusinessAccount.DoesNotExist:
#             return Response({'detail': 'Business account does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

from django import forms
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['rating', 'comment']

from django.http import JsonResponse
from django.views.generic.edit import FormView
# from .forms import ReviewForm
# from .models import Review
def create_review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()  # Save the form data to create a new review
            data = {'success': True, 'message': 'Review created successfully'}
            return JsonResponse(data)
        else:
            errors = form.errors.as_json()
            return JsonResponse({'success': False, 'errors': errors}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Only POST requests are allowed.'}, status=405)
