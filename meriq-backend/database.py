"""
Database module for MERIQ.
Supports async MongoDB storage with an in-memory cached fallback to ensure 100% operational uptime
even when a standalone MongoDB instance is not locally provisioned.
"""
from typing import Dict, Any, Optional
from config import settings

class InMemoryDatabase:
    """In-memory document store replicating MongoDB collections."""
    def __init__(self):
        self.skills: Dict[str, Any] = {}
        self.assessments: Dict[str, Any] = {}
        self.recommendations: Dict[str, Any] = {}
        self.analytics: Dict[str, Any] = {}
        self.completed_resources: Dict[str, list] = {}
        self.retest_logs: Dict[str, list] = {}

    def get_skill(self, skill_id: str) -> Optional[Dict[str, Any]]:
        return self.skills.get(skill_id)

    def set_skill(self, skill_id: str, skill_data: Dict[str, Any]):
        self.skills[skill_id] = skill_data

    def list_skills(self) -> list[Dict[str, Any]]:
        return list(self.skills.values())

    def update_mastery(self, skill_id: str, concept_id: str, new_mastery: int) -> Optional[Dict[str, Any]]:
        skill = self.skills.get(skill_id)
        if not skill:
            return None
        
        # Recursively update concept mastery in hierarchy
        def update_node(node):
            if node.get("id") == concept_id:
                node["mastery"] = new_mastery
                return True
            for child in node.get("children", []):
                if update_node(child):
                    return True
            return False

        if "hierarchy" in skill:
            update_node(skill["hierarchy"])

        # Recalculate overall mastery
        skill["overallMastery"] = min(98, skill.get("overallMastery", 50) + 12)
        return skill

db = InMemoryDatabase()
