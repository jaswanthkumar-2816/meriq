import { apiRequest, storage } from './client';
import { getSkillById } from './skills';

/**
 * Fetch explainable, targeted learning recommendations for a skill's weak concepts
 */
export async function getRecommendations(skillId) {
  return apiRequest(`/api/recommendations/${skillId}`, {}, async () => {
    const skill = await getSkillById(skillId);
    return {
      skillId: skill.id,
      skillName: skill.name,
      weakConcepts: skill.weakConcepts || [],
      recommendations: skill.recommendations || []
    };
  });
}

/**
 * Mark a resource as learned
 */
export async function markResourceLearned(skillId, resourceId) {
  const completed = storage.get('completed_resources', []);
  if (!completed.includes(resourceId)) {
    completed.push(resourceId);
    storage.set('completed_resources', completed);
  }
  return { success: true, resourceId, completedAt: new Date().toISOString() };
}

/**
 * Check if a resource is marked as learned
 */
export function isResourceLearned(resourceId) {
  const completed = storage.get('completed_resources', []);
  return completed.includes(resourceId);
}
