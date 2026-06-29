from django.urls import path

from .views import (
    add_to_cart,
    get_cart,
    remove_from_cart,
)

urlpatterns = [

    path(
        "add/",
        add_to_cart
    ),

    path(
        "",
        get_cart
    ),

    path(
        "remove/<str:id>/",
        remove_from_cart
    ),
]