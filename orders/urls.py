from django.urls import path
from .views import place_order, get_orders

urlpatterns = [
    path("place/", place_order),
    path("<email>/", get_orders),
]