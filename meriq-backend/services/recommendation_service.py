from typing import List, Dict, Any
from seed_data import PYTHON_RECOMMENDATIONS
from database import db

class RecommendationService:
    def get_recommendations_for_skill(self, skill_id: str) -> Dict[str, Any]:
        weak_concepts = [
            {
                "id": "py-inheritance",
                "name": "Inheritance & Subclasses",
                "currentMastery": 21,
                "targetMastery": 70,
                "estimatedTime": "22 min",
                "reason": "Missing parent-child class polymorphism and constructor chaining models."
            },
            {
                "id": "py-mro",
                "name": "Method Resolution Order (MRO)",
                "currentMastery": 30,
                "targetMastery": 75,
                "estimatedTime": "18 min",
                "reason": "Uncertainty in multiple inheritance hierarchy lookup rules."
            },
            {
                "id": "py-dunder",
                "name": "Dunder Methods & Metaclasses",
                "currentMastery": 38,
                "targetMastery": 80,
                "estimatedTime": "25 min",
                "reason": "Missing operational fluency with __init__, __str__, and __repr__."
            }
        ]

        return {
            "skillId": skill_id,
            "skillName": "Python",
            "weakConcepts": weak_concepts,
            "recommendations": PYTHON_RECOMMENDATIONS
        }

    def mark_resource_completed(self, skill_id: str, resource_id: str) -> Dict[str, Any]:
        if skill_id not in db.completed_resources:
            db.completed_resources[skill_id] = []
        
        if resource_id not in db.completed_resources[skill_id]:
            db.completed_resources[skill_id].append(resource_id)

        return {
            "skillId": skill_id,
            "resourceId": resource_id,
            "completed": True,
            "completedCount": len(db.completed_resources[skill_id])
        }

recommendation_service = RecommendationService()
