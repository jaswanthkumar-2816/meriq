import React from 'react';
import { ChevronRight, ChevronDown, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';

export default function ConceptNode({ 
  node, 
  onSelect, 
  isSelected = false,
  isExpanded = true,
  onToggleExpand,
  level = 0
}) {
  const mastery = node.mastery ?? 50;

  // Status visual badge: Mastered (Emerald), Strong (Gold), Developing (Bronze/Amber), Gap (Rose)
  let statusBadge = {
    label: 'Needs Attention',
    bg: 'bg-rose-50 dark:bg-[#180d10] text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60',
    dot: 'bg-rose-500',
    icon: AlertCircle
  };

  if (mastery >= 90) {
    statusBadge = {
      label: 'Mastered',
      bg: 'bg-emerald-50 dark:bg-[#0f1f18] text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
      dot: 'bg-emerald-500',
      icon: CheckCircle2
    };
  } else if (mastery >= 70) {
    statusBadge = {
      label: 'Strong',
      bg: 'bg-amber-50 dark:bg-[#1c1608] text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
      dot: 'bg-amber-400',
      icon: Sparkles
    };
  } else if (mastery >= 40) {
    statusBadge = {
      label: 'Developing',
      bg: 'bg-amber-50/60 dark:bg-[#151108] text-amber-600/90 dark:text-amber-400/90 border-amber-200/60 dark:border-amber-900/40',
      dot: 'bg-amber-600',
      icon: Clock
    };
  }

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      onClick={() => onSelect(node)}
      className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
        isSelected
          ? 'bg-amber-50/70 dark:bg-[#1a1508] border-amber-500 ring-2 ring-amber-500/30 shadow-md shadow-amber-500/10'
          : 'bg-white dark:bg-[#0c0c0f] border-slate-200/80 dark:border-[#1c1c22] hover:border-amber-300 dark:hover:border-amber-500/40 hover:shadow-card dark:hover:shadow-card-dark'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Expand toggle + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleExpand) onToggleExpand(node.id);
              }}
              className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#16161c] hover:bg-slate-200 dark:hover:bg-[#202028] flex items-center justify-center text-slate-600 dark:text-neutral-300 transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${statusBadge.dot} shrink-0`} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {node.name}
              </h4>
            </div>
            {node.difficulty && (
              <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-medium ml-4">
                {node.difficulty}
              </span>
            )}
          </div>
        </div>

        {/* Right: Status Pill & Percentage */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border hidden sm:inline-flex items-center gap-1 ${statusBadge.bg}`}>
            {statusBadge.label}
          </span>
          <div className="w-12 text-right font-mono font-bold text-xs text-slate-800 dark:text-neutral-200">
            {mastery}%
          </div>
        </div>
      </div>

      {/* Mini Progress Bar Underneath */}
      <div className="w-full bg-slate-100 dark:bg-[#16161c] h-1 rounded-full mt-2.5 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${statusBadge.dot}`}
          style={{ width: `${mastery}%` }}
        />
      </div>
    </div>
  );
}
