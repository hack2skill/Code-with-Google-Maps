from .models import Cuisine  
from django.contrib.auth import login, logout
from django.shortcuts import render, redirect
from rest_framework.permissions import AllowAny
from .models import Account
from .serializers import AccountSerializer, UserSerializer, BusinessAccountSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
# from .serializers import UserSerializer,BusinessAccountSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from Business.serializers import CuisineSerializer, ImageSerializer, ReviewSerializer
from .models import BusinessAccount, Cuisine, Image, Review


class UserAccountUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        if user.is_user:
            serializer = UserSerializer(user.user_profile, data=data, partial=True)
        else:
            return Response({'detail': 'User account required for this view.'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User account updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class BusinessAccountUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_business:
            serializer = BusinessAccountSerializer(user.business_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Business account required for this view.'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        data = request.data

        if user.is_business:
            # Extract and update cuisines, images, and reviews
            cuisine_data = data.pop('cuisines', [])
            image_data = data.pop('images', [])
            review_data = data.pop('reviews', [])

            business_profile = user.business_profile

            # Update cuisines
            cuisine_ids = [cuisine['id'] for cuisine in cuisine_data]
            business_profile.cuisines.set(cuisine_ids)

            # Update images
            for image_item in image_data:
                image, created = Image.objects.get_or_create(title=image_item['title'], defaults={'image': image_item['image']})
                business_profile.images.add(image)

            # Update reviews
            for review_item in review_data:
                review, created = Review.objects.get_or_create(rating=review_item['rating'], comment=review_item['comment'], user_account=user, business_account=business_profile)
                image_data = review_item.get('images', [])
                for image_item in image_data:
                    image, created = Image.objects.get_or_create(title=image_item['title'], defaults={'image': image_item['image']})
                    review.images.add(image)

            # Continue with the existing behavior for updating other fields
            serializer = BusinessAccountSerializer(business_profile, data=data, partial=True)
        else:
            return Response({'detail': 'Business account required for this view.'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserDetailsView(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class BusinessAccountDetailView(RetrieveAPIView):
    queryset = BusinessAccount.objects.all()
    serializer_class = BusinessAccountSerializer

class AccountLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = Account.objects.get(username=username)

        if user.check_password(password):
            login(request, user)  # Create a session for the user

            return Response({'user_id': user.id}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
class AccountLogoutView(APIView):
    def post(self, request):
        logout(request)  # Log the user out of their session
        return Response(status=status.HTTP_200_OK)


class SignupView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated users to access this view.

    def post(self, request):
        serializer = AccountSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)