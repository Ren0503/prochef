from django.urls import path
from core.views import restaurant_views as views

urlpatterns = [

    path('', views.getRestaurants, name="restaurants"),

    path('create/', views.createRestaurant, name="restaurant-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/', views.getRestaurant, name="restaurant"),
    path('update/<str:pk>/', views.updateRestaurant, name="restaurant-update"),
    path('delete/<str:pk>/', views.deleteRestaurant, name="restaurant-delete"),
]
