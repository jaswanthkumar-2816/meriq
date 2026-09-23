from typing import Dict, Any
from database import db

class AnalyticsService:
    def get_progress_analytics(self, skill_id: str) -> Dict[str, Any]:
        skill = db.get_skill(skill_id)
        if not skill:
            skill = {
                "id": skill_id,
                "name": skill_id.capitalize(),
                "overallMastery": 67,
                "totalConcepts": 16,
                "masteredConcepts": 12
            }

        overall_mastery = skill.get("overallMastery", 67)
        is_post_retest = overall_mastery >= 75

        timeline = [
            {"date": "Day 1", "mastery": 42, "event": "Initial Baseline Diagnostic"},
            {"date": "Day 3", "mastery": 55, "event": "Syntax & Control Flow Review"},
            {"date": "Day 5", "mastery": 67, "event": "Adaptive Diagnostic Probe"},
            {"date": "Today", "mastery": 76 if is_post_retest else 67, "event": "Inheritance Retest Verified" if is_post_retest else "Diagnostic Complete"}
        ]

        concept_mastery_data = [
            {"subject": "Fundamentals", "mastery": 92, "benchmark": 75},
            {"subject": "Control Flow", "mastery": 84, "benchmark": 75},
            {"subject": "Functions", "mastery": 71, "benchmark": 70},
            {"subject": "Data Structures", "mastery": 78, "benchmark": 70},
            {"subject": "OOP", "mastery": 74 if is_post_retest else 34, "benchmark": 70}
        ]

        return {
            "skillId": skill_id,
            "overallMastery": overall_mastery,
            "totalConcepts": skill.get("totalConcepts", 16),
            "masteredConcepts": skill.get("masteredConcepts", 12) + (1 if is_post_retest else 0),
            "learningTimeFormatted": "1h 45m",
            "knowledgeGainPercent": "+53% on Weak Concepts" if is_post_retest else "+25% Overall",
            "masteryTimeline": timeline,
            "conceptMasteryData": concept_mastery_data,
            "activeSkill": skill
        }

analytics_service = AnalyticsService()
