import { apiRequest, storage } from './client';
import { INITIAL_SKILLS, generateDynamicSkillGraph } from '../data/demoData';

const SKILLS_KEY = 'skills_data';

// Initialize skills in storage if empty
function getStoredSkills() {
  const stored = storage.get(SKILLS_KEY);
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    storage.set(SKILLS_KEY, INITIAL_SKILLS);
    return INITIAL_SKILLS;
  }
  return stored;
}

/**
 * Fetch all available skills
 */
export async function getSkills() {
  return apiRequest('/api/skills', {}, () => {
    return getStoredSkills();
  });
}

/**
 * Fetch a specific skill with hierarchy
 */
export async function getSkillById(skillId) {
  return apiRequest(`/api/skills/${skillId}`, {}, () => {
    const skills = getStoredSkills();
    const skill = skills.find(s => s.id === skillId.toLowerCase());
    if (skill) return skill;

    // Fallback: If not found, generate dynamically
    const generated = generateDynamicSkillGraph(skillId.toUpperCase());
    skills.push(generated);
    storage.set(SKILLS_KEY, skills);
    return generated;
  });
}

/**
 * Fetch skill hierarchy only
 */
export async function getSkillHierarchy(skillId) {
  return apiRequest(`/api/skills/${skillId}/hierarchy`, {}, async () => {
    const skill = await getSkillById(skillId);
    return skill ? skill.hierarchy : null;
  });
}

/**
 * Dynamically generate a new skill hierarchy (simulates Groq/LLM cache miss & Mongo store)
 */
export async function generateNewSkill(skillName, category = 'General') {
  return apiRequest('/api/skills/generate', {
    method: 'POST',
    body: JSON.stringify({ skillName, category })
  }, async () => {
    // Simulate AI Generation delay (1.5s) to allow step-by-step UI loading
    await new Promise(res => setTimeout(res, 1200));

    const generated = generateDynamicSkillGraph(skillName, category);
    const skills = getStoredSkills();
    
    // Check if already exists
    const existingIndex = skills.findIndex(s => s.id === generated.id);
    if (existingIndex >= 0) {
      skills[existingIndex] = generated;
    } else {
      skills.unshift(generated);
    }
    
    storage.set(SKILLS_KEY, skills);
    return generated;
  });
}

/**
 * Update skill knowledge after retest / diagnostic
 */
export async function updateSkillMastery(skillId, updatedConceptData) {
  const skills = getStoredSkills();
  const index = skills.findIndex(s => s.id === skillId.toLowerCase());
  
  if (index >= 0) {
    const skill = { ...skills[index] };
    
    // Update overall and specific concept
    if (updatedConceptData.newOverallMastery) {
      skill.overallMastery = updatedConceptData.newOverallMastery;
    }
    
    // Traverse hierarchy to update concept node
    function updateNode(node) {
      if (node.id === updatedConceptData.conceptId) {
        node.mastery = updatedConceptData.afterScore;
        node.status = updatedConceptData.masteryStatus || (node.mastery >= 90 ? 'Mastered' : node.mastery >= 70 ? 'Strong' : node.mastery >= 40 ? 'Developing' : 'Needs Attention');
      }
      if (node.children) {
        node.children.forEach(updateNode);
      }
    }
    
    if (skill.hierarchy) {
      updateNode(skill.hierarchy);
    }
    
    // Update weak concepts list
    if (skill.weakConcepts) {
      skill.weakConcepts = skill.weakConcepts.filter(w => w.id !== updatedConceptData.conceptId);
    }

    skills[index] = skill;
    storage.set(SKILLS_KEY, skills);
    return skill;
  }
  return null;
}
