import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Sparkles, 
  ArrowRight, 
  Target, 
  BookOpen, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Zap
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-black text-slate-900 dark:text-white transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden border-b border-slate-200/70 dark:border-[#1a1a20] bg-gradient-to-b from-white via-slate-50/50 to-[#F8FAFC] dark:from-black dark:via-[#050505] dark:to-black">
        {/* Subtle geometric background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#d4af3710_1px,transparent_1px),linear-gradient(to_bottom,#d4af3710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Small Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#1a1608] border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span>ADAPTIVE SKILL INTELLIGENCE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Learn only what you <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500">
                don’t know.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
              MERIQ maps your skill, measures your current knowledge, finds the exact conceptual gaps, and recommends targeted resources to master what’s missing.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/skills"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all active:scale-[0.98]"
              >
                <span>Start Analysing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Visual: Simplified MERIQ Learning Flow */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8">
              <div className="text-[11px] uppercase tracking-widest font-extrabold text-amber-600 dark:text-amber-400 mb-4 text-center">
                The Adaptive Learning Architecture
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 items-center text-center">
                {/* Step 1 */}
                <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">1. Skill</span>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500">Select Topic</span>
                </div>

                {/* Step 2 */}
                <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">2. Diagnose</span>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500">Adaptive Test</span>
                </div>

                {/* Step 3 */}
                <div className="p-3 bg-rose-50 dark:bg-[#1f1013] rounded-2xl border border-rose-200/80 dark:border-rose-900/60 flex flex-col items-center ring-2 ring-rose-500/20">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-2">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-200">3. Find Gaps</span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">OOP 34%</span>
                </div>

                {/* Step 4 */}
                <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-[#211a12] text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">4. Learn</span>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500">22m Video</span>
                </div>

                {/* Step 5 */}
                <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 flex items-center justify-center mb-2">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-white">5. Retest</span>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500">3 Questions</span>
                </div>

                {/* Step 6 */}
                <div className="p-3 bg-emerald-50 dark:bg-[#0f1f18] rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">6. Master</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">74% (+53%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: How MERIQ Works */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-black border-b border-slate-200/70 dark:border-[#1a1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Systematic Learning Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How MERIQ Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-400">
              Four deterministic steps to eliminate blind spots without re-learning known concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 01 */}
            <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-[#0a0a0d] border border-slate-200/80 dark:border-[#1a1a20] space-y-4 hover:shadow-card dark:hover:shadow-card-dark transition-shadow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-neutral-700">01</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Choose a Skill</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Select Python, SQL, React, ML, or add any custom technology. MERIQ instantly constructs the hierarchical knowledge tree.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-[#0a0a0d] border border-slate-200/80 dark:border-[#1a1a20] space-y-4 hover:shadow-card dark:hover:shadow-card-dark transition-shadow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-neutral-700">02</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Diagnose Your Knowledge</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Take a rapid 10-question adaptive diagnostic. MERIQ analyzes concept-level evidence rather than a coarse single score.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-[#0a0a0d] border border-slate-200/80 dark:border-[#1a1a20] space-y-4 hover:shadow-card dark:hover:shadow-card-dark transition-shadow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-neutral-700">03</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Learn Your Weak Areas</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Receive explainable recommendations (e.g. 22-min Inheritance video) targeted exclusively at your detected knowledge gap.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-3xl bg-slate-50/80 dark:bg-[#0a0a0d] border border-slate-200/80 dark:border-[#1a1a20] space-y-4 hover:shadow-card dark:hover:shadow-card-dark transition-shadow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-300 dark:text-neutral-700">04</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-[#0f1f18] text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Retest & Improve</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Complete a 3-question focused retest to mathematically verify comprehension and lock in the mastery improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Skill Intelligence */}
      <section id="skill-intelligence" className="py-20 bg-[#F8FAFC] dark:bg-black border-b border-slate-200/70 dark:border-[#1a1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Narrative */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200/60 dark:border-amber-900/60">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Granular Concept Estimation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                MERIQ doesn’t treat a skill as a single score.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
                A traditional LMS tells you that you scored 65% in Python and tells you to restart the course. MERIQ identifies that you already understand Fundamentals (92%) and Control Flow (84%), isolating the true bottleneck to Object-Oriented Programming (34%).
              </p>
              <div className="pt-2">
                <Link
                  to="/skills/python"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>Explore Python Hierarchy Graph</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Breakdown */}
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Python Skill Map Diagnosis</span>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">5 Domains</span>
              </div>

              <div className="space-y-3.5 pt-2">
                {/* Concept 1 */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-slate-700 dark:text-neutral-200">Fundamentals</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">92% (Mastered)</span>
                </div>

                {/* Concept 2 */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-slate-700 dark:text-neutral-200">Control Flow & Loops</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">84% (Strong)</span>
                </div>

                {/* Concept 3 */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-slate-700 dark:text-neutral-200">Functions & Modules</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">71% (Strong)</span>
                </div>

                {/* Concept 4 */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-slate-700 dark:text-neutral-200">Data Structures</span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">78% (Strong)</span>
                </div>

                {/* Concept 5 - Detected Gap */}
                <div className="p-3 bg-rose-50 dark:bg-[#1a0f12] rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="font-bold text-rose-900 dark:text-rose-200">Object-Oriented Programming (OOP)</span>
                  </div>
                  <span className="font-mono font-extrabold text-rose-600 dark:text-rose-400">34% (Detected Gap)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Personalized Learning */}
      <section id="personalized-learning" className="py-20 bg-white dark:bg-black border-b border-slate-200/70 dark:border-[#1a1a20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Comparison Card */}
            <div className="bg-slate-900 dark:bg-[#070709] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800 dark:border-[#1a1a20]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Targeted Micro-Curriculum
                </span>
                <h3 className="text-xl font-extrabold mt-1">
                  Weak Area: Python → OOP → Inheritance
                </h3>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-slate-800/80 dark:bg-[#0e0e12] rounded-2xl border border-slate-700 dark:border-[#1e1e26] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center font-mono">
                      01
                    </span>
                    <div>
                      <div className="font-bold text-slate-100">Python Inheritance Fundamentals</div>
                      <div className="text-[11px] text-slate-400 dark:text-neutral-500">YouTube • Corey Schafer</div>
                    </div>
                  </div>
                  <span className="font-mono text-slate-300 dark:text-neutral-400">22 min</span>
                </div>

                <div className="p-3.5 bg-slate-800/80 dark:bg-[#0e0e12] rounded-2xl border border-slate-700 dark:border-[#1e1e26] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center font-mono">
                      02
                    </span>
                    <div>
                      <div className="font-bold text-slate-100">Inheritance Explained with Examples</div>
                      <div className="text-[11px] text-slate-400 dark:text-neutral-500">YouTube • ArjanCodes</div>
                    </div>
                  </div>
                  <span className="font-mono text-slate-300 dark:text-neutral-400">18 min</span>
                </div>

                <div className="p-3.5 bg-slate-800/80 dark:bg-[#0e0e12] rounded-2xl border border-slate-700 dark:border-[#1e1e26] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">
                      03
                    </span>
                    <div>
                      <div className="font-bold text-slate-100">Practice: OOP Coding Problems</div>
                      <div className="text-[11px] text-slate-400 dark:text-neutral-500">MERIQ Sandbox</div>
                    </div>
                  </div>
                  <span className="font-mono text-slate-300 dark:text-neutral-400">25 min</span>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-slate-400 dark:text-neutral-500">
                Total time to mastery: <strong className="text-amber-400 font-bold">65 minutes</strong> vs 8+ hours generic re-watch.
              </div>
            </div>

            {/* Right Narrative */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Precision Curriculum
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Instead of watching an 8-hour course…
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
                MERIQ identifies the exact concepts you need. Each resource is vetted with an explainable match score, prerequisite check, and explicit learning objective so you never waste time on redundant material.
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Explainable AI rationale</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>YouTube & Sandbox curation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stop learning everything. <br />
            <span className="text-amber-500 dark:text-amber-400">Start learning what matters.</span>
          </h2>
          <p className="text-slate-600 dark:text-neutral-400 text-sm sm:text-base max-w-lg mx-auto">
            Take your first 5-minute diagnostic now. Receive an actionable knowledge profile and personalized micro-curriculum.
          </p>
          <div className="pt-2">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all"
            >
              <span>Start Your Skill Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Research & Project Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-[#1a1a20] bg-white dark:bg-black py-8 text-xs text-slate-500 dark:text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-extrabold text-slate-900 dark:text-white">MERIQ</span>
            <span>— Intelligent Adaptive Skill Learning Platform</span>
          </div>
          <div>
            <span>Mini Project Review 1 • CSS7102 Adaptive Skill Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
