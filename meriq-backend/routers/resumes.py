import os
import json
import zipfile
import io
from fastapi import APIRouter, HTTPException, Query, UploadFile, File, Form
from fastapi.responses import FileResponse, StreamingResponse
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/resumes", tags=["1,000 Resumes Dataset & PDF Engine"])

DATASET_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "resumes_dataset")
JSON_PATH = os.path.join(DATASET_DIR, "resumes_index.json")
PDF_DIR = os.path.join(DATASET_DIR, "pdf")

def load_resumes_cache():
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

_resumes_cache = None

def get_resumes():
    global _resumes_cache
    # Reload from disk if not loaded or if dataset grew
    if _resumes_cache is None or len(_resumes_cache) < 1000:
        _resumes_cache = load_resumes_cache()
    return _resumes_cache

@router.get("", response_model=Dict[str, Any])
async def list_resumes(
    search: Optional[str] = None,
    category: Optional[str] = None,
    min_score: Optional[int] = Query(None, ge=0, le=100),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Search, filter, and paginate through the 1,000 candidate resume dataset.
    """
    resumes = get_resumes()
    filtered = resumes

    if category and category != "All":
        filtered = [r for r in filtered if r.get("category", "").lower() == category.lower()]

    if search:
        s = search.lower()
        filtered = [
            r for r in filtered
            if s in r.get("name", "").lower()
            or s in r.get("role", "").lower()
            or s in r.get("candidateId", "").lower()
            or any(s in skill.lower() for skill in r.get("skills", []))
        ]

    if min_score is not None:
        filtered = [r for r in filtered if r.get("meriqScore", 0) >= min_score]

    total = len(filtered)
    start = (page - 1) * limit
    end = start + limit
    items = filtered[start:end]

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "totalPages": (total + limit - 1) // limit if total > 0 else 1,
        "items": items
    }

@router.get("/{candidate_id}", response_model=Dict[str, Any])
async def get_candidate(candidate_id: str):
    """Retrieve detailed resume profile for a specific candidate ID."""
    resumes = get_resumes()
    cid = candidate_id.upper()
    found = next((r for r in resumes if r.get("candidateId") == cid), None)
    if not found:
        raise HTTPException(status_code=404, detail=f"Candidate '{candidate_id}' not found in dataset")
    return found

@router.get("/{candidate_id}/pdf")
async def download_candidate_pdf(candidate_id: str):
    """Serve and download the candidate's PDF resume."""
    candidate = await get_candidate(candidate_id)
    pdf_filename = f"{candidate['candidateId']}_{candidate['name'].replace(' ', '_')}.pdf"
    pdf_path = os.path.join(PDF_DIR, pdf_filename)
    
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF resume file not found on server")

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=pdf_filename
    )

@router.get("/download/all-zip")
async def download_all_resumes_zip():
    """Download all 1,000 PDF resumes and CSV/JSON index packaged in a single zip archive."""
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        # Add all PDFs
        for root, _, files in os.walk(PDF_DIR):
            for file in files:
                if file.endswith(".pdf"):
                    file_path = os.path.join(root, file)
                    zip_file.write(file_path, arcname=os.path.join("pdf", file))
        
        # Add index files
        csv_path = os.path.join(DATASET_DIR, "resumes_index.csv")
        if os.path.exists(csv_path):
            zip_file.write(csv_path, arcname="resumes_index.csv")
        
        if os.path.exists(JSON_PATH):
            zip_file.write(JSON_PATH, arcname="resumes_index.json")

    zip_buffer.seek(0)
    return StreamingResponse(
        zip_buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=MERIQ_1000_Resumes_Dataset.zip"}
    )

@router.post("/screen", response_model=Dict[str, Any])
async def screen_resumes_endpoint(
    resumes: List[UploadFile] = File(...),
    jd_text: Optional[str] = Form(None),
    jd_file: Optional[UploadFile] = File(None),
    threshold: Optional[int] = Form(70)
):
    """
    Screen multiple resumes (PDF, DOCX, DOC, TXT) against a Job Description.
    Extracts skills, experience, projects, education, calculates match score,
    ranks candidates, and generates Why Selected explanations.
    """
    from services.screening_service import screening_service

    if not resumes:
        raise HTTPException(status_code=400, detail="At least one resume file must be provided.")
    
    # Read resume file bytes
    resume_items = []
    for r in resumes:
        content = await r.read()
        resume_items.append((r.filename or "resume.pdf", content))

    jd_bytes = None
    jd_filename = None
    if jd_file is not None and jd_file.filename:
        jd_bytes = await jd_file.read()
        jd_filename = jd_file.filename

    if not (jd_text and jd_text.strip()) and not jd_bytes:
        raise HTTPException(status_code=400, detail="Job description text or file must be provided.")

    result = screening_service.screen_resumes(
        resume_items=resume_items,
        jd_text=jd_text,
        jd_file_bytes=jd_bytes,
        jd_filename=jd_filename,
        threshold=threshold or 70
    )
    return result

