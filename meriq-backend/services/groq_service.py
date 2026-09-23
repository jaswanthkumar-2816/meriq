"""
Groq LLM Service for dynamic skill decomposition and probe synthesis.
If GROQ_API_KEY is provided in .env, connects to Groq API.
Otherwise gracefully provides deterministic structured AI skill generation.
"""
import os
import httpx
import json
from typing import Dict, Any
from config import settings

class GroqService:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = "llama-3.3-70b-versatile"

    async def generate_skill_hierarchy(self, skill_name: str, category: str = "Programming") -> Dict[str, Any]:
        """
        Decomposes a skill into a structured hierarchical knowledge tree
        (Fundamentals, Core Patterns, Advanced Paradigms).
        """
        # If valid API key is present, invoke Groq API
        if self.api_key:
            try:
                prompt = f"""
                You are MERIQ, an expert adaptive educational AI.
                Decompose the skill '{skill_name}' (Category: {category}) into a clean hierarchical JSON format.
                Return ONLY valid JSON matching this structure:
                {{
                    "id": "{skill_name.lower().replace(' ', '-')}",
                    "name": "{skill_name} Core Architecture",
                    "mastery": 50,
                    "children": [
                        {{
                            "id": "domain-1",
                            "name": "1. Fundamentals & Foundations",
                            "mastery": 50,
                            "difficulty": "Beginner",
                            "description": "Core syntax and fundamentals",
                            "children": [
                                {{"id": "sub-1-1", "name": "Basic Syntax", "mastery": 50, "difficulty": "Beginner"}}
                            ]
                        }}
                    ]
                }}
                """
                async with httpx.AsyncClient(timeout=15.0) as client:
                    response = await client.post(
                        self.api_url,
                        headers={
                            "Authorization": f"Bearer {self.api_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": self.model,
                            "messages": [{"role": "user", "content": prompt}],
                            "temperature": 0.3,
                            "response_format": {"type": "json_object"}
                        }
                    )
                    if response.status_code == 200:
                        data = response.json()
                        content = data["choices"][0]["message"]["content"]
                        return json.loads(content)
            except Exception as e:
                print(f"[GroqService] API call failed: {e}. Using deterministic synthesis.")

        # Robust deterministic fallback synthesis
        slug = skill_name.lower().replace(" ", "-")
        return {
            "id": f"{slug}-root",
            "name": f"{skill_name} Architecture",
            "mastery": 50,
            "children": [
                {
                    "id": f"{slug}-fundamentals",
                    "name": f"1. {skill_name} Fundamentals",
                    "mastery": 65,
                    "difficulty": "Beginner",
                    "description": f"Core primitives, syntax rules, configuration, and foundational setup for {skill_name}.",
                    "children": [
                        {"id": f"{slug}-f1", "name": "Primitives & Syntax", "mastery": 70, "difficulty": "Beginner"},
                        {"id": f"{slug}-f2", "name": "Configuration & Tooling", "mastery": 60, "difficulty": "Beginner"}
                    ]
                },
                {
                    "id": f"{slug}-core",
                    "name": f"2. Core Architectural Patterns",
                    "mastery": 50,
                    "difficulty": "Intermediate",
                    "description": f"Standard workflows, component lifecycles, data handling, and algorithmic patterns in {skill_name}.",
                    "children": [
                        {"id": f"{slug}-c1", "name": "Control Logic & Handlers", "mastery": 55, "difficulty": "Intermediate"},
                        {"id": f"{slug}-c2", "name": "State & Data Management", "mastery": 45, "difficulty": "Intermediate"}
                    ]
                },
                {
                    "id": f"{slug}-advanced",
                    "name": f"3. Advanced Optimization & Production",
                    "mastery": 35,
                    "difficulty": "Advanced",
                    "description": f"Performance tuning, concurrency, security hardening, and scalable deployment in {skill_name}.",
                    "children": [
                        {"id": f"{slug}-a1", "name": "Performance & Bottlenecks", "mastery": 30, "difficulty": "Advanced"},
                        {"id": f"{slug}-a2", "name": "Production Resilience", "mastery": 40, "difficulty": "Advanced"}
                    ]
                }
            ]
        }

groq_service = GroqService()
