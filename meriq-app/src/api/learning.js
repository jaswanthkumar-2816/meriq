import { apiRequest, storage } from './client';
import { getSkills, getSkillById } from './skills';

/**
 * Get comprehensive learning analytics and mastery progression across all or single skill
 */
export async function getProgressAnalytics(skillId = null) {
  return apiRequest(`/api/progress/${skillId || 'all'}`, {}, async () => {
    const skills = await getSkills();
    const primarySkill = skillId ? await getSkillById(skillId) : skills.find(s => s.id === 'python') || skills[0];
    const retestLogs = storage.get('retest_logs', []);
    const completedResources = storage.get('completed_resources', []);

    // Time series mastery progression data
    const masteryTimeline = [
      { session: 'Initial Diagnostic', mastery: 42, target: 75, date: 'Aug 10' },
      { session: 'Fundamentals Diagnostic', mastery: 55, target: 75, date: 'Aug 14' },
      { session: 'Data Structures Drill', mastery: 67, target: 75, date: 'Aug 18' },
      { session: 'OOP Retest Verified', mastery: primarySkill.overallMastery || 76, target: 75, date: 'Today' }
    ];

    // Concept mastery radar/bar data for primary skill
    const conceptMasteryData = [
      { subject: 'Fundamentals', mastery: 92, benchmark: 80 },
      { subject: 'Control Flow', mastery: 84, benchmark: 80 },
      { subject: 'Functions', mastery: 71, benchmark: 75 },
      { subject: 'Data Structures', mastery: 78, benchmark: 75 },
      { subject: 'OOP (Inheritance)', mastery: primarySkill.overallMastery >= 75 ? 74 : 21, benchmark: 70 }
    ];

    // Weekly learning distribution
    const weeklyEffort = [
      { day: 'Mon', minutes: 45, masteryGained: 4 },
      { day: 'Tue', minutes: 30, masteryGained: 3 },
      { day: 'Wed', minutes: 60, masteryGained: 8 },
      { day: 'Thu', minutes: 20, masteryGained: 2 },
      { day: 'Fri', minutes: 40, masteryGained: 5 },
      { day: 'Sat', minutes: 75, masteryGained: 12 },
      { day: 'Sun', minutes: 25, masteryGained: 4 }
    ];

    return {
      overallMastery: primarySkill.overallMastery || 67,
      totalConcepts: primarySkill.totalConcepts || 16,
      masteredConcepts: primarySkill.overallMastery >= 75 ? 13 : (primarySkill.masteredConcepts || 12),
      learningTimeMinutes: 134 + (completedResources.length * 22),
      learningTimeFormatted: '2h 14m',
      knowledgeGainPercent: '+28%',
      masteryTimeline,
      conceptMasteryData,
      weeklyEffort,
      activeSkill: primarySkill,
      recentRetests: retestLogs,
      completedResourcesCount: completedResources.length
    };
  });
}
