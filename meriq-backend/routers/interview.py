"""
MERIQ AI Interview Studio — Technical Viva & Engineering Q&A Evaluation Router
Generates role-specific architectural interview probes and assesses candidate responses.
"""
import re
import math
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/interview", tags=["Feature: AI Technical Interview Studio"])

INTERVIEW_PROBES = {
    "python-backend": [
        {
            "id": "py-01",
            "title": "FastAPI Concurrency vs Django WSGI",
            "category": "Architecture & Concurrency",
            "difficulty": "Senior",
            "question": "How does FastAPI's ASGI event loop architecture differ fundamentally from synchronous Django WSGI workers? In what scenarios can an async endpoint inadvertently block the entire application, and how do you resolve it?",
            "keyPoints": [
                "ASGI event loop non-blocking I/O vs WSGI process/thread-per-request model",
                "Async functions running synchronous CPU-bound or blocking I/O (e.g. requests, time.sleep) starve the event loop",
                "Resolution via run_in_executor, Celery background tasks, or threadpool offloading",
                "Uvicorn / Gunicorn worker relationship"
            ],
            "modelAnswer": "FastAPI is built on Starlette and utilizes ASGI (Asynchronous Server Gateway Interface), which operates on a single-threaded cooperative event loop (asyncio). In contrast, standard Django WSGI allocates a separate OS thread or worker process per concurrent HTTP connection. If an async endpoint calls a synchronous blocking library (e.g., standard time.sleep() or synchronous requests.get()), it freezes the event loop, preventing all concurrent coroutines from progressing. To resolve this, CPU-bound or blocking calls must be dispatched to a ThreadPoolExecutor via loop.run_in_executor(None, fn, *args) or moved to an asynchronous task queue like Celery or Redis Streams."
        },
        {
            "id": "py-02",
            "title": "Database Connection Pooling & Transaction Isolation",
            "category": "Databases & Performance",
            "difficulty": "Mid-Level",
            "question": "Explain the concept of connection pooling in PostgreSQL with asyncpg or SQLAlchemy. What are the dangers of keeping transactions open during external HTTP calls?",
            "keyPoints": [
                "Connection pool reuse eliminates costly TCP and TLS handshake overhead",
                "Holding transactions open during external API calls causes connection exhaustion and idle-in-transaction states",
                "Table/row lock contention leading to cascading deadlocks",
                "Best practice: Keep DB transactions minimal and wrap external I/O outside atomic DB blocks"
            ],
            "modelAnswer": "Connection pooling maintains a warm pool of established TCP/TLS database sockets (e.g., 20 connections) that coroutines check out and return, avoiding expensive per-request socket initialization. If an endpoint begins a database transaction and then awaits an external third-party HTTP call, the DB connection remains checked out in an 'idle in transaction' state. If the external call experiences latency, the connection pool rapidly exhausts, starving subsequent database queries across the entire microservice. Best practice mandates querying data, committing or closing the transaction, and only then executing external network calls."
        }
    ],
    "fullstack-react": [
        {
            "id": "fe-01",
            "title": "React 18 Concurrent Rendering & Server Components",
            "category": "Frontend Architecture",
            "difficulty": "Senior",
            "question": "How does React 18 Concurrent Mode (e.g., useTransition, Suspense) improve UI responsiveness compared to legacy synchronous rendering? What are the architectural trade-offs of React Server Components (RSC)?",
            "keyPoints": [
                "Concurrent rendering allows React to interrupt long render trees to handle urgent user inputs",
                "useTransition marks non-urgent updates, keeping the input field immediately interactive",
                "React Server Components reduce client bundle size by running purely on the server without client JS overhead",
                "Trade-offs: Serialization boundary constraints and server-state latency"
            ],
            "modelAnswer": "In React 18, Concurrent Mode decouples rendering from a blocking synchronous pipeline into an interruptible state machine. Through primitives like useTransition and useDeferredValue, React can pause expensive background tree re-renders to prioritize urgent micro-tasks such as typing in an input field or clicking a button. React Server Components (RSC) complement this by rendering purely on the server and sending a compact virtual DOM stream to the client with zero bundle JavaScript impact for those components. The trade-offs involve managing client-server component boundaries, strict prop serialization, and handling cold-start server latencies."
        }
    ],
    "ai-ml-engineer": [
        {
            "id": "ai-01",
            "title": "RAG Architecture: Dense Retrieval vs Hybrid Sparse Search",
            "category": "AI / NLP & RAG",
            "difficulty": "Senior",
            "question": "In a production Retrieval-Augmented Generation (RAG) system, why does vector-only dense embedding search often fail on exact keyword lookups? How does a hybrid retrieval pipeline with cross-encoder re-ranking solve this?",
            "keyPoints": [
                "Dense vector embeddings capture semantic meaning but lose exact match precision on alphanumeric IDs, SKUs, or acronyms",
                "Sparse search (BM25 / Splade) excels at exact keyword and token frequency matches",
                "Reciprocal Rank Fusion (RRF) merges top results from both vector and keyword queries",
                "Cross-encoder re-ranking scores candidate chunks jointly with query for maximum semantic precision"
            ],
            "modelAnswer": "Dense vector retrieval maps texts into continuous latent space (e.g., cosine similarity of 1536-dimensional embeddings). While this captures broad semantic intent, it frequently struggles with precise alphanumeric tokens such as error codes, candidate IDs (e.g. RES-0042), or unique terminology because the embedding compresses individual characters into general vectors. A production hybrid retrieval system pairs dense vector search with sparse BM25 token matching, unifies their ranked lists using Reciprocal Rank Fusion (RRF), and passes the top 15 candidates to a cross-encoder model (e.g., BGE-Reranker) that scores token interactions jointly before passing the context to the LLM."
        }
    ]
}

