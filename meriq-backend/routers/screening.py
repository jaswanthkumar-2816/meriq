import os
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Dict, Any, Optional
from services.screening_service import screening_service, JOB_PROFILES, extract_text_from_pdf_bytes
from database import db

router = APIRouter(prefix="/screening", tags=["Review 2: AI Resume Screening & Semantic Match"])

DATASET_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "resumes_dataset")
PDF_DIR = os.path.join(DATASET_DIR, "pdf")

@router.get("/jobs", response_model=Dict[str, Any])
async def list_job_roles():
    """Retrieve available benchmark job profiles for screening comparison."""
    return {"jobs": JOB_PROFILES}

@router.post("/upload", response_model=Dict[str, Any])
async def upload_and_screen_resume(
    file: UploadFile = File(...),
    role_id: str = Form("python-backend")
):
    """
    Review 2 Deliverable: Upload any candidate PDF resume, extract text,
    calculate semantic score, extract skills, and prescribe adaptive learning paths.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF resume documents are supported.")
        
    pdf_bytes = await file.read()
    resume_text = extract_text_from_pdf_bytes(pdf_bytes)
    
    if not resume_text.strip():
        raise HTTPException(status_code=422, detail="Could not extract readable text from the uploaded PDF document.")
        
    result = screening_service.screen_resume(resume_text, role_id)
    result["filename"] = file.filename
    return result

@router.post("/analyze-candidate/{candidate_id}", response_model=Dict[str, Any])
async def screen_candidate_by_id(
    candidate_id: str,
    role_id: str = "python-backend"
):
    """Screen an existing candidate from the 1,000-resume dataset against a target job role."""
    cid = candidate_id.upper()
    # Find candidate PDF
    matched_file = None
    if os.path.exists(PDF_DIR):
        for f in os.listdir(PDF_DIR):
            if f.startswith(f"{cid}_"):
                matched_file = os.path.join(PDF_DIR, f)
                break
                
    if not matched_file or not os.path.exists(matched_file):
        raise HTTPException(status_code=404, detail=f"Candidate PDF '{candidate_id}' not found.")
        
    with open(matched_file, "rb") as f:
        pdf_bytes = f.read()
        
    resume_text = extract_text_from_pdf_bytes(pdf_bytes)
    result = screening_service.screen_resume(resume_text, role_id)
    result["candidateId"] = candidate_id
    return result
