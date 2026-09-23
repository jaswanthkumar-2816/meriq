import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useSkill } from '../context/SkillContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { theme, toggleTheme } = useSkill();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-neutral-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#121215] hover:bg-slate-200 dark:hover:bg-[#1c1c22] border border-slate-200/80 dark:border-[#26262f] shadow-sm transition-all active:scale-95 ${className}`}
      title={isDark ? 'Switch to Bright Theme' : 'Switch to Pitch Black Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
      )}
      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? 'Bright Mode' : 'Black Dark Mode'}
        </span>
      )}
    </button>
  );
}
