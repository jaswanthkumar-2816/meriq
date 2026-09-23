import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, GitFork } from 'lucide-react';

export default function LoadingState({
  title = 'Building your Skill Intelligence Map...',
  subtitle = 'Structuring concept hierarchy and prerequisite relationships.',
  steps = [
    'Mapping core concept nodes & domains...',
    'Analyzing prerequisite dependencies...',
    'Synthesizing diagnostic assessment matrix...',
    'Retrieving explainable targeted learning paths...'
  ],
  onComplete
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 500);
        }
        return prev;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [steps, onComplete]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Brand Icon */}
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-amber-50 dark:bg-[#1a1608] border border-amber-200 dark:border-amber-900/60 flex items-center justify-center text-amber-500">
          <GitFork className="w-8 h-8 animate-pulse text-amber-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-black">
            <Sparkles className="w-2.5 h-2.5 fill-current" />
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Dynamic Multi-Step Progress Tracker */}
        <div className="space-y-2.5 text-left bg-slate-50 dark:bg-[#121216] p-4 rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
          {steps.map((step, idx) => {
            const isFinished = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {isFinished ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-neutral-700 shrink-0" />
                )}
                <span className={`font-medium ${
                  isCurrent ? 'text-amber-600 dark:text-amber-400 font-bold' : isFinished ? 'text-slate-700 dark:text-neutral-300' : 'text-slate-400 dark:text-neutral-500'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
          MERIQ Adaptive Engine Active
        </div>
      </div>
    </div>
  );
}
