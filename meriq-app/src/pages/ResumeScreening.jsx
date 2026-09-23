import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import {
  Upload,
  FileText,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Clock,
  Search,
  Filter,
  Eye,
  X,
  ArrowRight,
  Layers,
  FileCode,
  Check,
  AlertCircle,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { screenResumes, getCandidatePdfUrl } from '../api/resumes';
import { useSkill } from '../context/SkillContext';

// Preset sample job descriptions for 1-click testing
const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Senior Python & FastAPI Engineer',
    category: 'Backend',
    text: `Job Title: Senior Python Backend Engineer
Location: Remote / Hybrid
Experience Required: 3+ years

Job Description:
We are looking for a Senior Python Backend Engineer to design and build scalable, high-throughput microservices.

Key Responsibilities:
- Develop robust RESTful APIs and asynchronous background task pipelines using FastAPI, Python, and Celery.
- Architect and optimize PostgreSQL databases, Redis caching layers, and database queries.
- Containerize services using Docker and deploy to AWS cloud infrastructure.
- Collaborate with frontend engineers to integrate web services and real-time WebSocket endpoints.

Required Qualifications & Skills:
- 3+ years of professional backend engineering experience with Python.
- Proven experience with FastAPI, Django, or Flask.
- Strong SQL proficiency with PostgreSQL or MySQL.
- In-depth knowledge of Redis, Docker, and REST API design.
- Bachelor's or Master's degree in Computer Science, Engineering, or related STEM field.
- Excellent project delivery track record and clean code practices.`
  },
  {
    title: 'Full Stack React & Node Developer',
    category: 'Full Stack',
    text: `Job Title: Full Stack React & Node Developer
Experience Required: 2+ years

We are hiring a Full Stack Developer to build modern interactive web platforms.

Responsibilities:
- Build responsive, accessible UI components using React 18, Next.js, and Tailwind CSS.
- Develop secure backend APIs using Node.js, Express, and TypeScript.
- Integrate MongoDB/PostgreSQL databases and third-party REST/GraphQL services.

Requirements:
- 2+ years of hands-on experience with React and Node.js.
- Strong proficiency in JavaScript/TypeScript, HTML5, CSS3, and Tailwind CSS.
- Familiarity with Git, CI/CD pipelines, and cloud deployments.
- Degree in Computer Science, IT, or equivalent practical portfolio.`
  },
  {
    title: 'AI / Machine Learning Engineer',
    category: 'AI / ML',
    text: `Job Title: AI / Machine Learning Engineer
Experience Required: 2+ years

Looking for an ML Engineer to build cutting-edge intelligent applications and RAG systems.

Requirements:
- 2+ years of experience with Python, PyTorch, TensorFlow, and Scikit-Learn.
- Practical experience with NLP, LLMs, LangChain, and RAG architectures.
- Experience with data pipelines using Pandas, NumPy, and Vector Databases.
- B.Tech/M.Tech in CSE, AI, or Data Science.`
  }
];

