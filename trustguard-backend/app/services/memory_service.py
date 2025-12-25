import re
from app.services.database import db

class MemoryService:
    @staticmethod
    def normalize_text(text: str) -> str:
        """Normalize text by lowercasing and stripping special characters."""
        if not text:
            return ""
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        return text

    async def get_pattern_boost(self, text: str):
        """
        Queries MongoDB for known scam patterns.
        Returns a list of matched patterns and a risk boost score.
        """
        if not text:
            return [], 0

        normalized_text = self.normalize_text(text)
        matches = []
        total_boost = 0

        # Severity to boost mapping
        SEVERITY_BOOST = {
            "low": 10,
            "medium": 20,
            "high": 30,
            "critical": 50
        }

        try:
            # Query all patterns (for demo/hackathon scale this is fine)
            # In production, we'd use a text index or more optimized regex search
            cursor = db.scam_patterns.find({})
            async for pattern in cursor:
                pattern_val = pattern.get("pattern_value", "").lower()
                if pattern_val in normalized_text:
                    matches.append({
                        "pattern": pattern_val,
                        "description": pattern.get("description", "Known scam pattern"),
                        "severity": pattern.get("severity", "high")
                    })
                    total_boost += SEVERITY_BOOST.get(pattern.get("severity"), 30)
        except Exception as e:
            print(f"Error in pattern pre-check: {e}")

        return matches, total_boost

    async def save_feedback(self, feedback_data: dict):
        """Saves user feedback to MongoDB."""
        try:
            from datetime import datetime
            feedback_data["timestamp"] = datetime.utcnow()
            result = await db.user_feedback.insert_one(feedback_data)
            return bool(result.inserted_id)
        except Exception as e:
            print(f"Error saving feedback: {e}")
            return False

memory_service = MemoryService()
