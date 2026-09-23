import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import RecommendationCard from '../components/RecommendationCard';
import MasteryBar from '../components/MasteryBar';
import { 
  Sparkles, 
  AlertTriangle 
} from 'lucide-react';
import { getRecommendations } from '../api/recommendations';
import { useSkill } from '../context/SkillContext';

export default function Recommendations() {
  const { skillId } = useParams();
  const { setActiveSkillId } = useSkill();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentSkillId = skillId || 'python';

  useEffect(() => {
    setActiveSkillId(currentSkillId);
    setLoading(true);

    getRecommendations(currentSkillId)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error('Failed to load recommendations', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentSkillId, setActiveSkillId]);

  if (loading || !data) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-neutral-400">Loading personalized learning plan...</p>
        </div>
      </div>
    );
  }

  const { weakConcepts, recommendations } = data;

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Personalized Learning Plan" 
          subtitle="Targeted micro-curriculum based strictly on your diagnosed skill gaps."
        />

        <main className="p-6 max-w-6xl mx-auto w-full space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Explainable Recommendation Engine
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Your Personalized Learning Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400">
              {recommendations.length} resources selected specifically for your current knowledge. No generic beginner tutorials.
            </p>
          </div>

          {/* Weak Concepts Diagnostic Summary */}
          <div className="bg-rose-50/70 dark:bg-[#180d10] border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-rose-200/60 dark:border-rose-900/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                    Diagnosed Knowledge Gaps
                  </span>
                  <h3 className="text-lg font-extrabold text-rose-950 dark:text-rose-100">
                    Your Detected Learning Gaps ({weakConcepts.length})
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-300">
                Estimated Time: ~80 min
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {weakConcepts.map((gap, index) => (
                <div
                  key={gap.id}
                  className="bg-white dark:bg-[#0c0c0f] p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-sm space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-[#201014] text-rose-700 dark:text-rose-300 font-mono text-xs font-bold flex items-center justify-center">
                        0{index + 1}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-neutral-500 uppercase">
                        {gap.estimatedTime || '30 min'}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{gap.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2">
                      {gap.reason || 'Missing conceptual mental model.'}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#1c1c22]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Current: <strong className="text-rose-600 dark:text-rose-400 font-mono">{gap.currentMastery}%</strong></span>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Target: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{gap.targetMastery}%</strong></span>
                    </div>
                    <MasteryBar value={gap.currentMastery} size="sm" showLabel={false} showPercentage={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Recommendations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Targeted Learning Paths
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Curated to close your knowledge gaps in the shortest possible time.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((resource, idx) => (
                <RecommendationCard
                  key={resource.id}
                  resource={resource}
                  index={idx}
                  skillId={currentSkillId}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
