from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.mongodb import db

import requests
from bson import ObjectId


cart_collection = db["cart"]

PRODUCTS_API = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"


# ADD TO CART
@api_view(["POST"])
def add_to_cart(request):

    data = request.data

    email = data.get("email")
    product_id = data.get("product_id")

    cart_collection.insert_one({
        "email": email,
        "product_id": product_id
    })

    return Response({
        "message": "Added to cart"
    })


# GET CART
@api_view(["GET"])
def get_cart(request):

    email = request.GET.get("email")

    response = requests.get(PRODUCTS_API)

    products = response.json()

    cart_items = list(
        cart_collection.find({
            "email": email
        })
    )

    result = []

    for item in cart_items:

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


# REMOVE CART ITEM
@api_view(["DELETE"])
def remove_from_cart(request, id):

    cart_collection.delete_one({
        "_id": ObjectId(id)
    })

    return Response({
        "message": "Removed from cart"
    })