from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from core.models import Food, Review, Order
from core.serializers import FoodSerializer, FoodDetailSerializer, ReviewDetailSerializer, ReviewSerializer

from rest_framework import status

# ----------------------------
# Admin
# ----------------------------


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getStatic(request):
    try:
        users = User.objects.all()
        user_count = len(users)

        foods = Food.objects.all()
        food_count = len(foods)

        orders = Order.objects.all()
        order_count = len(orders)

        total = 0
        for i in orders:
            total += i.totalPrice

        return Response({'user_count': user_count, 'food_count': food_count, 'order_count': order_count, 'total': total})
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getVenueByMonth(request):
    try:
        months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

        original_price = []
        total_price = []
        for i in months:
            original_price[i] = 0
            foods = Food.objects.filter(created_at__in=i)
            for j in foods:
                original_price[i] += j.originalPrice

        for i in months:
            total_price[i] = 0
            orders = Order.objects.filter(created_at__in=i)
            for j in orders:
                original_price[i] += j.totalPrice

        return Response({'origin_price': original_price, 'total_price': total_price})

    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrderStatus(request):
    try:
        orders = Order.objects.all()
        
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllReviews(request):
    reviews = Review.objects.all().order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(reviews, 5)

    try:
        reviews = paginator.page(page)
    except PageNotAnInteger:
        reviews = paginator.page(1)
    except EmptyPage:
        reviews = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ReviewSerializer(reviews, many=True)
    return Response({'reviews': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getReview(request, pk):
    try:
        review = Review.objects.get(_id=pk)

        serializer = ReviewDetailSerializer(review, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
