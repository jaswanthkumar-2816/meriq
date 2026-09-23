from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from services.skill_service import skill_service
from models.skill import SkillCreateRequest

router = APIRouter(prefix="/skills", tags=["Skills & Knowledge Graph"])

@router.get("", response_model=List[Dict[str, Any]])
async def list_skills():
    """Retrieve catalog of all mapped skills and domain masteries."""
    return skill_service.get_all_skills()

@router.get("/{skill_id}", response_model=Dict[str, Any])
async def get_skill(skill_id: str):
    """Retrieve hierarchical concept tree for a specific skill."""
    skill = skill_service.get_skill(skill_id)
    if not skill:
        raise HTTPException(status_code=404, detail=f"Skill '{skill_id}' not found")
    return skill

@router.post("/generate", response_model=Dict[str, Any])
async def generate_skill(request: SkillCreateRequest):
    """Dynamically synthesize a new hierarchical skill tree via Groq AI."""
    new_skill = await skill_service.generate_custom_skill(request.name, request.category)
    return new_skill
