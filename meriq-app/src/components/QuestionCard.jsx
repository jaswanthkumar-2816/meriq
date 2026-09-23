import React from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionIndex,
  onSelectOption,
  onSkip,
  onSubmitNext,
  isLastQuestion
}) {
  if (!question) return null;

  // Format code snippets inside question if present
  const renderQuestionText = (text) => {
    if (text.includes('\n\n')) {
      const parts = text.split('\n\n');
      return (
        <div className="space-y-3">
          <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">{parts[0]}</p>
          <pre className="p-4 bg-slate-900 dark:bg-[#070709] text-slate-100 dark:text-neutral-100 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed border border-slate-800 dark:border-[#1c1c22]">
            <code>{parts.slice(1).join('\n\n')}</code>
          </pre>
        </div>
      );
    }
    return <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">{text}</p>;
  };

  const difficultyColors = {
    Beginner: 'bg-emerald-50 dark:bg-[#0f1f18] text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60',
    Intermediate: 'bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60',
    Advanced: 'bg-purple-50 dark:bg-[#191024] text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/60',
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1c1c22] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-6">
      {/* Question Header & Tags */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-[#1c1c22] pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-[#15151b] text-slate-700 dark:text-neutral-300 border border-transparent dark:border-[#22222a]">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {question.difficulty && (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${difficultyColors[question.difficulty] || 'bg-slate-100'}`}>
              {question.difficulty}
            </span>
          )}
        </div>

        {question.conceptName && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-neutral-400">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Assessing: <strong className="text-slate-800 dark:text-neutral-200">{question.conceptName}</strong></span>
          </div>
        )}
      </div>

      {/* Question Body */}
      <div>{renderQuestionText(question.question)}</div>

      {/* Answer Options */}
      <div className="space-y-3 pt-2">
        {question.options?.map((optionText, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 group ${
                isSelected
                  ? 'bg-amber-50/80 dark:bg-[#1a1508] border-amber-500 ring-2 ring-amber-500/25 shadow-sm'
                  : 'bg-white dark:bg-[#0c0c0f] border-slate-200/80 dark:border-[#1c1c22] hover:border-amber-300 dark:hover:border-amber-500/40 hover:bg-slate-50/60 dark:hover:bg-[#141419]'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-400 text-black'
                      : 'bg-slate-100 dark:bg-[#16161c] text-slate-600 dark:text-neutral-300 group-hover:bg-slate-200 dark:group-hover:bg-[#22222a]'
                  }`}
                >
                  {letter}
                </span>
                <span className={`text-xs sm:text-sm font-medium leading-relaxed ${
                  isSelected ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-neutral-300'
                }`}>
                  {optionText}
                </span>
              </div>

              <div className="shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-400 text-black'
                      : 'border-slate-300 dark:border-[#2b2b35] bg-white dark:bg-[#0c0c0f]'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#1c1c22]">
        <button
          onClick={onSkip}
          className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          Skip Question
        </button>

        <button
          onClick={onSubmitNext}
          disabled={selectedOptionIndex === null || selectedOptionIndex === undefined}
          className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
            selectedOptionIndex !== null && selectedOptionIndex !== undefined
              ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 text-black shadow-amber-500/25 hover:shadow-md active:scale-95'
              : 'bg-slate-300 dark:bg-[#16161c] text-slate-500 dark:text-neutral-600 cursor-not-allowed opacity-70 border border-transparent dark:border-[#22222a]'
          }`}
        >
          {isLastQuestion ? 'Complete Diagnostic & See Profile' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}
