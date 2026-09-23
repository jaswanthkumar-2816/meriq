from fastapi import APIRouter
from typing import Dict, Any
from services.assessment_service import assessment_service
from models.assessment import AssessmentSubmission

router = APIRouter(prefix="/assessment", tags=["Assessment & Retest"])

@router.get("/{skill_id}", response_model=Dict[str, Any])
async def get_diagnostic(skill_id: str):
    """Retrieve 10-question adaptive diagnostic probe items."""
    questions = assessment_service.get_diagnostic_questions(skill_id)
    return {
        "skillId": skill_id,
        "skillName": skill_id.capitalize(),
        "totalQuestions": len(questions),
        "questions": questions
    }

@router.post("/{skill_id}/evaluate", response_model=Dict[str, Any])
async def evaluate_diagnostic(skill_id: str, submission: AssessmentSubmission):
    """Evaluate diagnostic answers and return granular concept mastery + identified gaps."""
    return assessment_service.evaluate_diagnostic(skill_id, submission.answers)

@router.get("/{skill_id}/retest/{concept_id}", response_model=Dict[str, Any])
async def get_retest(skill_id: str, concept_id: str):
    """Retrieve targeted post-learning verification questions."""
    questions = assessment_service.get_retest_questions(skill_id, concept_id)
    return {
        "skillId": skill_id,
        "conceptId": concept_id,
        "conceptName": "Inheritance & super() Methods",
        "totalQuestions": len(questions),
        "questions": questions
    }

@router.post("/{skill_id}/retest/{concept_id}/evaluate", response_model=Dict[str, Any])
async def evaluate_retest(skill_id: str, concept_id: str, submission: AssessmentSubmission):
    """Verify post-learning mastery gain and update global skill knowledge state."""
    return assessment_service.evaluate_retest(skill_id, concept_id, submission.answers)
