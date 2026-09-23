from typing import List, Dict, Optional, Any
from pydantic import BaseModel

class AssessmentQuestion(BaseModel):
    id: str
    conceptId: str
    conceptName: str
    difficulty: str
    question: str
    options: List[str]
    correctOption: int
    explanation: Optional[str] = ""

class DiagnosticResponse(BaseModel):
    skillId: str
    skillName: str
    totalQuestions: int
    questions: List[AssessmentQuestion]

class AssessmentSubmission(BaseModel):
    answers: Dict[str, int]  # questionId -> selectedOptionIndex

class WeakConceptGap(BaseModel):
    id: str
    name: str
    currentMastery: int
    targetMastery: int
    estimatedTime: str
    reason: str

class DiagnosticEvaluationResult(BaseModel):
    skillId: str
    overallMastery: int
    previousMastery: int
    diagnosedAt: str
    totalAnswered: int
    correctCount: int
    weakConcepts: List[WeakConceptGap]
    conceptMasteryBreakdown: Dict[str, int]

class RetestEvaluationResult(BaseModel):
    skillId: str
    conceptId: str
    conceptName: str
    beforeScore: int
    afterScore: int
    delta: int
    verifiedAt: str
    status: str
