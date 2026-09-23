import React from 'react';

export default function MasteryBar({ 
  value = 0, 
  size = 'md', 
  showLabel = true, 
  showPercentage = true,
  className = '' 
}) {
  const clampedValue = Math.min(100, Math.max(0, value));

  // Determine status color scheme: Mastered (Emerald), Strong (Gold), Developing (Bronze/Amber), Needs Attention (Rose)
  let colorClass = 'bg-rose-500';
  let badgeBg = 'bg-rose-50 dark:bg-[#180d10] text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60';
  let statusText = 'Needs Attention';

  if (clampedValue >= 90) {
    colorClass = 'bg-emerald-500';
    badgeBg = 'bg-emerald-50 dark:bg-[#0f1f18] text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60';
    statusText = 'Mastered';
  } else if (clampedValue >= 70) {
    colorClass = 'bg-amber-400';
    badgeBg = 'bg-amber-50 dark:bg-[#1c1608] text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60';
    statusText = 'Strong';
  } else if (clampedValue >= 40) {
    colorClass = 'bg-amber-600';
    badgeBg = 'bg-amber-50/60 dark:bg-[#161208] text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-900/40';
    statusText = 'Developing';
  }

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || showPercentage) && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          {showLabel && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeBg}`}>
              {statusText}
            </span>
          )}
          {showPercentage && (
            <span className="font-mono font-bold text-slate-700 dark:text-neutral-200 ml-auto">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div className={`w-full bg-slate-100 dark:bg-[#16161c] rounded-full overflow-hidden ${heightClasses[size] || heightClasses.md} p-0.5`}>
        <div
          className={`${heightClasses[size] || heightClasses.md} rounded-full transition-all duration-700 ease-out ${colorClass}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
