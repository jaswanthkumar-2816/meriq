from typing import List, Dict, Any
from pydantic import BaseModel

class TimelinePoint(BaseModel):
    date: str
    mastery: int
    event: str

class DomainBenchmark(BaseModel):
    subject: str
    mastery: int
    benchmark: int

class ProgressAnalyticsResponse(BaseModel):
    skillId: str
    overallMastery: int
    totalConcepts: int
    masteredConcepts: int
    learningTimeFormatted: str
    knowledgeGainPercent: str
    masteryTimeline: List[TimelinePoint]
    conceptMasteryData: List[DomainBenchmark]
    activeSkill: Dict[str, Any]
