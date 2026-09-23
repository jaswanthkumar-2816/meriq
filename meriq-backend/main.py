import uvicorn
from fastapi import FastAPI
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

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True
    )
