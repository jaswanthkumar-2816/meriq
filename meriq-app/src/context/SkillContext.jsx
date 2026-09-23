import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSkills, getSkillById, generateNewSkill, updateSkillMastery } from '../api/skills';
import { storage } from '../api/client';
import { INITIAL_SKILLS } from '../data/demoData';

const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([]);
  const [activeSkillId, setActiveSkillId] = useState('python');
  const [activeSkill, setActiveSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Theme Management: default to 'dark' (Pitch-Black Dark Mode)
  const [theme, setTheme] = useState(() => {
    const savedTheme = storage.get('theme', null);
    if (savedTheme) return savedTheme;
    return 'dark'; // Always default to pure black dark mode
  });

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    storage.set('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load skills initially
  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await getSkills();
      setSkills(data);
      const current = data.find(s => s.id === activeSkillId) || data[0];
      setActiveSkill(current);
    } catch (err) {
      console.error('Error loading skills', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // Update active skill when activeSkillId changes
  useEffect(() => {
    if (activeSkillId) {
      getSkillById(activeSkillId).then(skill => {
        if (skill) setActiveSkill(skill);
      });
    }
  }, [activeSkillId]);

  // Show temporary toast notification
  const showToast = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Add custom skill with AI generator simulation
  const addSkill = async (skillName, category) => {
    setLoading(true);
    try {
      const newSkill = await generateNewSkill(skillName, category);
      await loadSkills();
      setActiveSkillId(newSkill.id);
      showToast(`Skill map generated for "${skillName}"`, 'success');
      return newSkill;
    } catch (err) {
      showToast(`Failed to generate skill: ${err.message}`, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset demo data to initial state
  const resetDemoState = () => {
    storage.remove('skills_data');
    storage.remove('completed_resources');
    storage.remove('retest_logs');
    storage.set('skills_data', INITIAL_SKILLS);
    loadSkills();
    showToast('MERIQ demo state reset to initial Python benchmark', 'info');
  };

  return (
    <SkillContext.Provider
      value={{
        skills,
        activeSkillId,
        setActiveSkillId,
        activeSkill,
        setActiveSkill,
        loading,
        notification,
        showToast,
        addSkill,
        loadSkills,
        resetDemoState,
        theme,
        toggleTheme
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkill() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkill must be used within a SkillProvider');
  }
  return context;
}
