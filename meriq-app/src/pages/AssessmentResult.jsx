import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MasteryBar from '../components/MasteryBar';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  GitFork, 
  BookOpen
} from 'lucide-react';
import { getSkillById } from '../api/skills';
import { useSkill } from '../context/SkillContext';

export default function AssessmentResult() {
  const { skillId } = useParams();
  const { setActiveSkillId } = useSkill();

  const [skill, setSkill] = useState(null);
  const currentSkillId = skillId || 'python';

  useEffect(() => {
    setActiveSkillId(currentSkillId);
    getSkillById(currentSkillId).then(data => {
      setSkill(data);
    });
  }, [currentSkillId, setActiveSkillId]);

  if (!skill) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-neutral-400">Loading skill profile...</p>
        </div>
      </div>
    );
  }

  const overallMastery = skill.overallMastery || 67;

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title={`Your ${skill.name} Skill Profile`} 
          subtitle="Granular concept-level diagnosis derived from your adaptive assessment."
        />

        <main className="p-6 max-w-5xl mx-auto w-full space-y-8">
          {/* Top Banner with Overall Understanding Score */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Diagnostic Complete
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Your {skill.name} Skill Profile
                </h2>
                {/* Important Requirement Sentence */}
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                  Your score is based on concept-level evidence, not just the number of questions answered correctly.
                </p>
              </div>

              {/* Large Score Visual */}
              <div className="p-6 bg-slate-900 dark:bg-[#050507] text-white rounded-3xl text-center md:min-w-[200px] shadow-lg border border-slate-800 dark:border-[#1a1a20]">
                <div className="text-[11px] uppercase tracking-widest font-bold text-amber-400/90">
                  Overall Understanding
                </div>
                <div className="text-5xl font-extrabold font-mono text-amber-400 my-1">
                  {overallMastery}%
                </div>
                <span className="text-[11px] font-semibold text-slate-300 dark:text-neutral-400">
                  {overallMastery >= 70 ? 'Strong Baseline' : 'Developing Baseline'}
                </span>
              </div>
            </div>

            {/* Crucial Pedagogical Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-[#181308] border border-amber-200 dark:border-amber-900/40 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-amber-950 dark:text-amber-200">You don’t need to restart {skill.name} from the beginning.</strong>
                <p className="mt-0.5 text-amber-900 dark:text-amber-300">
                  Your assessment demonstrates high fluency in syntax and data structures. MERIQ has isolated the exact missing concept branches below.
                </p>
              </div>
            </div>
          </div>

          {/* Detected Learning Gap Spotlight */}
          <div className="bg-rose-50/80 dark:bg-[#180d10] rounded-3xl border border-rose-200/90 dark:border-rose-900/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 tracking-wider">
                    Primary Knowledge Bottleneck
                  </span>
                  <h3 className="text-xl font-extrabold text-rose-950 dark:text-rose-100">
                    Your biggest learning gap: Object-Oriented Programming (34%)
                  </h3>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-[#251015] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                Action Required
              </span>
            </div>

            <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
              Diagnostic evidence reveals missing mental models around subclassing, Method Resolution Order (MRO), and <code className="px-1.5 py-0.5 bg-rose-100/80 dark:bg-[#2a1218] rounded font-mono font-bold text-rose-950 dark:text-rose-200">super()</code> delegation. Master this concept to reach 76%+ total skill proficiency.
            </p>

            <div className="pt-2">
              <Link
                to={`/recommendations/${skill.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 hover:shadow-lg transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>See My Learning Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Granular Concept Mastery Map */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Granular Concept Evidence Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Individual mastery across {skill.name} domains
                </p>
              </div>
              <Link
                to={`/skills/${skill.id}`}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Interactive Hierarchy</span>
                <GitFork className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4 pt-2">
              {/* Fundamentals */}
              <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-bold text-slate-800 dark:text-neutral-200">Fundamentals (Variables, Types, Operators)</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">92% • Mastered</span>
                </div>
                <MasteryBar value={92} size="sm" showLabel={false} showPercentage={false} />
              </div>

              {/* Control Flow */}
              <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-800 dark:text-neutral-200">Control Flow & Iteration Loops</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">84% • Strong</span>
                </div>
                <MasteryBar value={84} size="sm" showLabel={false} showPercentage={false} />
              </div>

              {/* Functions */}
              <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-800 dark:text-neutral-200">Functions & Lambda Expressions</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">71% • Strong</span>
                </div>
                <MasteryBar value={71} size="sm" showLabel={false} showPercentage={false} />
              </div>

              {/* Data Structures */}
              <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-slate-800 dark:text-neutral-200">Data Structures (Lists, Dicts, Sets)</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">78% • Strong</span>
                </div>
                <MasteryBar value={78} size="sm" showLabel={false} showPercentage={false} />
              </div>

              {/* OOP Gap */}
              <div className="p-4 bg-rose-50/90 dark:bg-[#180d10] rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="font-bold text-rose-950 dark:text-rose-200">Object-Oriented Programming (Classes & Inheritance)</span>
                  </div>
                  <span className="font-mono font-extrabold text-rose-600 dark:text-rose-400">34% • Needs Attention</span>
                </div>
                <MasteryBar value={34} size="sm" showLabel={false} showPercentage={false} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
