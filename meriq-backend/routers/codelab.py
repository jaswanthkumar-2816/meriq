"""
MERIQ CodeLab — Interactive Code Execution & Technical Assessment Sandbox
Provides challenge specifications, test runners, and performance profiling.
"""
import time
import io
import sys
import traceback
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/codelab", tags=["Feature: Interactive CodeLab Sandbox"])

CHALLENGES = [
    {
        "id": "py-async-concurrency",
        "title": "Python Concurrency: Non-Blocking Async Pipeline",
        "category": "Backend / Concurrency",
        "difficulty": "Medium",
        "estimatedMinutes": 15,
        "description": "In an asynchronous FastAPI application, a CPU-intensive cryptographic hash check is blocking the central event loop, causing p99 latency to spike to 2.4s. Refactor the function to offload execution to a thread pool executor using asyncio and concurrent.futures without blocking the main loop.",
        "starterCode": '''import asyncio
import hashlib
import time

def compute_hash(data: str) -> str:
    """Simulates intensive CPU operation."""
    time.sleep(0.05)
    return hashlib.sha256(data.encode()).hexdigest()

async def process_batch(items: list[str]) -> list[str]:
    """TODO: Refactor this function so it does not block the async event loop."""
    results = []
    # Currently blocking the loop sequentially:
    for item in items:
        # Offload or run concurrently:
        loop = asyncio.get_running_loop()
        res = await loop.run_in_executor(None, compute_hash, item)
        results.append(res)
    return results
''',
        "tests": [
            {
                "name": "Batch Hashing Output Validation",
                "testCode": '''
res = asyncio.run(process_batch(["user1", "user2", "user3"]))
assert len(res) == 3, f"Expected 3 hashes, got {len(res)}"
assert all(len(h) == 64 for h in res), "Output elements must be 64-char hex SHA256"
'''
            },
            {
                "name": "Empty Input Boundary Condition",
                "testCode": '''
res = asyncio.run(process_batch([]))
assert res == [], f"Expected empty list, got {res}"
'''
            }
        ]
    },
    {
        "id": "db-n-plus-one",
        "title": "SQLAlchemy ORM: Eliminate N+1 Query Cascade",
        "category": "Database / Optimization",
        "difficulty": "Hard",
        "estimatedMinutes": 20,
        "description": "An enterprise service fetches 500 Candidate Profiles and sequentially queries each candidate's Skills table in a nested loop, triggering 501 SQL queries (N+1 bottleneck). Implement an eager-loading or batch-fetching strategy using joinedload or selectinload semantics.",
        "starterCode": '''def optimize_candidate_query(candidates_with_skills_map: dict) -> list[dict]:
    """
    Transforms separate candidate and skill records into an aggregated
    structure in a single O(N) pass, eliminating the N+1 nested loop.
    """
    aggregated = []
    for cid, data in candidates_with_skills_map.items():
        aggregated.append({
            "id": cid,
            "name": data.get("name", "Unknown"),
            "skills": sorted(data.get("skills", [])),
            "skill_count": len(data.get("skills", []))
        })
    return aggregated
''',
        "tests": [
            {
                "name": "Aggregated Profile Structure",
                "testCode": '''
mock_data = {
    "C1": {"name": "Alice", "skills": ["Python", "FastAPI"]},
    "C2": {"name": "Bob", "skills": ["React", "TypeScript", "Node"]}
}
res = optimize_candidate_query(mock_data)
assert len(res) == 2, f"Expected 2 aggregated records, got {len(res)}"
assert res[0]["skill_count"] == 2
assert res[1]["skill_count"] == 3
'''
            }
        ]
    },
    {
        "id": "dsa-lru-cache",
        "title": "Data Structures: Thread-Safe LRU Cache",
        "category": "Algorithms / Memory",
        "difficulty": "Medium",
        "estimatedMinutes": 15,
        "description": "Design an in-memory Least Recently Used (LRU) Cache supporting get(key) and put(key, value) operations in O(1) average time complexity using an OrderedDict or doubly linked list with a hash map.",
        "starterCode": '''from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
''',
        "tests": [
            {
                "name": "LRU Eviction Order",
                "testCode": '''
cache = LRUCache(2)
cache.put(1, 100)
cache.put(2, 200)
assert cache.get(1) == 100, "Cache must return 100"
cache.put(3, 300) # Evicts key 2
assert cache.get(2) == -1, "Key 2 must have been evicted"
assert cache.get(3) == 300
assert cache.get(1) == 100
'''
            },
            {
                "name": "Key Update Handling",
                "testCode": '''
cache = LRUCache(2)
cache.put(1, 1)
cache.put(1, 10)
assert cache.get(1) == 10, "Updated key must reflect new value"
'''
            }
        ]
    }
]

class CodeRunRequest(BaseModel):
    challengeId: str
    code: str

@router.get("/challenges")
async def list_challenges():
    """Retrieve all preloaded technical engineering challenges."""
    return {"challenges": CHALLENGES}

@router.post("/run")
async def execute_code(payload: CodeRunRequest):
    """
    Executes Python code against challenge unit test assertions in a controlled scope.
    Captures stdout, measures execution time, and evaluates pass/fail status.
    """
    challenge = next((c for c in CHALLENGES if c["id"] == payload.challengeId), None)
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge ID not found.")

    start_time = time.perf_counter()
    stdout_capture = io.StringIO()
    old_stdout = sys.stdout

    test_results = []
    overall_passed = True
    error_message = None

    try:
        sys.stdout = stdout_capture
        global_scope = {}
        # 1. Execute candidate code
        exec(payload.code, global_scope)

        # 2. Run test assertions
        for idx, t in enumerate(challenge["tests"]):
            t_start = time.perf_counter()
            test_passed = True
            test_err = None
            try:
                exec(t["testCode"], global_scope)
            except AssertionError as ae:
                test_passed = False
                overall_passed = False
                test_err = str(ae) or "Assertion failed"
            except Exception as ex:
                test_passed = False
                overall_passed = False
                test_err = f"{type(ex).__name__}: {str(ex)}"

            t_elapsed_ms = round((time.perf_counter() - t_start) * 1000, 2)
            test_results.append({
                "testIndex": idx + 1,
                "name": t["name"],
                "passed": test_passed,
                "elapsedMs": t_elapsed_ms,
                "error": test_err
            })

    except Exception as e:
        overall_passed = False
        error_message = f"{type(e).__name__}: {str(e)}"
    finally:
        sys.stdout = old_stdout

    total_time_ms = round((time.perf_counter() - start_time) * 1000, 2)
    printed_output = stdout_capture.getvalue()

    return {
        "challengeId": payload.challengeId,
        "success": overall_passed,
        "executionTimeMs": total_time_ms,
        "stdout": printed_output.strip(),
        "error": error_message,
        "tests": test_results,
        "memoryEstimateKb": 128 + len(payload.code) * 2
    }
