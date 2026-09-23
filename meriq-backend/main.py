import os
import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import skills, assessment, recommendations, analytics, resumes, screening

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Adaptive skill learning, diagnostic intelligence, 1,000 candidate resume PDF dataset, and AI NLP screening API."
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
app.include_router(screening.router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
async def health_check():
    """System health check endpoint."""
    return {
        "status": "healthy",
        "service": "MERIQ FastAPI Backend",
        "version": settings.VERSION,
        "engine": "Adaptive Skill Intelligence & AI Resume Screening Engine"
    }

@app.get("/", tags=["Health"])
async def root():
    return {
        "message": "Welcome to MERIQ API — Intelligent Adaptive Skill Learning & Screening Platform",
        "docs": "/docs",
        "health": "/health",
        "resumes_dataset": "/api/resumes",
        "screening": "/api/screening/jobs"
    }

@app.get("/api/report/download", tags=["Report"])
@app.get("/report.pdf", tags=["Report"])
async def download_report_pdf():
    """Serve and download the official MERIQ Mini Project Report PDF."""
    pdf_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "MERIQ_Mini_Project_Report.pdf")
    if not os.path.exists(pdf_path):
        pdf_path = os.path.join(os.path.dirname(__file__), "MERIQ_Mini_Project_Report.pdf")
    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename="MERIQ_Mini_Project_Report.pdf"
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
