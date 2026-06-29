import os
from pymongo import MongoClient

# Get from environment variable (Render)
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["sunflower_shop"]