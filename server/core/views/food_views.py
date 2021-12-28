from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from core.models import Food, Restaurant, Review
from core.serializers import FoodSerializer, FoodDetailSerializer, ReviewSerializer

from rest_framework import status

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getFoods(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    foods = Food.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(foods, 5)

    try:
        foods = paginator.page(page)
    except PageNotAnInteger:
        foods = paginator.page(1)
    except EmptyPage:
        foods = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = FoodSerializer(foods, many=True)
    return Response({'foods': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopFoods(request):
    foods = Food.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getFood(request, pk):
    try:
        food = Food.objects.get(_id=pk)
        food.views += 1
        food.save()

        serializer = FoodDetailSerializer(food, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


# ----------------------------
# User
# ----------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createFoodReview(request, pk):
    user = request.user
    food = Food.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = food.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Food already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            food=food,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = food.review_set.all()
        food.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        food.rating = total / len(reviews)
        food.save()

        return Response('Review Added')

# ----------------------------
# Admin
# ----------------------------


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createFood(request):
    try:
        user = request.user

        food = Food.objects.create(
            user=user,
            name='Sample Name',
            price=0,
            countInStock=0,
            category='Sample Category',
            description=''
        )

        serializer = FoodSerializer(food, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateFood(request, pk):
    try:
        data = request.data
        food = Food.objects.get(_id=pk)
        restaurant_id = data['restaurant_id']
        restaurant = Restaurant.objects.get(_id=restaurant_id)

        food.name = data['name']
        food.price = data['price']
        food.originalPrice = data['originalPrice']
        food.countInStock = data['countInStock']
        food.category = data['category']
        food.description = data['description']
        food.salesPrice = data['salesPrice']
        food.restaurant = restaurant

        food.save()

        serializer = FoodSerializer(food, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteFood(request, pk):
    try:
        food = Food.objects.get(_id=pk)
        food.delete()
        return Response('Food Deleted')
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    food_id = data['food_id']
    food = Food.objects.get(_id=food_id)

    food.image = request.FILES.get('image')
    food.save()

    return Response('Image was uploaded')
