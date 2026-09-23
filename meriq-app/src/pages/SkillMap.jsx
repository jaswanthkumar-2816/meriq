import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SkillGraph from '../components/SkillGraph';
import LoadingState from '../components/LoadingState';
import { 
  Target, 
  BookOpen, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { getSkillById } from '../api/skills';
import { useSkill } from '../context/SkillContext';

export default function SkillMap() {
  const { skillId } = useParams();
  const { setActiveSkillId } = useSkill();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentId = skillId || 'python';
    setActiveSkillId(currentId);
    setLoading(true);

    getSkillById(currentId)
      .then((data) => {
        setSkill(data);
      })
      .catch((err) => {
        console.error('Failed to load skill map', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [skillId, setActiveSkillId]);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar title="Loading Skill Graph" />
          <LoadingState
            title={`Loading ${skillId ? skillId.toUpperCase() : 'Python'} Skill Map`}
            subtitle="Checking MongoDB knowledge cache and structuring hierarchy branches..."
          />
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col p-8">
          <Topbar title="Skill Not Found" />
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 mt-12 border border-slate-200 dark:border-[#1a1a20]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Skill Map Not Found</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">The requested skill could not be loaded from cache.</p>
            <Link to="/skills" className="inline-block px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl">
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title={`Your ${skill.name} Skill Map`} 
          subtitle="Interactive knowledge graph detailing concept branches, mastery evidence, and detected gaps."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Breadcrumb & Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0a0a0d] p-6 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-neutral-500">
                <Link to="/skills" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Skills</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-amber-600 dark:text-amber-400 font-bold">{skill.name}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>{skill.name} Knowledge Architecture</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xl">
                {skill.description}
              </p>
            </div>

            {/* Main Action CTAs */}
            <div className="flex items-center gap-3">
              <Link
                to={`/recommendations/${skill.id}`}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] transition-colors flex items-center gap-1.5 border border-transparent dark:border-[#22222a]"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Learning Plan</span>
              </Link>

              <Link
                to={`/assessment/${skill.id}`}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Target className="w-4 h-4" />
                <span>Start Diagnostic Assessment</span>
              </Link>
            </div>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-[#0a0a0d] px-5 py-3 rounded-2xl border border-slate-200/80 dark:border-[#1a1a20] text-xs">
            <span className="font-bold text-slate-700 dark:text-neutral-200">Mastery Levels:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-600 dark:text-neutral-400"><strong>90%+</strong> Mastered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-600 dark:text-neutral-400"><strong>70–89%</strong> Strong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <span className="text-slate-600 dark:text-neutral-400"><strong>40–69%</strong> Developing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-600 dark:text-neutral-400"><strong>&lt; 40%</strong> Needs Attention</span>
            </div>
          </div>

          {/* Interactive Skill Graph & Inspector */}
          <SkillGraph 
            hierarchy={skill.hierarchy} 
            skillId={skill.id} 
            skillName={skill.name} 
          />
        </main>
      </div>
    </div>
  );
}
