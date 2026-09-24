import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Clock,
  Layers,
  Award,
  Zap,
  RotateCcw,
  Code2,
  FileText
} from 'lucide-react';
import { useSkill } from '../context/SkillContext';

// Benchmark candidate pool for fast head-to-head comparison
const BENCHMARK_CANDIDATES = [
  {
    candidateId: 'RES-0001',
    name: 'Sam Verma',
    role: 'Senior Python Backend Engineer',
    category: 'Backend',
    yearsOfExperience: 12,
    education: { degree: 'B.Tech Computer Science', university: 'Stanford University', year: '2014', gpa: '3.9/4.0' },
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Celery', 'Microservices'],
    projects: ['High-Throughput Microservice Gateway in FastAPI & Redis', 'Distributed Financial Ledger Pipeline'],
    matchScore: 94,
    metrics: { skillMatch: 95, semanticFit: 92, experienceFit: 100, projectDepth: 90 },
    summary: 'Distinguished backend specialist with over a decade of production architecture in distributed high-throughput services.'
  },
  {
    candidateId: 'RES-0002',
    name: 'Alex Chen',
    role: 'Full Stack React & Node Developer',
    category: 'Full Stack',
    yearsOfExperience: 3.5,
    education: { degree: 'B.S. Computer Science', university: 'UC Berkeley', year: '2021', gpa: '3.8/4.0' },
    skills: ['React 18', 'TypeScript', 'Node.js', 'Express', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    projects: ['Real-Time Collaborative Canvas with WebSockets', 'Headless E-Commerce Storefront'],
    matchScore: 82,
    metrics: { skillMatch: 80, semanticFit: 84, experienceFit: 80, projectDepth: 85 },
    summary: 'High-velocity full-stack engineer with exceptional reactive frontend craftsmanship and modern Node microservices.'
  },
  {
    candidateId: 'RES-0003',
    name: 'Pooja Iyer',
    role: 'Data Scientist & AI/ML Engineer',
    category: 'AI / ML',
    yearsOfExperience: 4,
    education: { degree: 'M.S. Artificial Intelligence', university: 'Carnegie Mellon University', year: '2022', gpa: '3.95/4.0' },
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'NLP', 'LLMs', 'LangChain', 'Docker'],
    projects: ['Enterprise RAG Engine with Milvus & LangChain', 'Multi-Modal Vision Transformer'],
    matchScore: 88,
    metrics: { skillMatch: 88, semanticFit: 90, experienceFit: 85, projectDepth: 90 },
    summary: 'Deep learning specialist focused on transformer embeddings, retrieval-augmented pipelines, and production inference.'
  },
  {
    candidateId: 'RES-0004',
    name: 'Jordan Smith',
    role: 'Cloud & DevOps Solutions Architect',
    category: 'Cloud / DevOps',
    yearsOfExperience: 5,
    education: { degree: 'B.Tech Information Technology', university: 'Georgia Tech', year: '2020', gpa: '3.7/4.0' },
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'Grafana', 'Linux'],
    projects: ['Multi-Region Zero-Downtime Kubernetes Mesh', 'GitOps Infrastructure-as-Code Baseline'],
    matchScore: 78,
    metrics: { skillMatch: 75, semanticFit: 78, experienceFit: 85, projectDepth: 80 },
    summary: 'Infrastructure architect specializing in automated Kubernetes clusters, multi-region AWS footprints, and observability.'
  }
];

