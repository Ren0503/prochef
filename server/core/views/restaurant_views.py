from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from core.models import Restaurant
from core.serializers import RestaurantSerializer, RestaurantDetailSerializer

from rest_framework import status

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getRestaurants(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    restaurants = Restaurant.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(restaurants, 5)

    try:
        restaurants = paginator.page(page)
    except PageNotAnInteger:
        restaurants = paginator.page(1)
    except EmptyPage:
        restaurants = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = RestaurantSerializer(restaurants, many=True)
    return Response({'restaurants': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getRestaurant(request, pk):
    try:
        restaurant = Restaurant.objects.get(_id=pk)

        serializer = RestaurantDetailSerializer(restaurant, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


# ----------------------------
# Admin
# ----------------------------


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createRestaurant(request):
    try:
        user = request.user

        restaurant = Restaurant.objects.create(
            user=user,
            name='Sample Name',
            address='Sample Address',
            openedAt='0h',
            closedAt='23h',
        )

        serializer = RestaurantSerializer(restaurant, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateRestaurant(request, pk):
    try:
        data = request.data
        restaurant = Restaurant.objects.get(_id=pk)

        restaurant.name = data['name']
        restaurant.address = data['address']
        restaurant.openedAt = data['opendAt']
        restaurant.closedAt = data['closedAt']

        restaurant.save()

        serializer = RestaurantSerializer(restaurant, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteRestaurant(request, pk):
    try:
        restaurant = Restaurant.objects.get(_id=pk)
        restaurant.delete()
        return Response('Restaurant Deleted')
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    restaurant_id = data['restaurant_id']
    restaurant = Restaurant.objects.get(_id=restaurant_id)

    restaurant.image = request.FILES.get('image')
    restaurant.save()

    return Response('Image was uploaded')
