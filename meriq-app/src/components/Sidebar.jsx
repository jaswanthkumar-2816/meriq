import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  GitFork, 
  ClipboardCheck, 
  BookOpen, 
  TrendingUp, 
  FileText,
  UserCheck,
  Users,
  Code2,
  Mic,
  Sparkles, 
  RotateCcw, 
  ChevronRight 
} from 'lucide-react';
import { useSkill } from '../context/SkillContext';
import ThemeToggle from './ThemeToggle';

export default function Sidebar() {
  const location = useLocation();
  const { activeSkillId, activeSkill, resetDemoState } = useSkill();

  const currentSkillId = activeSkillId || 'python';

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Skills', href: '/skills', icon: Layers },
    { name: 'Skill Graph', href: `/skills/${currentSkillId}`, icon: GitFork },
    { name: 'Diagnostic', href: `/assessment/${currentSkillId}`, icon: ClipboardCheck },
    { name: 'Learning Plan', href: `/recommendations/${currentSkillId}`, icon: BookOpen },
    { name: 'Progress & Analytics', href: '/progress', icon: TrendingUp },
    { name: 'Resume Screening', href: '/screening', icon: UserCheck, badge: 'AI Match' },
    { name: 'Candidate Compare', href: '/compare', icon: Users, badge: 'Duel' },
    { name: 'CodeLab Sandbox', href: '/codelab', icon: Code2, badge: 'Live Code' },
    { name: 'AI Interview Studio', href: '/interview', icon: Mic, badge: 'AI Viva' },
    { name: '1,000 Resumes Dataset', href: '/resumes', icon: FileText, badge: '1K PDFs' },
  ];


  return (
    <aside className="w-64 bg-white dark:bg-black border-r border-slate-200/80 dark:border-[#1c1c22] flex flex-col h-screen sticky top-0 shrink-0 select-none z-30 transition-colors">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-slate-100 dark:border-[#1c1c22] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-black fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none">
              MERIQ
            </span>
            <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase mt-0.5">
              Skill Intelligence
            </span>
          </div>
        </Link>
        <ThemeToggle className="scale-90" />
      </div>

      {/* Active Skill Indicator Card */}
      <div className="p-4">
        <div className="p-3 bg-slate-50 dark:bg-[#0c0c0e] border border-slate-200/70 dark:border-[#1c1c22] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 animate-pulse shadow-sm shadow-amber-400" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 tracking-wider">Active Skill</div>
              <div className="text-sm font-bold text-slate-800 dark:text-neutral-200 truncate">
                {activeSkill ? activeSkill.name : 'Python'}
              </div>
            </div>
          </div>
          <Link
            to="/skills"
            className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 bg-amber-50 dark:bg-amber-950/60 px-2 py-1 rounded-md transition-colors border border-amber-200/60 dark:border-amber-900/60"
          >
            Change
          </Link>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
          Core Workflows
        </div>
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || (item.href !== '/dashboard' && item.href !== '/skills' && item.href !== '/resumes' && location.pathname.startsWith(item.href));
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 text-black font-extrabold shadow-sm shadow-amber-500/30'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-[#121215]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && !isActive && (
                <span className="text-[9px] font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/60 font-mono">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Utilities */}
      <div className="p-4 border-t border-slate-100 dark:border-[#1c1c22] space-y-2">
        <button
          onClick={resetDemoState}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#121215] transition-colors"
          title="Reset to benchmark demo state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo State</span>
        </button>

        <div className="pt-2 border-t border-slate-100 dark:border-[#1c1c22] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 px-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-400 dark:bg-amber-500 text-black flex items-center justify-center font-extrabold text-[10px]">
              MP
            </div>
            <span className="font-medium text-slate-700 dark:text-neutral-300 truncate max-w-[90px]">Mini Project</span>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 dark:bg-[#121215] text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.5 rounded border border-transparent dark:border-[#1c1c22]">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
