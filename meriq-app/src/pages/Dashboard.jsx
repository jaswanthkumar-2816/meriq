import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MasteryBar from '../components/MasteryBar';
import { 
  Target, 
  GitFork, 
  BookOpen, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';
import { useSkill } from '../context/SkillContext';

export default function Dashboard() {
  const { activeSkill } = useSkill();

  const skill = activeSkill || {
    id: 'python',
    name: 'Python',
    overallMastery: 67,
    totalConcepts: 16,
    masteredConcepts: 12,
    weakConcepts: [
      { id: 'py-inheritance', name: 'Inheritance & super() Methods', currentMastery: 21, targetMastery: 75, estimatedTime: '45 min' }
    ]
  };

  const isPostRetest = skill.overallMastery >= 75;

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Adaptive Learning Dashboard" 
          subtitle="Real-time knowledge diagnosis, detected skill gaps, and targeted micro-curricula."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Top Focus Banner: 4 Core MERIQ Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Pillar 1: Knowledge Diagnosis */}
            <div className="bg-white dark:bg-[#0a0a0d] p-5 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">01 • Diagnosis</span>
                <Target className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">{skill.name} Diagnostic</div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">10-question adaptive assessment</p>
              </div>
              <Link
                to={`/assessment/${skill.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
              >
                <span>Run Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Skill Hierarchy */}
            <div className="bg-white dark:bg-[#0a0a0d] p-5 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">02 • Hierarchy</span>
                <GitFork className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">{skill.totalConcepts || 16} Concepts</div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">Structured graph tree</p>
              </div>
              <Link
                to={`/skills/${skill.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
              >
                <span>View Skill Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Targeted Learning */}
            <div className="bg-white dark:bg-[#0a0a0d] p-5 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">03 • Learning</span>
                <BookOpen className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">Targeted Plan</div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">3 explainable curated resources</p>
              </div>
              <Link
                to={`/recommendations/${skill.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
              >
                <span>Open Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Reassessment */}
            <div className="bg-white dark:bg-[#0a0a0d] p-5 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">04 • Reassessment</span>
                <RotateCcw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {isPostRetest ? '+53% Verified' : 'Retest Ready'}
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">Concept-specific verification</p>
              </div>
              <Link
                to={`/retest/${skill.id}/py-inheritance`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
              >
                <span>{isPostRetest ? 'Retest Again' : 'Take Verification Test'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Active Skill Knowledge Profile Spotlight */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1a1a20] pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-bold mb-1.5 border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Active Skill Intelligence Profile
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {skill.name} Core Architecture
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/assessment/${skill.id}`}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Target className="w-4 h-4" />
                  <span>Retake Diagnostic</span>
                </Link>
              </div>
            </div>

            {/* Knowledge Stats & Highlighted Gap */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Overall Score */}
              <div className="p-6 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-3">
                <div className="text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">Estimated Knowledge</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono text-amber-500 dark:text-amber-400">
                    {skill.overallMastery}%
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">overall understanding</span>
                </div>
                <MasteryBar value={skill.overallMastery} size="md" showLabel={true} showPercentage={false} />
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-normal">
                  Based on concept-level evidence across 5 hierarchical domains.
                </p>
              </div>

              {/* Detected Bottleneck / Learning Gap */}
              <div className="lg:col-span-2 p-6 bg-rose-50/70 dark:bg-[#180d10] border border-rose-200/80 dark:border-rose-900/60 rounded-2xl space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 tracking-wider">
                        Primary Bottleneck Detected
                      </div>
                      <h4 className="text-base font-extrabold text-rose-950 dark:text-rose-100">
                        {isPostRetest ? 'Inheritance Gap Resolved (+53%)' : 'Object-Oriented Programming (OOP) — 34%'}
                      </h4>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white dark:bg-[#251015] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    {isPostRetest ? 'Mastered' : 'Critical Gap'}
                  </span>
                </div>

                <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
                  {isPostRetest
                    ? 'Your post-test verified solid comprehension of method overriding and super() delegation. Your Python profile is now at 76% mastery.'
                    : 'You have solid Python Fundamentals (92%) and Control Flow (84%). You don’t need to restart Python from scratch—fix this single gap in 45 minutes.'}
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <Link
                    to={`/recommendations/${skill.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Targeted Learning Plan</span>
                  </Link>

                  <Link
                    to={`/skills/${skill.id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-neutral-200 bg-white dark:bg-[#141419] hover:bg-slate-100 dark:hover:bg-[#1e1e26] border border-slate-200 dark:border-[#22222a] transition-all flex items-center gap-1.5"
                  >
                    <GitFork className="w-3.5 h-3.5 text-amber-500" />
                    <span>Explore Skill Map</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Domain Matrix Preview */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Granular Domain Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Real-time knowledge estimation per hierarchical topic
                </p>
              </div>
              <Link
                to={`/skills/${skill.id}`}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Interactive Graph</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">Fundamentals</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-lg font-extrabold font-mono text-emerald-600 dark:text-emerald-400">92%</div>
                <MasteryBar value={92} size="sm" showLabel={false} showPercentage={false} />
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">Control Flow</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-extrabold font-mono text-amber-600 dark:text-amber-400">84%</div>
                <MasteryBar value={84} size="sm" showLabel={false} showPercentage={false} />
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">Functions</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-extrabold font-mono text-amber-600 dark:text-amber-400">71%</div>
                <MasteryBar value={71} size="sm" showLabel={false} showPercentage={false} />
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-neutral-200">Data Structures</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-extrabold font-mono text-amber-600 dark:text-amber-400">78%</div>
                <MasteryBar value={78} size="sm" showLabel={false} showPercentage={false} />
              </div>

              <div className={`p-3.5 rounded-2xl border space-y-2 ${
                isPostRetest 
                  ? 'bg-emerald-50 dark:bg-[#0f1f18] border-emerald-200 dark:border-emerald-900/60' 
                  : 'bg-rose-50 dark:bg-[#180d10] border-rose-200 dark:border-rose-900/60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">OOP (Inheritance)</span>
                  {isPostRetest ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <div className={`text-lg font-extrabold font-mono ${isPostRetest ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isPostRetest ? '74%' : '34%'}
                </div>
                <MasteryBar value={isPostRetest ? 74 : 34} size="sm" showLabel={false} showPercentage={false} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
