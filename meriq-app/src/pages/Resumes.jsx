import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { 
  FileText, 
  Download, 
  Search, 
  Sparkles, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  Archive,
  Eye,
  X,
  UserCheck
} from 'lucide-react';
import { getResumes, getCandidatePdfUrl, getDownloadAllZipUrl } from '../api/resumes';
import { useSkill } from '../context/SkillContext';

const RESUME_CATEGORIES = [
  'All',
  'Backend',
  'Full Stack',
  'AI / ML',
  'Cloud / DevOps',
  'Data Engineering',
  'Cybersecurity',
  'Frontend',
  'Mobile',
  'Enterprise Systems',
  'Hardware / IoT',
  'Web3 / Blockchain',
  'DevOps / Reliability'
];

export default function Resumes() {
  const { showToast } = useSkill();
  const [resumesData, setResumesData] = useState({ total: 1000, page: 1, limit: 12, totalPages: 84, items: [] });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewCandidate, setPreviewCandidate] = useState(null);

  const fetchResumes = async (page = 1, category = selectedCategory, search = searchQuery) => {
    setLoading(true);
    try {
      const data = await getResumes({
        page,
        limit: 12,
        category,
        search
      });
      setResumesData(data);
    } catch (err) {
      console.error('Failed to load resumes', err);
      showToast('Error loading resume dataset from backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes(currentPage, selectedCategory, searchQuery);
  }, [currentPage, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchResumes(1, selectedCategory, searchQuery);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleDownloadPdf = (candidateId, name) => {
    const url = getCandidatePdfUrl(candidateId);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${candidateId}_${name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading PDF resume for ${name}...`, 'info');
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="1,000 Resumes Dataset & PDF Repository" 
          subtitle="Academic benchmark corpus featuring 1,000 structured candidate profiles & individual PDF files."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
          {/* Header Banner */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold border border-amber-200/60 dark:border-amber-900/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Academic Benchmark Corpus
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  1,000 Candidate Resumes & PDF Repository
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  Engineered for intelligent screening, NLP evaluation, semantic candidate ranking, and skill extraction research.
                </p>
              </div>

              {/* Bulk Download & AI Screening CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/screening"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-slate-800 dark:bg-[#16161c] dark:hover:bg-[#202028] border border-slate-700 dark:border-[#2a2a36] shadow-md transition-all active:scale-95"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>AI Resume Screening</span>
                </Link>

                <a
                  href={getDownloadAllZipUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all active:scale-95"
                >
                  <Archive className="w-4 h-4 text-black" />
                  <span>Download 1,000 Resumes (ZIP)</span>
                </a>
              </div>
            </div>


            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Total Resumes</div>
                <div className="text-xl font-extrabold font-mono text-amber-500 dark:text-amber-400">1,000 Profiles</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">PDF Files Generated</div>
                <div className="text-xl font-extrabold font-mono text-emerald-500">1,000 PDFs (100%)</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Technical Domains</div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">12 Domains</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Formats Available</div>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white">PDF • CSV • JSON</div>
              </div>
            </div>
          </div>

          {/* Search and Category Filters */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-4 sm:p-5 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across 1,000 candidates (e.g. Python, Stanford, React, Docker, RES-0420)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-[#18181f] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </form>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {RESUME_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1e1e26] hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-[#22222a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Resumes Grid */}
          {loading ? (
            <div className="p-16 text-center text-xs text-slate-500 dark:text-neutral-400">
              Loading candidates from 1,000-resume dataset...
            </div>
          ) : resumesData.items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {resumesData.items.map((c) => (
                <div
                  key={c.candidateId}
                  className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] hover:border-amber-400 dark:hover:border-amber-500/40 p-5 space-y-4 flex flex-col justify-between shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-all"
                >
                  <div className="space-y-3">
                    {/* Header: ID, Category & Score */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-[#141419] text-slate-800 dark:text-neutral-200 border border-transparent dark:border-[#22222a]">
                          {c.candidateId}
                        </span>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          {c.category}
                        </span>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 font-mono">
                        {c.meriqScore}% Match
                      </span>
                    </div>

                    {/* Candidate Name & Role */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                        {c.name}
                      </h3>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-bold mt-0.5">
                        {c.role} • {c.yearsOfExperience} yrs exp
                      </p>
                    </div>

                    {/* University & Degree */}
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 space-y-1 bg-slate-50 dark:bg-[#121216] p-2.5 rounded-xl border border-slate-100 dark:border-[#1e1e26]">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-neutral-300">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{c.education.university}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-neutral-500 truncate">
                        {c.education.degree} ({c.education.gpa})
                      </div>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.skills.slice(0, 4).map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300 border border-transparent dark:border-[#22222a]"
                        >
                          {s}
                        </span>
                      ))}
                      {c.skills.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-400 dark:text-neutral-500">
                          +{c.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: Preview & Download PDF */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-[#1a1a20]">
                    <button
                      onClick={() => setPreviewCandidate(c)}
                      className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-[#141419] hover:bg-slate-200 dark:hover:bg-[#1e1e26] transition-colors flex items-center justify-center gap-1.5 border border-transparent dark:border-[#22222a]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownloadPdf(c.candidateId, c.name)}
                      className="py-2 px-3 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] p-12 text-center space-y-3">
              <FileText className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No resumes match your criteria</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Try adjusting your keyword search or category filter.</p>
            </div>
          )}

          {/* Pagination Controls */}
          {resumesData.totalPages > 1 && (
            <div className="flex items-center justify-between bg-white dark:bg-[#0a0a0d] p-4 rounded-2xl border border-slate-200/90 dark:border-[#1a1a20] text-xs">
              <span className="text-slate-500 dark:text-neutral-400">
                Showing Page <strong className="text-slate-900 dark:text-white font-mono">{resumesData.page}</strong> of <strong className="text-slate-900 dark:text-white font-mono">{resumesData.totalPages}</strong> ({resumesData.total} candidates)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={resumesData.page <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#141419] text-slate-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-[#1e1e26] font-bold flex items-center gap-1 border border-transparent dark:border-[#22222a]"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  disabled={resumesData.page >= resumesData.totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black disabled:opacity-40 disabled:cursor-not-allowed font-extrabold flex items-center gap-1 shadow-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Candidate Detailed Preview Modal */}
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
                  <span className="text-xs text-slate-400 dark:text-neutral-500">
                    {previewCandidate.category}
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

            {/* Contact Details */}
            <div className="text-xs text-slate-600 dark:text-neutral-400 flex flex-wrap gap-4 bg-slate-50 dark:bg-[#121216] p-3.5 rounded-2xl border border-slate-100 dark:border-[#1e1e26]">
              <div>📧 <strong>{previewCandidate.email}</strong></div>
              <div>📱 <strong>{previewCandidate.phone}</strong></div>
              <div>📍 <strong>{previewCandidate.location}</strong></div>
            </div>

            {/* Education & Credentials */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Education & Credentials</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-1 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">{previewCandidate.education.degree}</div>
                <div className="text-slate-600 dark:text-neutral-400">{previewCandidate.education.university} — {previewCandidate.education.year}</div>
                <div className="text-amber-700 dark:text-amber-400 font-semibold text-[11px]">Academic Score: {previewCandidate.education.gpa}</div>
              </div>
            </div>

            {/* Technical Skills & Certification */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Technical Skills & Certification</h4>
              <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] space-y-2.5 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {previewCandidate.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#18181f] text-slate-800 dark:text-neutral-200 font-semibold border border-slate-200 dark:border-[#26262f]">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="text-slate-700 dark:text-neutral-300 pt-1 border-t border-slate-200 dark:border-[#1e1e26]">
                  <strong>Verified Certification:</strong> {previewCandidate.certification}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Work Experience</h4>
              <div className="space-y-2">
                {previewCandidate.experiences.map((exp, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-100 dark:border-[#1e1e26] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>{exp.title}</span>
                      <span className="text-slate-400 font-normal">{exp.duration}</span>
                    </div>
                    <div className="text-amber-700 dark:text-amber-400 font-medium">{exp.company}</div>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 dark:text-neutral-400">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-[#1a1a20]">
              <button
                onClick={() => setPreviewCandidate(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141419]"
              >
                Close
              </button>

              <button
                onClick={() => handleDownloadPdf(previewCandidate.candidateId, previewCandidate.name)}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
