from rest_framework import serializers
from Account_App.models import Image,Cuisine,Review

class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__' 

class ReviewSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    # user_username = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = '__all__'

    

        