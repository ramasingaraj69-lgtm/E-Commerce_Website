from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.mongodb import db

import bcrypt

users_collection = db["users"]


# REGISTER
@api_view(["POST"])
def register_user(request):

    data = request.data

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # CHECK USER EXISTS
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:

        return Response({
            "error": "User already exists"
        }, status=400)

    # HASH PASSWORD
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    # SAVE USER
    users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return Response({
        "message": "Registration successful"
    })


# LOGIN
@api_view(["POST"])
def login_user(request):

    data = request.data

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({
        "email": email
    })

    # USER NOT FOUND
    if not user:

        return Response({
            "error": "Invalid email"
        }, status=400)

    # PASSWORD CHECK
    password_match = bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"]
    )

    if not password_match:

        return Response({
            "error": "Invalid password"
        }, status=400)

    return Response({
        "message": "Login successful",

        "user": {
            "name": user.get("name"),
            "email": user.get("email")
        }
    })