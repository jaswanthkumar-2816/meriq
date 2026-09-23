import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  BookOpen, 
  User, 
  Briefcase, 
  TrendingUp, 
  Cpu, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { useSkill } from '../context/SkillContext';

export default function Screening() {
  const { showToast } = useSkill();
  const [selectedRole, setSelectedRole] = useState('python-backend');
  const [sampleCandidateId, setSampleCandidateId] = useState('RES-0001');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const roles = [
    { id: 'python-backend', title: 'Senior Python Backend Engineer', category: 'Backend' },
    { id: 'fullstack-react', title: 'Full Stack React & Node Developer', category: 'Full Stack' },
    { id: 'ai-ml-engineer', title: 'Data Scientist & AI/ML Engineer', category: 'AI / ML' },
    { id: 'devops-cloud', title: 'Cloud & DevOps Solutions Architect', category: 'Cloud / DevOps' }
  ];

  // Screen pre-loaded candidate on initial load
  useEffect(() => {
    handleScreenCandidate('RES-0001', selectedRole);
  }, []);

  const handleScreenCandidate = async (candidateId, roleId) => {
    setUploading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8001/api/screening/analyze-candidate/${candidateId}?role_id=${roleId}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Screening failed');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Candidate screening error', err);
      showToast('Error screening candidate. Ensure backend is running.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please upload a PDF format resume', 'error');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('role_id', selectedRole);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/screening/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('File screening failed');
      const data = await response.json();
      setResult(data);
      showToast('Resume analyzed & screened successfully!', 'success');
    } catch (err) {
      console.error('Upload screening error', err);
      showToast('Could not extract text from uploaded PDF', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Review 2: AI Resume Screening & Semantic Match Engine" 
          subtitle="NLP entity extraction, multi-factor semantic alignment, and adaptive upskilling prescriptions."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Review 2 Deliverable: NLP Screening Engine
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Intelligent Resume Screening & Candidate Diagnosis
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  Upload any candidate resume to extract structured technical skills, calculate semantic similarity against target job requirements, and prescribe adaptive learning paths.
                </p>

                {/* Sub-Navigation Switcher */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-extrabold shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Deep PDF Diagnostic & Upskilling</span>
                  </div>
                  <Link
                    to="/resume-screening"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] text-slate-700 dark:text-neutral-300 text-xs font-bold border border-slate-200 dark:border-[#22222a] transition-all"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                    <span>Batch ATS Screener & Leaderboard →</span>
                  </Link>
                  <Link
                    to="/resumes"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] text-slate-700 dark:text-neutral-300 text-xs font-bold border border-slate-200 dark:border-[#22222a] transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>1,000 Resumes Dataset →</span>
                  </Link>
                </div>
              </div>

              {/* Role Selector */}
              <div className="flex flex-col gap-1.5 min-w-[240px]">
                <label className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                  Target Benchmark Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    if (sampleCandidateId) {
                      handleScreenCandidate(sampleCandidateId, e.target.value);
                    }
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#141419] border border-slate-200 dark:border-[#1e1e26] text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-amber-400"
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Upload & Quick Candidate Screening Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Zone */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Upload Candidate Resume (PDF)
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Extracts text, identifies skills, and computes match score in real time.
                  </p>
                </div>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-amber-400 bg-amber-50/50 dark:bg-[#1a1608]'
                    : 'border-slate-200 dark:border-[#1e1e26] hover:border-amber-400/60 bg-slate-50/50 dark:bg-[#0d0d10]'
                }`}
                onClick={() => document.getElementById('resume-file-input').click()}
              >
                <input
                  id="resume-file-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-500 mx-auto flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">
                  Drop candidate PDF resume here, or <span className="text-amber-500 underline">browse files</span>
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-neutral-500 mt-1">
                  Supports PDF format up to 10MB
                </p>
              </div>
            </div>

            {/* Quick Test with Pre-Loaded Candidates */}
            <div className="lg:col-span-1 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Or Test with Dataset Candidates
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-neutral-500 mt-0.5">
                  Select any profile from our 1,000 resumes corpus:
                </p>

                <div className="space-y-2 mt-4">
                  {[
                    { id: 'RES-0001', name: 'Sam Verma (12 yrs, Python/FastAPI)' },
                    { id: 'RES-0002', name: 'Ava Lopez (2 yrs, React/Node)' },
                    { id: 'RES-0003', name: 'Liam Patel (5 yrs, PyTorch/ML)' },
                    { id: 'RES-0004', name: 'Ananya Sharma (7 yrs, AWS/DevOps)' }
                  ].map((cand) => (
                    <button
                      key={cand.id}
                      onClick={() => {
                        setSampleCandidateId(cand.id);
                        handleScreenCandidate(cand.id, selectedRole);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        sampleCandidateId === cand.id
                          ? 'bg-amber-50 dark:bg-[#1a1608] border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                          : 'bg-slate-50 dark:bg-[#121216] border-slate-100 dark:border-[#1c1c22] text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#18181f]'
                      }`}
                    >
                      <div className="font-bold">{cand.id}</div>
                      <div className="text-[10px] text-slate-400 dark:text-neutral-400 truncate">{cand.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link to="/resumes" className="text-xs text-amber-500 hover:underline font-bold">
                  Browse All 1,000 Candidate Resumes →
                </Link>
              </div>
            </div>
          </div>

          {/* Screening Analysis Results */}
          {uploading ? (
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] p-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Parsing PDF & Performing NLP Analysis...</h3>
              <p className="text-xs text-slate-400">Extracting entities, tokenizing skills, and computing semantic cosine similarity...</p>
            </div>
          ) : result ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Score & Verdict Banner */}
              <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Screening Verdict: {result.verdict}
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {result.candidate.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">
                      Target Role: <strong className="text-slate-800 dark:text-neutral-200">{result.targetRole}</strong> • Experience: <strong className="text-amber-500">{result.candidate.yearsOfExperience} Years</strong>
                    </p>
                  </div>

                  {/* Overall Match Circle / Score */}
                  <div className="p-6 bg-slate-900 dark:bg-[#050507] text-white rounded-3xl text-center md:min-w-[200px] shadow-lg border border-slate-800 dark:border-[#1a1a20]">
                    <div className="text-[10px] uppercase tracking-widest font-bold text-amber-400/90">
                      MERIQ Match Index
                    </div>
                    <div className="text-5xl font-extrabold font-mono text-amber-400 my-1">
                      {result.overallMatchScore}%
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300">
                      Multi-Factor Composite
                    </span>
                  </div>
                </div>

                {/* 3 Pillars Score Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
                  <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-1">
                    <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500">1. Skill Overlap Match</div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      {result.metrics.skillMatchScore}%
                    </div>
                    <span className="text-[10px] text-slate-400">Overlap with required technologies</span>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-1">
                    <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500">2. Semantic Similarity</div>
                    <div className="text-2xl font-extrabold font-mono text-amber-500 dark:text-amber-400">
                      {result.metrics.semanticRelevancyScore}%
                    </div>
                    <span className="text-[10px] text-slate-400">TF-IDF Vector Cosine Alignment</span>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-1">
                    <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500">3. Experience Fit</div>
                    <div className="text-2xl font-extrabold font-mono text-slate-800 dark:text-white">
                      {result.metrics.experienceFitScore}%
                    </div>
                    <span className="text-[10px] text-slate-400">Tenure & seniority alignment</span>
                  </div>
                </div>
              </div>

              {/* Skills Matrix: Matched vs Missing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Matched Required Competencies ({result.skillBreakdown.matchedSkills.length})
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.skillBreakdown.matchedSkills.map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-[#0f1f18] text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {s}
                      </span>
                    ))}
                  </div>

                  {result.skillBreakdown.additionalSkills.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 dark:border-[#1a1a20] space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Additional Detected Skills:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.skillBreakdown.additionalSkills.map((s, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Missing Skills / Gaps */}
                <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Missing Critical Requirements ({result.skillBreakdown.missingSkills.length})
                    </h4>
                  </div>

                  {result.skillBreakdown.missingSkills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {result.skillBreakdown.missingSkills.map((s, i) => (
                        <span key={i} className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 dark:bg-[#180d10] text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600 font-semibold">100% of required competencies were detected!</p>
                  )}

                  <p className="text-[11px] text-slate-400 dark:text-neutral-400 pt-2 border-t border-slate-100 dark:border-[#1a1a20]">
                    MERIQ automatically synthesizes adaptive micro-learning paths for these exact missing competencies below.
                  </p>
                </div>
              </div>

              {/* Adaptive Learning Prescriptions (The Bridge between Screening & Learning) */}
              <div className="bg-amber-50/70 dark:bg-[#181308] border border-amber-200 dark:border-amber-900/60 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-[#251b0a] text-amber-700 dark:text-amber-300 flex items-center justify-center">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                        Closed-Loop Candidate Upskilling
                      </span>
                      <h3 className="text-lg font-extrabold text-amber-950 dark:text-amber-100">
                        Prescribed Adaptive Learning Pathways
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-white/80 dark:bg-[#201507] px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-900/60">
                    Review 2 Innovation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.adaptivePrescriptions.map((p, i) => (
                    <div key={i} className="p-4 bg-white dark:bg-[#0c0c0f] rounded-2xl border border-amber-200/80 dark:border-amber-900/60 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-slate-900 dark:text-white">{p.skill}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            Urgency: {p.urgency}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1">{p.learningPath}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-[#1a1a20] flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">Est: ~{p.estimatedHours}h to master</span>
                        <Link
                          to={p.diagnosticLink}
                          className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          <span>Diagnose & Upskill</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}
