from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests


PRODUCTS_API = "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"


# GET ALL PRODUCTS
@api_view(["GET"])
def get_products(request):

    response = requests.get(PRODUCTS_API)

    data = response.json()

    return Response(data)


# GET SINGLE PRODUCT
@api_view(["GET"])
def get_product(request, id):

    response = requests.get(PRODUCTS_API)

    products = response.json()

    product = next(
        (
            item for item in products
            if item["id"] == id
        ),
        None
    )

    if not product:

        return Response({
            "error": "Product not found"
        }, status=404)

    return Response(product)