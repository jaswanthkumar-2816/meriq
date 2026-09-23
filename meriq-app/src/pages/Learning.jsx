import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MasteryBar from '../components/MasteryBar';
import { 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles 
} from 'lucide-react';
import { getRecommendations, markResourceLearned, isResourceLearned } from '../api/recommendations';
import { useSkill } from '../context/SkillContext';

export default function Learning() {
  const { skillId, resourceId } = useParams();
  const navigate = useNavigate();
  const { setActiveSkillId, showToast } = useSkill();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLearned, setIsLearned] = useState(false);

  const currentSkillId = skillId || 'python';

  useEffect(() => {
    setActiveSkillId(currentSkillId);
    setLoading(true);

    getRecommendations(currentSkillId).then((res) => {
      const recs = res.recommendations || [];
      const found = recs.find(r => r.id === resourceId) || recs[0];
      setResource(found);
      if (found) {
        setIsLearned(isResourceLearned(found.id));
      }
    }).finally(() => {
      setLoading(false);
    });
  }, [currentSkillId, resourceId, setActiveSkillId]);

  const handleMarkAsLearned = async () => {
    if (resource) {
      await markResourceLearned(currentSkillId, resource.id);
      setIsLearned(true);
      showToast('Resource marked as completed! Take the verification retest to lock in your mastery.', 'success');
    }
  };

  const handleStartRetest = () => {
    navigate(`/retest/${currentSkillId}/py-inheritance`);
  };

  if (loading || !resource) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-neutral-400">Loading learning session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Focused Learning Station" 
          subtitle="Targeted concept instruction tailored to your diagnosed knowledge gap."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Back Link */}
          <div className="flex items-center gap-3">
            <Link
              to={`/recommendations/${currentSkillId}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-neutral-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learning Plan</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Cols: Video Player & Objectives */}
            <div className="lg:col-span-2 space-y-6">
              {/* Media Player Container */}
              <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 dark:border-[#1a1a20] aspect-video relative flex flex-col justify-between p-6">
                {resource.embedId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${resource.embedId}?autoplay=0&rel=0`}
                    title={resource.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-400 flex items-center justify-center">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-lg">{resource.title}</h4>
                      <p className="text-slate-400 dark:text-neutral-400 text-xs mt-1">{resource.source} • {resource.duration}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                      {resource.difficulty}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-neutral-500 font-medium">
                      {resource.source} • {resource.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {resource.title}
                  </h2>
                </div>

                {/* Explicit Learning Objective */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-[#1a1608] border border-amber-200/80 dark:border-amber-900/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Learning Objective
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-neutral-200 leading-relaxed">
                    {resource.learningObjective || 'After this resource, you should be able to explain inheritance and implement basic parent-child class relationships using super().'}
                  </p>
                </div>

                {/* Covered Concepts */}
                {resource.coveredConcepts && (
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1a1a20]">
                    <span className="text-xs font-bold text-slate-700 dark:text-neutral-200">Concepts Targeted in this Module:</span>
                    <div className="flex flex-wrap gap-2">
                      {resource.coveredConcepts.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-[#121216] text-slate-700 dark:text-neutral-300 rounded-xl text-xs font-medium flex items-center gap-1 border border-transparent dark:border-[#1e1e26]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Goal Panel & Verification Retest Trigger */}
            <div className="lg:col-span-1 space-y-6 sticky top-20">
              <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-6">
                <div className="border-b border-slate-100 dark:border-[#1a1a20] pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-neutral-500">
                    Target Mastery Goal
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    Inheritance & super()
                  </h3>
                </div>

                {/* Mastery Stats */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-rose-50 dark:bg-[#180d10] rounded-2xl border border-rose-100 dark:border-rose-900/60">
                      <div className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">Current</div>
                      <div className="text-xl font-extrabold font-mono text-rose-700 dark:text-rose-300">21%</div>
                    </div>
                    <div className="p-3 bg-emerald-50 dark:bg-[#0f1f18] rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
                      <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Target</div>
                      <div className="text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-300">70%</div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 dark:text-neutral-400">Module Completion</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-white">
                        {isLearned ? '100%' : '0%'}
                      </span>
                    </div>
                    <MasteryBar value={isLearned ? 100 : 0} size="sm" showLabel={false} showPercentage={false} />
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  {!isLearned ? (
                    <button
                      onClick={handleMarkAsLearned}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] transition-all flex items-center justify-center gap-2 border border-transparent dark:border-[#22222a]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Mark as Learned</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-50 dark:bg-[#0f1f18] rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Module Learned & Understood</span>
                    </div>
                  )}

                  <button
                    onClick={handleStartRetest}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Take Verification Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
