import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import QuestionCard from '../components/QuestionCard';
import LoadingState from '../components/LoadingState';
import { 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  TrendingUp, 
  GitFork,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getConceptRetest, evaluateRetest } from '../api/assessment';
import { useSkill } from '../context/SkillContext';

export default function Retest() {
  const { skillId, conceptId } = useParams();
  const navigate = useNavigate();
  const { setActiveSkillId, loadSkills, showToast } = useSkill();

  const [retestData, setRetestData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState(null);

  const currentSkillId = skillId || 'python';
  const currentConceptId = conceptId || 'py-inheritance';

  useEffect(() => {
    setActiveSkillId(currentSkillId);
    setLoading(true);

    getConceptRetest(currentSkillId, currentConceptId)
      .then((data) => {
        setRetestData(data);
      })
      .catch((err) => {
        console.error('Failed to load concept retest', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentSkillId, currentConceptId, setActiveSkillId]);

  const questions = retestData?.questions || [];
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleSelectOption = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleSkip = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitRetest();
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitRetest();
    }
  };

  const handleSubmitRetest = async () => {
    setEvaluating(true);
    try {
      const evaluation = await evaluateRetest(currentSkillId, currentConceptId, userAnswers);
      setResult(evaluation);
      await loadSkills();
      showToast('Knowledge verified! Mastery updated globally across MERIQ.', 'success');

      // Trigger celebratory confetti with gold particles
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f59e0b', '#10b981', '#ffffff']
        });
      } catch (e) {
        // Safe fallback
      }
    } catch (err) {
      console.error('Failed to evaluate retest', err);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar title="Preparing Concept Verification Retest" />
          <LoadingState
            title="Assembling Targeted Retest"
            subtitle="Synthesizing probe items strictly for Inheritance & super() Methods..."
          />
        </div>
      </div>
    );
  }

  if (evaluating) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar title="Verifying Knowledge Gain" />
          <LoadingState
            title="Evaluating Post-Learning Retest"
            subtitle="Quantifying delta improvement and updating global skill graph in cache..."
            steps={[
              'Validating post-learning response patterns...',
              'Calculating Before vs After mastery deltas...',
              'Updating concept node in persistent skill graph...',
              'Synchronizing learning analytics...'
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Targeted Concept Retest" 
          subtitle="Verification assessment strictly evaluating your targeted learning progress."
        />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          {!result ? (
            <>
              {/* Retest Header & Context */}
              <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/recommendations/${currentSkillId}`}
                      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] flex items-center justify-center text-slate-600 dark:text-neutral-300 transition-colors border border-transparent dark:border-[#22222a]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                        Concept Verification
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {retestData?.conceptName || 'Inheritance & super() Methods'}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-[#1a1608] px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60">
                    Question {currentIndex + 1} of {totalQuestions}
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-[#16161c] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  currentIndex={currentIndex}
                  totalQuestions={totalQuestions}
                  selectedOptionIndex={userAnswers[currentQuestion.id]}
                  onSelectOption={handleSelectOption}
                  onSkip={handleSkip}
                  onSubmitNext={handleNext}
                  isLastQuestion={currentIndex === totalQuestions - 1}
                />
              )}
            </>
          ) : (
            /* Post-Retest Verification Success View */
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-8 sm:p-10 space-y-8 text-center animate-in fade-in zoom-in-95 duration-200">
              {/* Badge & Trophy */}
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center mx-auto shadow-md shadow-amber-500/30">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-900/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Concept Mastery Achieved</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Significant Knowledge Improvement!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-md mx-auto">
                  Your verification test confirmed mastery of method overriding, class inheritance, and super() constructors.
                </p>
              </div>

              {/* Large Before vs After Improvement Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto items-center p-6 bg-slate-50 dark:bg-[#121216] rounded-3xl border border-slate-100 dark:border-[#1e1e26]">
                {/* Before */}
                <div className="p-3">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500">Before Diagnosis</div>
                  <div className="text-3xl font-extrabold font-mono text-slate-400 dark:text-neutral-400 mt-1">
                    {result.beforeScore}%
                  </div>
                  <span className="text-[10px] font-semibold text-rose-500">Critical Gap</span>
                </div>

                {/* Delta Badge */}
                <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 text-black font-extrabold rounded-2xl shadow-md flex flex-col items-center justify-center">
                  <TrendingUp className="w-5 h-5 mb-0.5 text-black" />
                  <span className="text-2xl font-extrabold font-mono leading-none">+{result.delta}%</span>
                  <span className="text-[9px] uppercase font-extrabold tracking-wider mt-1">Gain</span>
                </div>

                {/* After */}
                <div className="p-3">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500">Verified Now</div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                    {result.afterScore}%
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Strong Mastery</span>
                </div>
              </div>

              {/* Next Steps CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
                <button
                  onClick={() => navigate(`/skills/${currentSkillId}`)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 dark:text-neutral-200 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-[#22222a]"
                >
                  <GitFork className="w-4 h-4 text-amber-500" />
                  <span>View Updated Skill Map</span>
                </button>

                <button
                  onClick={() => navigate(`/progress`)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Continue to Progress Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
