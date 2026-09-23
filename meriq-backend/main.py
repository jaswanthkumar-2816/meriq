from typing import List, Optional, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import skills, assessment, recommendations, analytics, resumes

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Adaptive skill learning, diagnostic intelligence, and 500 candidate resume PDF dataset API."
)

# Enable CORS for frontend Vite application
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(skills.router, prefix=settings.API_V1_STR)
app.include_router(assessment.router, prefix=settings.API_V1_STR)
app.include_router(recommendations.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(resumes.router, prefix=settings.API_V1_STR)

# Singular alias for POST /api/resume/screen
@app.post("/api/resume/screen", response_model=Dict[str, Any], tags=["Resume Screening & JD Match"])
async def screen_resume_singular_alias(
    resumes_files: List[UploadFile] = File(..., alias="resumes"),
    jd_text: Optional[str] = Form(None),
    jd_file: Optional[UploadFile] = File(None),
    threshold: Optional[int] = Form(70)
):
    return await resumes.screen_resumes_endpoint(
        resumes=resumes_files,
        jd_text=jd_text,
        jd_file=jd_file,
        threshold=threshold
    )



@app.get("/health", tags=["Health"])
async def health_check():
    """System health check endpoint."""
    return {
        "status": "healthy",
        "service": "MERIQ FastAPI Backend",
        "version": settings.VERSION,
        "engine": "Adaptive Skill Intelligence & 500 Resume Dataset"
    }

@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "Welcome to MERIQ API — Intelligent Adaptive Skill Learning Platform",
        "docs": "/docs",
        "health": "/health",
        "resumes_dataset": "/api/resumes"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
