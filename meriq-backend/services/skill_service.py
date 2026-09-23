from typing import List, Optional, Dict, Any
from database import db
from seed_data import INITIAL_SKILLS
from services.groq_service import groq_service

class SkillService:
    def __init__(self):
        # Initialize database with pre-seeded data if empty
        if not db.list_skills():
            for s in INITIAL_SKILLS:
                db.set_skill(s["id"], s)

    def get_all_skills(self) -> List[Dict[str, Any]]:
        return db.list_skills()

    def get_skill(self, skill_id: str) -> Optional[Dict[str, Any]]:
        return db.get_skill(skill_id)

    async def generate_custom_skill(self, name: str, category: str = "Programming") -> Dict[str, Any]:
        slug = name.lower().replace(" ", "-")
        
        # Check cache
        existing = db.get_skill(slug)
        if existing:
            return existing

        # Generate hierarchy via Groq
        hierarchy = await groq_service.generate_skill_hierarchy(name, category)
        
        new_skill = {
            "id": slug,
            "name": name,
            "category": category,
            "description": f"AI-generated adaptive curriculum and concept hierarchy for {name}.",
            "icon": "Cpu",
            "overallMastery": 50,
            "totalConcepts": 12,
            "masteredConcepts": 4,
            "lastDiagnosed": "Just now",
            "hierarchy": hierarchy
        }
        
        # Store in database
        db.set_skill(slug, new_skill)
        return new_skill

skill_service = SkillService()
