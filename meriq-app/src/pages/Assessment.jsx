import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import QuestionCard from '../components/QuestionCard';
import LoadingState from '../components/LoadingState';
import { ArrowLeft } from 'lucide-react';
import { getDiagnosticAssessment, evaluateDiagnostic } from '../api/assessment';
import { useSkill } from '../context/SkillContext';

export default function Assessment() {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { setActiveSkillId } = useSkill();

  const [assessmentData, setAssessmentData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);

  const currentSkillId = skillId || 'python';

  useEffect(() => {
    setActiveSkillId(currentSkillId);
    setLoading(true);

    getDiagnosticAssessment(currentSkillId)
      .then((data) => {
        setAssessmentData(data);
      })
      .catch((err) => {
        console.error('Failed to load diagnostic assessment', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentSkillId, setActiveSkillId]);

  const questions = assessmentData?.questions || [];
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
      handleSubmitAssessment();
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = async () => {
    setEvaluating(true);
    try {
      await evaluateDiagnostic(currentSkillId, userAnswers);
      navigate(`/assessment-result/${currentSkillId}`);
    } catch (err) {
      console.error('Failed to evaluate diagnostic', err);
      navigate(`/assessment-result/${currentSkillId}`);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar title="Preparing Diagnostic Assessment" />
          <LoadingState
            title={`Generating ${currentSkillId.toUpperCase()} Concept Diagnostic`}
            subtitle="Selecting adaptive concept-level probes across all domain branches..."
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
          <Topbar title="Synthesizing Knowledge Profile" />
          <LoadingState
            title="Evaluating Knowledge Evidence"
            subtitle="Computing concept mastery, isolating prerequisite blockers, and assembling targeted recommendations..."
            steps={[
              'Analyzing response patterns & difficulty weighting...',
              'Estimating concept-by-concept mastery levels...',
              'Isolating primary knowledge bottlenecks (e.g. OOP)...',
              'Finalizing your personalized skill profile...'
            ]}
          />
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col p-8">
          <Topbar title="Diagnostic Assessment" />
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 mt-12 border border-slate-200 dark:border-[#1a1a20]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Assessment Questions Available</h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Could not initialize questions for this skill.</p>
            <Link to="/skills" className="inline-block px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold rounded-xl shadow-sm">
              Return to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title={`${assessmentData.skillName} Diagnostic Assessment`} 
          subtitle="Adaptive concept-level testing to measure what you know and isolate weak areas."
        />

        <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
          {/* Top Progress & Navigation Bar */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  to={`/skills/${currentSkillId}`}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] flex items-center justify-center text-slate-600 dark:text-neutral-300 transition-colors border border-transparent dark:border-[#22222a]"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {assessmentData.skillName} Diagnostic
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Answered {answeredCount} of {totalQuestions} questions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-[#1a1608] px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60">
                  {progressPercent}% Completed
                </span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-[#16161c] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Interface */}
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
        </main>
      </div>
    </div>
  );
}
