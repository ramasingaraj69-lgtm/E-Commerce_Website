from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.mongodb import db

from bson import ObjectId

import requests


wishlist_collection = db["wishlist"]

PRODUCTS_API = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"


# ADD TO WISHLIST
@api_view(["POST"])
def add_to_wishlist(request):

    data = request.data

    email = data.get("email")
    product_id = data.get("product_id")

    wishlist_collection.insert_one({
        "email": email,
        "product_id": product_id
    })

    return Response({
        "message": "Added to wishlist"
    })


# GET WISHLIST
@api_view(["GET"])
def get_wishlist(request):

    email = request.GET.get("email")

    response = requests.get(PRODUCTS_API)

    products = response.json()

    wishlist_items = list(
        wishlist_collection.find({
            "email": email
        })
    )

    result = []

    for item in wishlist_items:

        product = next(
            (
                p for p in products
                if p["id"] == item["product_id"]
            ),
            None
        )

        result.append({
            "_id": str(item["_id"]),
            "product": product
        })

    return Response(result)


# REMOVE WISHLIST
@api_view(["DELETE"])
def remove_from_wishlist(request, id):

    wishlist_collection.delete_one({
        "_id": ObjectId(id)
    })

    return Response({
        "message": "Removed from wishlist"
    })