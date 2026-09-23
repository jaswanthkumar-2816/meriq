from typing import List, Optional
from pydantic import BaseModel
from models.assessment import WeakConceptGap

class LearningResource(BaseModel):
    id: str
    title: str
    source: str
    duration: str
    difficulty: str
    badge: Optional[str] = None
    embedId: Optional[str] = None
    matchScore: int
    whyRecommended: str
    learningObjective: str
    coveredConcepts: List[str]

class RecommendationResponse(BaseModel):
    skillId: str
    skillName: str
    weakConcepts: List[WeakConceptGap]
    recommendations: List[LearningResource]
