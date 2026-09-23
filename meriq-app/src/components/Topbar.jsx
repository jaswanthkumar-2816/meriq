import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Activity } from 'lucide-react';
import { useSkill } from '../context/SkillContext';
import ThemeToggle from './ThemeToggle';

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();
  const { skills, setActiveSkillId } = useSkill();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Diagnostic ready for Python Core Architecture', time: '10m ago', unread: true },
    { id: 2, text: 'Inheritance targeted learning plan generated', time: '1h ago', unread: false },
    { id: 3, text: 'Knowledge graph synced with cache engine', time: 'Yesterday', unread: false },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const match = skills.find(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (match) {
        setActiveSkillId(match.id);
        navigate(`/skills/${match.id}`);
      } else {
        navigate('/skills');
      }
      setSearchQuery('');
    }
  };

  return (
    <header className="h-16 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#1c1c22] sticky top-0 z-20 px-6 flex items-center justify-between transition-colors">
      {/* Title / Context */}
      <div>
        <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          {title || 'MERIQ Adaptive Learning'}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-neutral-400 hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Global Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skill (e.g. Python, SQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-56 lg:w-64 pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-[#101014] border border-slate-200/60 dark:border-[#22222a] text-slate-900 dark:text-neutral-100 placeholder-slate-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-[#141419] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
        </form>

        {/* Diagnostic Mode Status Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Activity className="w-3.5 h-3.5" />
          <span>Diagnostic Active</span>
        </div>

        {/* Theme Switcher */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#141419] flex items-center justify-center transition-colors relative border border-transparent dark:border-[#22222a]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-2 right-2 ring-2 ring-white dark:ring-black shadow-sm shadow-amber-400" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0c0c0f] rounded-2xl shadow-card-hover dark:shadow-card-dark border border-slate-200 dark:border-[#22222a] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1c1c22]">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Learning Notifications</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold cursor-pointer">Mark read</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-[#1c1c22] mt-2">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 flex items-start gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-800 dark:text-neutral-200 font-medium">{n.text}</p>
                      <span className="text-[10px] text-slate-400 dark:text-neutral-500">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-[#1c1c22]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center text-xs font-extrabold shadow-sm">
            JS
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-800 dark:text-neutral-200 leading-tight">Student / Researcher</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Personalized Track</div>
          </div>
        </div>
      </div>
    </header>
  );
}
