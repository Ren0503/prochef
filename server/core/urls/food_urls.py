from django.urls import path
from core.views import food_views as views

urlpatterns = [

    path('', views.getFoods, name="foods"),

    path('create/', views.createFood, name="food-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:pk>/reviews/', views.createFoodReview, name="create-review"),
    path('top/', views.getTopFoods, name='top-foods'),
    path('<str:pk>/', views.getFood, name="food"),

    path('update/<str:pk>/', views.updateFood, name="food-update"),
    path('delete/<str:pk>/', views.deleteFood, name="food-delete"),
]
