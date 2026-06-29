from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.mongodb import db

orders_collection = db["orders"]

@api_view(["POST"])
def place_order(request):
    data = request.data

    if not data.get("email"):
        return Response({"error": "email required"}, status=400)

    result = orders_collection.insert_one(data)
    data["_id"] = str(result.inserted_id)

    return Response(data)
@api_view(["GET"])
def get_orders(request, email):
    orders = list(orders_collection.find({"email": email}))

    for o in orders:
        o["_id"] = str(o["_id"])

    return Response(orders)