// Sample candidate text resumes for instant 1-click demo
const DEMO_RESUME_FILES = [
  {
    name: 'RES-0001_Sam_Verma.txt',
    content: `Sam Verma
Email: sam.verma@example.com | Phone: +1 (555) 019-2834 | San Francisco, CA
Title: Senior Python Backend Developer

Summary:
Senior Backend Engineer with 4 years of experience building high-throughput microservices in FastAPI, Python, and PostgreSQL.

Technical Skills:
Python, FastAPI, Django, PostgreSQL, Redis, Docker, REST APIs, Celery, AWS, SQL, Microservices, Git

Education:
B.Tech Computer Science & Engineering, Stanford University (2022) | GPA: 3.9/4.0

Experience:
Senior Backend Engineer at Stripe (2022 - Present)
- Designed high-throughput microservice gateway in FastAPI & Redis handling 25,000 req/sec.
- Implemented distributed Celery task pipeline for financial ledger reconciliation.

Projects:
1. High-Throughput Microservice Gateway in FastAPI & Redis
2. Distributed Task Pipeline for Real-Time Financial Ledger Processing
3. Event-Driven Telemetry Aggregation Service in Python & Docker`
  },
  {
    name: 'RES-0002_Alex_Chen.txt',
    content: `Alex Chen
Email: alex.chen@example.com | Phone: +1 (555) 024-9182 | New York, NY
Title: Full Stack React & Node Developer

Summary:
Full Stack Developer with 3.5 years of experience building modern web applications with React, Next.js, TypeScript, and Node.js.

Technical Skills:
React, TypeScript, Node.js, Express, Next.js, Tailwind CSS, PostgreSQL, GraphQL, MongoDB, Docker, REST APIs

Education:
B.S. Computer Science, UC Berkeley (2021) | GPA: 3.8/4.0

Experience:
Full Stack Developer at Shopify (2021 - Present)
- Built interactive frontend applications with React 18 and Tailwind CSS.
- Developed backend microservices with Node.js, Express, and PostgreSQL.

Projects:
1. Real-Time Collaborative Document Canvas with WebSockets & React
2. Headless E-Commerce Storefront using Next.js & Stripe
3. Dynamic Analytics Dashboard with Recharts & Tailwind`
  },
  {
    name: 'RES-0003_Pooja_Iyer.txt',
    content: `Pooja Iyer
Email: pooja.iyer@example.com | Phone: +1 (555) 039-4412 | Seattle, WA
Title: AI / ML & Data Science Engineer

Summary:
Data Scientist and AI Engineer with 3 years of experience developing deep learning models, LLMs, and RAG architectures in PyTorch and Python.

Technical Skills:
Python, PyTorch, TensorFlow, Scikit-Learn, NLP, LLMs, LangChain, Pandas, NumPy, Machine Learning, Docker, SQL

Education:
M.S. Artificial Intelligence, Carnegie Mellon University (2022) | GPA: 3.95/4.0

Experience:
Machine Learning Engineer at DeepMind Ecosystem (2022 - Present)
- Architected enterprise RAG system with LangChain, Milvus, and PyTorch.
- Trained vision transformer models for image anomaly detection with 98% accuracy.

Projects:
1. Adaptive Retrieval-Augmented Generation (RAG) System using LangChain & Milvus
2. Multi-Modal Vision Transformer for Medical Imaging Anomaly Detection
3. Customer Churn Forecasting Engine using XGBoost & SHAP`
  },
  {
    name: 'RES-0004_Jordan_Smith.txt',
    content: `Jordan Smith
Email: jordan.smith@example.com | Phone: +1 (555) 048-7731 | Austin, TX
Title: Cloud & DevOps Infrastructure Architect

Summary:
Cloud Solutions Architect with 4.5 years of experience managing Kubernetes clusters, Terraform infrastructure, and CI/CD automation on AWS.

Technical Skills:
AWS, Kubernetes, Terraform, Docker, CI/CD, GitHub Actions, Prometheus, Grafana, Linux, Python, Bash

Education:
B.Tech Information Technology, Georgia Tech (2020) | GPA: 3.7/4.0

Experience:
DevOps Architect at Cloudflare (2020 - Present)
- Automated multi-region Kubernetes deployments using ArgoCD and Terraform.
- Built observability pipelines with Prometheus, Loki, and Grafana reducing MTTR by 45%.

Projects:
1. Zero-Downtime Multi-Region Kubernetes Cluster Deployment with ArgoCD
2. Infrastructure-as-Code Enterprise Baseline across 50+ AWS Accounts via Terraform
3. Automated GitOps Observability Pipeline`
  },
  {
    name: 'RES-0005_Rohan_Gupta.txt',
    content: `Rohan Gupta
Email: rohan.gupta@example.com | Phone: +1 (555) 057-2299 | Chicago, IL
Title: Junior Frontend Developer

Summary:
Frontend enthusiast with 1 year of experience building landing pages with HTML, CSS, and basic JavaScript.

Technical Skills:
HTML5, CSS3, JavaScript, Figma, Bootstrap, Git

Education:
B.A. Graphic Design, City College (2023) | GPA: 3.4/4.0

Experience:
Junior Web Designer at WebStudio (2023 - Present)
- Created static marketing websites using HTML and CSS.

Projects:
1. Personal Portfolio Website in HTML/CSS
2. Responsive Cafe Landing Page`
  }
];

