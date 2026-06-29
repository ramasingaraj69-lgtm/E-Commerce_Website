from rest_framework_simplejwt.tokens import AccessToken

def get_user_from_token(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None

    try:
        token = auth_header.split(" ")[1]
        decoded = AccessToken(token)

        return {
            "user_id": decoded["user_id"],
            "email": decoded["email"],
            "name": decoded["name"]
        }

    except Exception:
        return None