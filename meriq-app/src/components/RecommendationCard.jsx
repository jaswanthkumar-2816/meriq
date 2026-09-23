import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { isResourceLearned } from '../api/recommendations';

export default function RecommendationCard({ resource, index, skillId }) {
  const navigate = useNavigate();
  const isLearned = isResourceLearned(resource.id);

  const handleStartLearning = () => {
    navigate(`/learning/${skillId}/${resource.id}`);
  };

  return (
    <div className={`bg-white dark:bg-[#0a0a0d] rounded-3xl border transition-all p-6 sm:p-7 relative flex flex-col justify-between ${
      isLearned
        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
        : 'border-slate-200/90 dark:border-[#1c1c22] hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-card-hover dark:hover:shadow-card-hover-dark'
    }`}>
      {/* Top Meta Bar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Index & Badge */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-mono text-xs font-extrabold flex items-center justify-center shadow-sm shadow-amber-500/20">
              0{index + 1}
            </span>
            {resource.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                {resource.badge}
              </span>
            )}
            {isLearned && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-[#0f1f18] text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Learned
              </span>
            )}
          </div>

          {/* Explainability Metrics: Match & Difficulty */}
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {resource.matchScore}% Match
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-[#14141a] text-slate-600 dark:text-neutral-300 border border-transparent dark:border-[#22222a]">
              {resource.difficulty}
            </span>
          </div>
        </div>

        {/* Title & Source */}
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {resource.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400 mt-1">
            <span className="font-semibold text-slate-700 dark:text-neutral-300">{resource.source}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {resource.duration}
            </span>
          </div>
        </div>

        {/* Covered Concepts Chips */}
        {resource.coveredConcepts && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
              Targeted Concepts Covered:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {resource.coveredConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100/90 dark:bg-[#121216] text-slate-700 dark:text-neutral-300 text-xs font-semibold flex items-center gap-1 border border-transparent dark:border-[#1e1e26]"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Explainability Callout: Why MERIQ Recommends This */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-[#1a1608] border border-amber-200/80 dark:border-amber-900/60 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Why MERIQ Recommends This
          </div>
          <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
            {resource.whyRecommended}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-5 border-t border-slate-100 dark:border-[#1c1c22] mt-5">
        <button
          onClick={handleStartLearning}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-sm ${
            isLearned
              ? 'bg-slate-100 dark:bg-[#15151b] text-slate-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1f1f26] border border-transparent dark:border-[#22222a]'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 text-black shadow-amber-500/25 hover:shadow-md active:scale-95'
          }`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isLearned ? 'Review Resource Again' : 'Start Targeted Learning'}</span>
        </button>
      </div>
    </div>
  );
}
