import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

class Database:
    client: AsyncIOMotorClient = None
    db = None
    scam_patterns = None
    user_feedback = None

    @classmethod
    async def connect_db(cls):
        mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        try:
            cls.client = AsyncIOMotorClient(mongodb_uri)
            cls.db = cls.client.trust_guard_db
            cls.scam_patterns = cls.db.scam_patterns
            cls.user_feedback = cls.db.user_feedback
            print(f"Connected to MongoDB at {mongodb_uri.split('@')[-1]}") # Log without credentials
        except Exception as e:
            print(f"Could not connect to MongoDB: {e}")

    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed")

db = Database()
