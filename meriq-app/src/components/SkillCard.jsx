import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GitFork, 
  Target, 
  Terminal, 
  Atom, 
  Database, 
  BrainCircuit, 
  Code2, 
  Cloud, 
  LineChart, 
  Container,
  Cpu
} from 'lucide-react';
import MasteryBar from './MasteryBar';
import { useSkill } from '../context/SkillContext';

const iconMap = {
  Terminal,
  Atom,
  Database,
  BrainCircuit,
  Code2,
  Cloud,
  LineChart,
  Container,
  Cpu,
};

export default function SkillCard({ skill }) {
  const navigate = useNavigate();
  const { setActiveSkillId } = useSkill();

  const IconComponent = iconMap[skill.icon] || Cpu;

  const handleSelectSkill = () => {
    setActiveSkillId(skill.id);
    navigate(`/skills/${skill.id}`);
  };

  const handleStartDiagnostic = (e) => {
    e.stopPropagation();
    setActiveSkillId(skill.id);
    navigate(`/assessment/${skill.id}`);
  };

  return (
    <div
      onClick={handleSelectSkill}
      className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1c1c22] hover:border-amber-400 dark:hover:border-amber-500/50 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all p-6 flex flex-col justify-between group cursor-pointer"
    >
      {/* Top Details */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-extrabold flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6 text-black" />
          </div>
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#15151b] text-slate-700 dark:text-neutral-300 border border-transparent dark:border-[#22222a]">
            {skill.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {skill.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Knowledge Mastery Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#1c1c22]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-neutral-400">Overall Knowledge</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{skill.overallMastery ?? 50}%</span>
          </div>
          <MasteryBar value={skill.overallMastery ?? 50} size="sm" showLabel={false} showPercentage={false} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 bg-slate-50 dark:bg-[#121216] rounded-xl border border-slate-100 dark:border-[#1c1c22]">
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase">Concepts</div>
            <div className="font-bold text-slate-800 dark:text-neutral-200 font-mono mt-0.5">{skill.totalConcepts || 14} mapped</div>
          </div>
          <div className="p-2.5 bg-slate-50 dark:bg-[#121216] rounded-xl border border-slate-100 dark:border-[#1c1c22]">
            <div className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold uppercase">Last Test</div>
            <div className="font-bold text-slate-800 dark:text-neutral-200 mt-0.5">{skill.lastDiagnosed || 'Not tested'}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 border-t border-slate-100 dark:border-[#1c1c22] mt-5 grid grid-cols-2 gap-2">
        <button
          onClick={handleSelectSkill}
          className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#15151b] hover:bg-slate-200 dark:hover:bg-[#1f1f26] transition-colors flex items-center justify-center gap-1.5 border border-transparent dark:border-[#22222a]"
        >
          <GitFork className="w-3.5 h-3.5" />
          <span>Skill Map</span>
        </button>

        <button
          onClick={handleStartDiagnostic}
          className="py-2.5 px-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/25 transition-all flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Diagnose</span>
        </button>
      </div>
    </div>
  );
}
