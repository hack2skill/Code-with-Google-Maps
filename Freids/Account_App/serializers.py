from rest_framework import serializers
from .models import User, BusinessAccount, Account
from Business.serializers import ReviewSerializer , CuisineSerializer ,ImageSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'



class BusinessAccountSerializer(serializers.ModelSerializer):
    cuisines = CuisineSerializer(many=True)
    images = ImageSerializer(many=True)
    menu= ImageSerializer(many=True)

    avg_rating = serializers.SerializerMethodField()

    class Meta:
        model = BusinessAccount
        fields = '__all__'
    def get_avg_rating(self, obj):
    
        reviews = obj.reviews.all()
        if reviews:
            total_rating = sum(review.rating for review in reviews)
            return total_rating / len(reviews)
        return 0.0  




class AccountSerializer(serializers.ModelSerializer):
    user_profile = UserSerializer(required=False)
    business_profile = BusinessAccountSerializer(required=False)

    class Meta:
        model = Account
        exclude = ('password', 'last_login', 'groups', 'user_permissions')