export default function Compare() {
  const { showToast } = useSkill();
  const [candidateAId, setCandidateAId] = useState('RES-0001');
  const [candidateBId, setCandidateBId] = useState('RES-0002');
  const [candidateCId, setCandidateCId] = useState('RES-0003');
  const [includeThird, setIncludeThird] = useState(false);

  const candA = BENCHMARK_CANDIDATES.find((c) => c.candidateId === candidateAId) || BENCHMARK_CANDIDATES[0];
  const candB = BENCHMARK_CANDIDATES.find((c) => c.candidateId === candidateBId) || BENCHMARK_CANDIDATES[1];
  const candC = BENCHMARK_CANDIDATES.find((c) => c.candidateId === candidateCId) || BENCHMARK_CANDIDATES[2];

  const activeCandidates = includeThird ? [candA, candB, candC] : [candA, candB];

  // Compute shared and unique skills
  const allSkills = Array.from(new Set(activeCandidates.flatMap((c) => c.skills)));
  const sharedSkills = allSkills.filter((skill) =>
    activeCandidates.every((c) => c.skills.includes(skill))
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar
          title="Candidate Head-to-Head Comparison Matrix"
          subtitle="Side-by-side candidate intelligence, technical skill differential analysis, and comparative hiring synthesis."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Feature 1: Multi-Candidate Decision Matrix
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Head-to-Head Candidate Evaluation
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  Evaluate top contenders side-by-side. Compare multi-factor scoring pillars, detect unique technical differentiators, and review automated AI hiring recommendations.
                </p>
              </div>

              {/* 3-Candidate Toggle Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIncludeThird(!includeThird)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all flex items-center gap-2 ${
                    includeThird
                      ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#22222a] hover:bg-slate-200 dark:hover:bg-[#1c1c22]'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>{includeThird ? 'Comparing 3 Candidates' : '+ Compare 3rd Candidate'}</span>
                </button>
              </div>
            </div>

            {/* Candidate Selector Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1.5">
                  Candidate A:
                </label>
                <select
                  value={candidateAId}
                  onChange={(e) => setCandidateAId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                >
                  {BENCHMARK_CANDIDATES.map((c) => (
                    <option key={c.candidateId} value={c.candidateId} disabled={c.candidateId === candidateBId || c.candidateId === candidateCId}>
                      {c.candidateId} — {c.name} ({c.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1.5">
                  Candidate B:
                </label>
                <select
                  value={candidateBId}
                  onChange={(e) => setCandidateBId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                >
                  {BENCHMARK_CANDIDATES.map((c) => (
                    <option key={c.candidateId} value={c.candidateId} disabled={c.candidateId === candidateAId || c.candidateId === candidateCId}>
                      {c.candidateId} — {c.name} ({c.role})
                    </option>
                  ))}
                </select>
              </div>

              {includeThird && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 block mb-1.5">
                    Candidate C:
                  </label>
                  <select
                    value={candidateCId}
                    onChange={(e) => setCandidateCId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                  >
                    {BENCHMARK_CANDIDATES.map((c) => (
                      <option key={c.candidateId} value={c.candidateId} disabled={c.candidateId === candidateAId || c.candidateId === candidateBId}>
                        {c.candidateId} — {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className={`grid grid-cols-1 ${includeThird ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
            {activeCandidates.map((cand, idx) => (
              <div
                key={cand.candidateId}
                className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 space-y-6 flex flex-col justify-between hover:border-amber-400/60 transition-all"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-extrabold text-amber-500 bg-amber-50 dark:bg-[#1a1608] px-2.5 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/60">
                          {cand.candidateId}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase">
                          Candidate {String.fromCharCode(65 + idx)}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {cand.name}
                      </h3>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-0.5">
                        {cand.role}
                      </p>
                    </div>

                    {/* Overall Score */}
                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-[#1a1608] border border-amber-200/60 dark:border-amber-900/60 text-right shrink-0">
                      <div className="text-[9px] uppercase font-bold text-slate-400 dark:text-neutral-500">Match Index</div>
                      <div className="text-2xl font-extrabold font-mono text-amber-500 dark:text-amber-400 leading-tight">
                        {cand.matchScore}%
                      </div>
                    </div>
                  </div>

                  {/* Summary paragraph */}
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed italic">
                    "{cand.summary}"
                  </p>

                  {/* 4 Pillars Breakdown Metrics */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                      Evaluation Pillars
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-600 dark:text-neutral-400">Skill Competency Overlap</span>
                          <span className="font-mono text-emerald-500">{cand.metrics.skillMatch}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-[#1c1c24] rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${cand.metrics.skillMatch}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-600 dark:text-neutral-400">Semantic TF-IDF Fit</span>
                          <span className="font-mono text-amber-500">{cand.metrics.semanticFit}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-[#1c1c24] rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${cand.metrics.semanticFit}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-600 dark:text-neutral-400">Experience Alignment</span>
                          <span className="font-mono text-amber-500">{cand.metrics.experienceFit}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-[#1c1c24] rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${cand.metrics.experienceFit}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Profile Stats */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-100 dark:border-[#1e1e26] space-y-0.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> Experience
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                        {cand.yearsOfExperience} Years
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-100 dark:border-[#1e1e26] space-y-0.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                        <FolderGit2 className="w-3 h-3 text-amber-500" /> Projects
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                        {cand.projects.length} Verified
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                      Core Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cand.skills.map((s, sIdx) => {
                        const isShared = sharedSkills.includes(s);
                        return (
                          <span
                            key={sIdx}
                            className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                              isShared
                                ? 'bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-900/60 font-bold'
                                : 'bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300 border border-slate-200/50 dark:border-[#22222a]'
                            }`}
                          >
                            {s} {isShared && '★'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-[#1a1a20] flex items-center justify-between gap-3">
                  <Link
                    to={`/assessment/python`}
                    className="w-full text-center py-2.5 px-3 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-sm transition-all"
                  >
                    Diagnose Skills →
                  </Link>
                  <Link
                    to={`/resumes`}
                    className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] border border-slate-200 dark:border-[#22222a] shrink-0"
                    title="View candidate details in 1,000 resume dataset"
                  >
                    <FileText className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* AI Comparative Hiring Recommendation */}
          <div className="bg-gradient-to-br from-amber-500/10 via-[#0a0a0d] to-black rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-amber-500 font-extrabold text-sm uppercase tracking-wider">
              <Award className="w-5 h-5" />
              <span>MERIQ AI Comparative Hiring Recommendation</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
              <p>
                <strong>Comparative Verdict:</strong> If the primary business mandate requires <em>immediate leadership in high-throughput distributed microservices</em> with low latency guarantees, <strong>{candA.name} ({candA.candidateId})</strong> is the recommended choice with a superior <strong>{candA.matchScore}% Match Index</strong> and {candA.yearsOfExperience} years of specialized systems architecture.
              </p>
              <p>
                Conversely, for a dynamic product engineering role demanding <em>rapid feature iteration across reactive frontend and API boundaries</em>, <strong>{candB.name} ({candB.candidateId})</strong> represents a strong cultural and technical fit with verified depth across modern React 18, Next.js, and TypeScript pipelines.
              </p>
              {includeThird && (
                <p>
                  <strong>{candC.name} ({candC.candidateId})</strong> delivers specialized differentiation if the enterprise is integrating <em>RAG-based AI search or neural transformer pipelines</em> into its core offering.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-amber-500/20 text-xs">
              <span className="text-amber-500 font-bold">★ Starred Skills = Shared by All Compared Candidates</span>
              <span className="text-slate-400">• Unstarred Skills = Unique Distinctive Competencies</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
