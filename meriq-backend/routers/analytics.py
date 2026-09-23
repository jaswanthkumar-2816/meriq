from fastapi import APIRouter
from typing import Dict, Any
from services.analytics_service import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics & Longitudinal Progress"])

@router.get("/{skill_id}", response_model=Dict[str, Any])
async def get_analytics(skill_id: str):
    """Retrieve longitudinal mastery timeline, domain breakdown vs benchmark, and time saved."""
    return analytics_service.get_progress_analytics(skill_id)
