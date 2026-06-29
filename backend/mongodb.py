from pymongo import MongoClient
MONGO_URI="mongodb+srv://ramaramas2004_db_user:55qLwgI0T5vTQloX@smartagriculturecluster.ib4npqu.mongodb.net/?appName=SmartAgricultureCluster"
client = MongoClient(MONGO_URI)
db = client["sunflower_shop"]