export default function ResumeScreening() {
  const { showToast } = useSkill();
  
  // Input states
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [jdText, setJdText] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [jdFile, setJdFile] = useState(null);
  const [shortlistThreshold, setShortlistThreshold] = useState(70);

  // Analysis & Results states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [resultsFilter, setResultsFilter] = useState('ALL'); // 'ALL' | 'SHORTLISTED' | 'NOT_SHORTLISTED'
  const [searchFilter, setSearchFilter] = useState('');
  const [previewCandidate, setPreviewCandidate] = useState(null);

  const fileInputRef = useRef(null);
  const jdFileInputRef = useRef(null);

  // Handle resume file uploads
  const handleResumeFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
    const validFiles = [];

    files.forEach((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (validExtensions.includes(ext)) {
        // Prevent duplicate filenames
        if (!uploadedFiles.some((f) => f.name === file.name)) {
          validFiles.push(file);
        }
      } else {
        showToast(`Skipped ${file.name}: unsupported format. Use PDF, DOCX, DOC, or TXT.`, 'error');
      }
    });

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      showToast(`Added ${validFiles.length} resume(s)`, 'success');
    }
  };

  const handleRemoveResume = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllResumes = () => {
    setUploadedFiles([]);
  };

  // 1-Click Demo Resumes Loader
  const handleLoadSampleResumes = () => {
    const demoFiles = DEMO_RESUME_FILES.map((item) => {
      const blob = new Blob([item.content], { type: 'text/plain' });
      return new File([blob], item.name, { type: 'text/plain' });
    });
    setUploadedFiles(demoFiles);
    showToast(`Loaded ${demoFiles.length} benchmark candidate resumes`, 'info');
  };

  // Handle JD file upload
  const handleJdFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (validExtensions.includes(ext)) {
      setJdFile(file);
      showToast(`Attached Job Description file: ${file.name}`, 'success');
    } else {
      showToast(`Unsupported JD format. Use PDF, DOCX, DOC, or TXT.`, 'error');
    }
  };

  // Trigger Screening Analysis
  const handleAnalyzeCandidates = async () => {
    // 1. Validation: At least one resume
    if (uploadedFiles.length === 0) {
      showToast('Please upload at least one candidate resume to analyze.', 'error');
      return;
    }

    // 2. Validation: Job description provided
    if (!jdText.trim() && !jdFile) {
      showToast('Please provide a Job Description (paste text or attach a file).', 'error');
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await screenResumes({
        resumeFiles: uploadedFiles,
        jdText: jdText,
        jdFile: jdFile,
        threshold: shortlistThreshold
      });

      setAnalysisResults(data);
      showToast(`Screening complete! ${data.summary.shortlistedCount} of ${data.summary.totalResumes} candidates shortlisted.`, 'success');

      // Scroll smoothly to results
      setTimeout(() => {
        const resultsEl = document.getElementById('screening-results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } catch (err) {
      console.error('Screening failed:', err);
      showToast(`Analysis failed: ${err.message}`, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Filtered candidate list
  const filteredCandidates = (analysisResults?.candidates || []).filter((c) => {
    // Status tab filter
    if (resultsFilter === 'SHORTLISTED' && !c.isShortlisted) return false;
    if (resultsFilter === 'NOT_SHORTLISTED' && c.isShortlisted) return false;

    // Search query filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchRole = (c.role || '').toLowerCase().includes(q);
      const matchSkills = (c.skills || []).some((s) => s.toLowerCase().includes(q));
      const matchId = (c.candidateId || '').toLowerCase().includes(q);
      return matchName || matchRole || matchSkills || matchId;
    }

    return true;
  });

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar
          title="AI Resume Screening & Job Description Matcher"
          subtitle="Intelligent multi-factor candidate ranking, automated resume extraction, and ATS qualification analysis."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Header Banner */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  MERIQ Skill Intelligence Engine
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Resume Screening & Job Description Matching
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  Upload multiple candidate resumes, provide target job requirements, and let MERIQ evaluate technical skill density, experience fit, project depth, and shortlist top candidates with full explanations.
                </p>
              </div>

              {/* Navigation Link to 1,000 Resumes Dataset */}
              <div className="flex items-center gap-3">
                <Link
                  to="/resumes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] border border-slate-200 dark:border-[#22222a] transition-all"
                >
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Browse 1,000 Resumes Dataset</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Screening Input Grid: 1. Upload Resumes & 2. Job Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Section 1: Upload Resumes (5 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] p-6 space-y-4 shadow-card dark:shadow-card-dark flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#1a1608] border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                      1
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Upload Resumes
                      </h2>
                      <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                        Supports TXT, PDF, DOC, DOCX
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLoadSampleResumes}
                    className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 hover:text-amber-700 bg-amber-50 dark:bg-[#1a1608] px-2.5 py-1.5 rounded-xl border border-amber-200/60 dark:border-amber-900/60 transition-all flex items-center gap-1.5"
                    title="Load 5 benchmark candidates to quickly test screening"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Load 5 Sample Resumes</span>
                  </button>
                </div>

                {/* Drag and drop upload zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-[#22222a] hover:border-amber-400 dark:hover:border-amber-500/50 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-[#121216]/50 hover:bg-slate-50 dark:hover:bg-[#15151a]"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleResumeFilesSelected}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" />
                  <div className="text-xs font-bold text-slate-800 dark:text-neutral-200">
                    Click to select or drag & drop candidate resumes
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 mt-1">
                    Select multiple files at once (.pdf, .docx, .doc, .txt)
                  </div>
                </div>

                {/* Uploaded files list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-neutral-300">
                      Uploaded Resumes ({uploadedFiles.length})
                    </span>
                    {uploadedFiles.length > 0 && (
                      <button
                        onClick={handleClearAllResumes}
                        className="text-[11px] text-rose-500 hover:text-rose-600 font-semibold"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {uploadedFiles.length === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-100 dark:border-[#1e1e26] text-center text-xs text-slate-400 dark:text-neutral-500">
                      No resume files uploaded yet. Select files or click <strong>Load 5 Sample Resumes</strong>.
                    </div>
                  ) : (
                    <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-100 dark:border-[#1e1e26] text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="font-medium text-slate-800 dark:text-neutral-200 truncate">
                              {file.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 shrink-0">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveResume(idx);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-200 dark:hover:bg-[#1c1c22] transition-colors shrink-0"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Format badges indicator */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1a1a20] flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500">
                <span>Supported Formats:</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#141419] text-amber-600 dark:text-amber-400 border border-transparent dark:border-[#22222a]">PDF</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#141419] text-amber-600 dark:text-amber-400 border border-transparent dark:border-[#22222a]">DOCX</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#141419] text-amber-600 dark:text-amber-400 border border-transparent dark:border-[#22222a]">DOC</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#141419] text-amber-600 dark:text-amber-400 border border-transparent dark:border-[#22222a]">TXT</span>
                </div>
              </div>
            </div>

            {/* Section 2: Job Description (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] p-6 space-y-4 shadow-card dark:shadow-card-dark flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#1a1608] border border-amber-200/60 dark:border-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                      2
                    </div>
                    <div>
                      <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                        Job Description
                      </h2>
                      <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                        Paste text or upload a job specification document
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preset Role Templates */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                    Quick Preset Templates:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SAMPLE_JOB_DESCRIPTIONS.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setJdText(preset.text);
                          setJdFile(null);
                          showToast(`Applied "${preset.title}" template`, 'info');
                        }}
                        className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141419] hover:bg-amber-50 dark:hover:bg-[#1a1608] text-slate-700 dark:text-neutral-300 hover:text-amber-700 dark:hover:text-amber-400 border border-slate-200/60 dark:border-[#22222a] transition-all"
                      >
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Area */}
                <div>
                  <textarea
                    rows={7}
                    placeholder="Paste Job Description Here... (e.g. Senior Python Backend Developer with 3+ years experience in FastAPI, PostgreSQL, Redis, Docker, and REST APIs)"
                    value={jdText}
                    onChange={(e) => setJdText(e.target.value)}
                    className="w-full p-3.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-[#18181f] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono leading-relaxed"
                  />
                </div>

                {/* Optional Job Description File Upload */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-100 dark:border-[#1e1e26]">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className="w-4 h-4 text-amber-500 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 dark:text-neutral-200">
                        {jdFile ? jdFile.name : 'OR Upload Job Description File'}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-neutral-500">
                        {jdFile ? `${(jdFile.size / 1024).toFixed(1)} KB attached` : 'Supports TXT, PDF, DOC, DOCX'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {jdFile && (
                      <button
                        onClick={() => setJdFile(null)}
                        className="text-[11px] text-rose-500 hover:text-rose-600 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => jdFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-[#1c1c22] hover:bg-slate-300 dark:hover:bg-[#262630] text-slate-800 dark:text-neutral-200 font-bold text-xs transition-colors"
                    >
                      {jdFile ? 'Change File' : 'Browse File'}
                    </button>
                    <input
                      ref={jdFileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleJdFileSelected}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Shortlist Criteria Config */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#1a1a20] flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-neutral-400">Shortlist Score Threshold:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="50"
                    max="90"
                    step="5"
                    value={shortlistThreshold}
                    onChange={(e) => setShortlistThreshold(Number(e.target.value))}
                    className="w-24 accent-amber-500"
                  />
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-[#1a1608] px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/60">
                    ≥ {shortlistThreshold}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Analyze & Shortlist Candidates Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
            <button
              onClick={handleAnalyzeCandidates}
              disabled={isAnalyzing}
              className="w-full sm:w-auto min-w-[320px] px-8 py-4 rounded-2xl text-base font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-black" />
                  <span>Analyzing Candidates...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-black fill-current" />
                  <span>Analyze & Shortlist Candidates</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </>
              )}
            </button>
          </div>

          {/* Section 4: Results Display Section */}
          {analysisResults && (
            <div id="screening-results-section" className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Top Summary Bar (4 Cards) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Resumes */}
                <div className="p-5 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark space-y-1">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    Total Resumes
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {analysisResults.summary.totalResumes} Resumes
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Processed by parser engine
                  </div>
                </div>

                {/* Candidates Shortlisted */}
                <div className="p-5 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark space-y-1">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Candidates Shortlisted
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {analysisResults.summary.shortlistedCount} Shortlisted
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Meeting ≥{shortlistThreshold}% threshold
                  </div>
                </div>

                {/* Average Match Score */}
                <div className="p-5 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark space-y-1">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-amber-500" />
                    Average Match Score
                  </div>
                  <div className="text-2xl font-extrabold font-mono text-amber-500 dark:text-amber-400">
                    {analysisResults.summary.averageMatchScore}% Average Match
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500">
                    Across all uploaded candidates
                  </div>
                </div>

                {/* Top Candidate */}
                <div className="p-5 bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark space-y-1">
                  <div className="text-[11px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Top Candidate
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white truncate">
                    {analysisResults.summary.topCandidate?.name || 'N/A'}
                  </div>
                  <div className="text-xs font-mono font-extrabold text-amber-500">
                    {analysisResults.summary.topCandidate?.matchScore}% Match Score
                  </div>
                </div>
              </div>

              {/* Results Filter & Search Controls */}
              <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Status Tabs */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setResultsFilter('ALL')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      resultsFilter === 'ALL'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-sm font-extrabold'
                        : 'bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1e1e26]'
                    }`}
                  >
                    All Candidates ({analysisResults.candidates.length})
                  </button>

                  <button
                    onClick={() => setResultsFilter('SHORTLISTED')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      resultsFilter === 'SHORTLISTED'
                        ? 'bg-emerald-500 text-black font-extrabold shadow-sm'
                        : 'bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1e1e26]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Shortlisted ({analysisResults.summary.shortlistedCount})</span>
                  </button>

                  <button
                    onClick={() => setResultsFilter('NOT_SHORTLISTED')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      resultsFilter === 'NOT_SHORTLISTED'
                        ? 'bg-slate-700 text-white font-extrabold shadow-sm'
                        : 'bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1e1e26]'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Not Shortlisted ({analysisResults.candidates.length - analysisResults.summary.shortlistedCount})</span>
                  </button>
                </div>

                {/* Candidate Search */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate or skill..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              {/* Section 5: Candidate Ranking Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Ranked Candidates ({filteredCandidates.length})
                  </h3>
                  <span className="text-xs text-slate-400 dark:text-neutral-500">
                    Ranked by multi-factor relevance match to Job Description
                  </span>
                </div>

                {filteredCandidates.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="text-sm font-bold text-slate-800 dark:text-neutral-200">
                      No candidates match this filter
                    </div>
                    <div className="text-xs text-slate-400">
                      Try selecting "All Candidates" or adjusting your search keyword.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCandidates.map((candidate) => (
                      <div
                        key={candidate.candidateId}
                        className={`bg-white dark:bg-[#0a0a0d] rounded-3xl border ${
                          candidate.isShortlisted
                            ? 'border-amber-400/80 dark:border-amber-500/40 hover:border-amber-400'
                            : 'border-slate-200/90 dark:border-[#1a1a20] hover:border-slate-300 dark:hover:border-[#262630]'
                        } p-6 space-y-5 shadow-card dark:shadow-card-dark transition-all`}
                      >
                        {/* Top Row: Rank, Candidate Name, Status Badge, Match Score */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-[#1a1a20] pb-4">
                          <div className="flex items-center gap-3">
                            {/* Rank Badge */}
                            <div className="w-9 h-9 rounded-2xl bg-amber-400 dark:bg-amber-500 text-black font-extrabold flex items-center justify-center font-mono text-sm shadow-sm shrink-0">
                              #{candidate.rank}
                            </div>

                            <div>
                              <div className="flex items-center gap-2.5">
                                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                                  {candidate.name}
                                </h4>
                                <span className="font-mono text-xs font-bold text-slate-400 dark:text-neutral-500 bg-slate-100 dark:bg-[#141419] px-2 py-0.5 rounded-md border border-transparent dark:border-[#22222a]">
                                  {candidate.candidateId}
                                </span>
                              </div>
                              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                                {candidate.role} • {candidate.category}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Status Indicator */}
                            {candidate.isShortlisted ? (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#081a10] text-emerald-700 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200 dark:border-emerald-900/60">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span>SHORTLISTED</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-400 text-xs font-bold border border-slate-200 dark:border-[#22222a]">
                                <XCircle className="w-4 h-4 text-rose-400" />
                                <span>NOT SHORTLISTED</span>
                              </div>
                            )}

                            {/* Match Score */}
                            <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-[#1a1608] border border-amber-200/60 dark:border-amber-900/60 text-right">
                              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Match Score</div>
                              <div className="text-lg font-extrabold font-mono text-amber-500 dark:text-amber-400 leading-tight">
                                {candidate.matchScore}%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle Content: Why Selected / Reason + Candidate Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                          {/* Explanation Column (7 cols) */}
                          <div className="lg:col-span-7 space-y-3">
                            {candidate.isShortlisted ? (
                              <div className="space-y-2">
                                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                                  <Check className="w-4 h-4" />
                                  <span>Why Selected:</span>
                                </div>
                                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-neutral-300 bg-slate-50 dark:bg-[#121216] p-3.5 rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
                                  {candidate.whySelected?.map((reason, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                                  <AlertCircle className="w-4 h-4 text-rose-400" />
                                  <span>Non-Shortlist Assessment:</span>
                                </div>
                                <div className="text-xs text-slate-600 dark:text-neutral-400 bg-slate-50 dark:bg-[#121216] p-3.5 rounded-2xl border border-slate-100 dark:border-[#1e1e26] leading-relaxed">
                                  {candidate.rejectionReason}
                                </div>
                              </div>
                            )}

                            {/* Skills Row */}
                            <div className="space-y-1.5">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                                Technical Skills:
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {candidate.skills.map((skill, sIdx) => {
                                  const isMatched = (candidate.matchedSkills || []).includes(skill);
                                  return (
                                    <span
                                      key={sIdx}
                                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                        isMatched
                                          ? 'bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-900/60 font-bold'
                                          : 'bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300 border border-transparent dark:border-[#22222a]'
                                      }`}
                                    >
                                      {skill}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Metrics Column (5 cols) */}
                          <div className="lg:col-span-5 space-y-3">
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* Number of Projects */}
                              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-0.5">
                                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                                  <FolderGit2 className="w-3 h-3 text-amber-500" />
                                  Projects
                                </div>
                                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                                  {candidate.numberOfProjects} Projects
                                </div>
                              </div>

                              {/* Experience */}
                              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-0.5">
                                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-amber-500" />
                                  Experience
                                </div>
                                <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                                  {candidate.yearsOfExperience} yrs
                                </div>
                              </div>
                            </div>

                            {/* Education */}
                            <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-0.5">
                              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500 flex items-center gap-1">
                                <GraduationCap className="w-3 h-3 text-amber-500" />
                                Education
                              </div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {candidate.education?.degree || 'B.Tech CSE'}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                                {candidate.education?.university} ({candidate.education?.year})
                              </div>
                            </div>

                            {/* Action Button */}
                            <button
                              onClick={() => setPreviewCandidate(candidate)}
                              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 dark:text-neutral-200 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] border border-slate-200 dark:border-[#22222a] transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Eye className="w-3.5 h-3.5 text-amber-500" />
                              <span>View Full Extracted Profile</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Candidate Detailed Profile Modal */}
      {previewCandidate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-[#1a1608] px-2.5 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-900/60">
                    {previewCandidate.candidateId}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">
                    Rank #{previewCandidate.rank}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {previewCandidate.name}
                </h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                  {previewCandidate.role} • {previewCandidate.yearsOfExperience} Years Experience
                </p>
              </div>

              <button
                onClick={() => setPreviewCandidate(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-[#141419] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Match Score & Status Summary */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-[#121216] border border-amber-200/60 dark:border-[#1e1e26] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Screening Status</div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                  {previewCandidate.isShortlisted ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> SHORTLISTED
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-rose-400" /> NOT SHORTLISTED
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Match Score</div>
                <div className="text-2xl font-extrabold font-mono text-amber-500 dark:text-amber-400">
                  {previewCandidate.matchScore}%
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="text-xs text-slate-600 dark:text-neutral-400 flex flex-wrap gap-4 bg-slate-50 dark:bg-[#121216] p-3.5 rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
              <div>📧 <strong>{previewCandidate.email}</strong></div>
              <div>📱 <strong>{previewCandidate.phone}</strong></div>
              <div>📍 <strong>{previewCandidate.location}</strong></div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Education & Academic Background</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-1 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">{previewCandidate.education?.degree}</div>
                <div className="text-slate-600 dark:text-neutral-400">{previewCandidate.education?.university} — {previewCandidate.education?.year}</div>
                <div className="text-amber-700 dark:text-amber-400 font-semibold text-[11px]">Academic GPA: {previewCandidate.education?.gpa}</div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Extracted Skills & JD Alignment</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2.5 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {previewCandidate.skills.map((s, i) => {
                    const matched = (previewCandidate.matchedSkills || []).includes(s);
                    return (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-lg font-semibold ${
                          matched
                            ? 'bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-900/60 font-bold'
                            : 'bg-white dark:bg-[#18181f] text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-[#26262f]'
                        }`}
                      >
                        {s} {matched && '✓'}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Identified Projects ({previewCandidate.numberOfProjects})</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2 text-xs">
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-neutral-300">
                  {previewCandidate.projects?.map((p, idx) => (
                    <li key={idx} className="font-medium">{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
              <button
                onClick={() => setPreviewCandidate(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