class EvaluateAnswerRequest(BaseModel):
    probeId: str
    role: str
    candidateAnswer: str

@router.get("/questions")
async def get_interview_questions(role: Optional[str] = "python-backend"):
    """Retrieve curated technical interview questions for a target domain."""
    questions = INTERVIEW_PROBES.get(role, INTERVIEW_PROBES["python-backend"])
    return {
        "role": role,
        "questions": questions
    }

@router.post("/evaluate")
async def evaluate_candidate_answer(payload: EvaluateAnswerRequest):
    """
    Evaluates candidate's written or transcribed interview answer against
    the model answer and core engineering key points.
    """
    role_questions = INTERVIEW_PROBES.get(payload.role, INTERVIEW_PROBES["python-backend"])
    probe = next((q for q in role_questions if q["id"] == payload.probeId), role_questions[0])

    ans = payload.candidateAnswer.strip()
    if not ans:
        raise HTTPException(status_code=400, detail="Candidate answer cannot be empty.")

    ans_lower = ans.lower()

    # 1. Evaluate key points coverage
    matched_points = []
    missing_points = []
    for kp in probe["keyPoints"]:
        # Tokenize key point words
        kp_words = [w.lower() for w in re.findall(r'\b\w{4,}\b', kp)]
        hits = sum(1 for w in kp_words if w in ans_lower)
        if hits >= max(1, len(kp_words) // 3):
            matched_points.append(kp)
        else:
            missing_points.append(kp)

    point_ratio = len(matched_points) / len(probe["keyPoints"]) if probe["keyPoints"] else 0.5
    accuracy_score = min(100, round(point_ratio * 90 + (10 if len(ans) > 120 else 0)))

    # 2. Architectural depth (length + technical vocabulary density)
    tech_terms = ["event loop", "blocking", "concurrency", "thread", "pool", "async", "latency", "vector", "state", "cache", "lock"]
    tech_hits = sum(1 for t in tech_terms if t in ans_lower)
    depth_score = min(100, max(30, tech_hits * 15 + min(40, len(ans) // 10)))

    # 3. Communication clarity score
    clarity_score = 85 if len(ans) >= 80 else max(40, len(ans))

    composite_score = round((accuracy_score * 0.45) + (depth_score * 0.35) + (clarity_score * 0.20))

    strengths = []
    if accuracy_score >= 70:
        strengths.append(f"Demonstrated solid conceptual grasp of {probe['category']}.")
    if tech_hits >= 2:
        strengths.append("Utilized precise systems engineering vocabulary and architectural concepts.")
    if len(matched_points) > 0:
        strengths.append(f"Accurately addressed: {matched_points[0][:60]}...")
    if not strengths:
        strengths.append("Provided a relevant attempt with basic domain awareness.")

    recommendations = []
    for mp in missing_points[:2]:
        recommendations.append(f"Deepen response regarding: {mp}")
    if len(ans) < 100:
        recommendations.append("Elaborate further on trade-offs and operational edge cases.")

    return {
        "probeId": probe["id"],
        "title": probe["title"],
        "overallScore": composite_score,
        "metrics": {
            "technicalAccuracy": accuracy_score,
            "architecturalDepth": depth_score,
            "clarityAndPrecision": clarity_score
        },
        "matchedKeyPoints": matched_points,
        "missingKeyPoints": missing_points,
        "strengths": strengths,
        "recommendations": recommendations,
        "modelAnswer": probe["modelAnswer"]
    }
