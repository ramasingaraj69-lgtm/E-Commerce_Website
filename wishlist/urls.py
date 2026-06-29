from django.urls import path

from .views import (
    add_to_wishlist,
    get_wishlist,
    remove_from_wishlist,
)

urlpatterns = [

    path(
        "add/",
        add_to_wishlist
    ),

    path(
        "",
        get_wishlist
    ),

    path(
        "remove/<str:id>/",
        remove_from_wishlist
    ),
]