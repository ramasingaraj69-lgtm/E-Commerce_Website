
from django.urls import path
from .views import get_products, get_product

urlpatterns = [
    path("", get_products),
    path("<str:product_id>/", get_product),
]