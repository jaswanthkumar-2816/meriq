from typing import List, Optional, Any
from pydantic import BaseModel, Field

class ConceptNode(BaseModel):
    id: str
    name: str
    difficulty: Optional[str] = "Intermediate"
    mastery: int = Field(default=50, ge=0, le=100)
    description: Optional[str] = ""
    children: Optional[List["ConceptNode"]] = []

ConceptNode.model_rebuild()

class SkillBase(BaseModel):
    id: str
    name: str
    category: str
    description: str
    icon: str = "Terminal"
    overallMastery: int = Field(default=50, ge=0, le=100)
    totalConcepts: int = 14
    masteredConcepts: int = 8
    lastDiagnosed: str = "Not tested"
    hierarchy: Optional[ConceptNode] = None

class SkillCreateRequest(BaseModel):
    name: str
    category: str = "Programming"

class SkillResponse(SkillBase):
    pass
