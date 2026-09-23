from fastapi import APIRouter
from typing import Dict, Any
from services.recommendation_service import recommendation_service

router = APIRouter(prefix="/recommendations", tags=["Explainable Recommendations"])

@router.get("/{skill_id}", response_model=Dict[str, Any])
async def get_recommendations(skill_id: str):
    """Retrieve explainable, targeted learning resources strictly matching diagnosed gaps."""
    return recommendation_service.get_recommendations_for_skill(skill_id)

@router.post("/{skill_id}/complete/{resource_id}", response_model=Dict[str, Any])
async def complete_resource(skill_id: str, resource_id: str):
    """Mark a micro-learning resource as learned."""
    return recommendation_service.mark_resource_completed(skill_id, resource_id)
