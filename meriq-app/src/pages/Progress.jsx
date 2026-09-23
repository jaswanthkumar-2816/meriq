import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  Zap, 
  GitFork,
  Sparkles 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getProgressAnalytics } from '../api/learning';
import { useSkill } from '../context/SkillContext';

export default function Progress() {
  const { activeSkillId, theme } = useSkill();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isDark = theme === 'dark';

  useEffect(() => {
    getProgressAnalytics(activeSkillId).then((res) => {
      setData(res);
    }).finally(() => {
      setLoading(false);
    });
  }, [activeSkillId]);

  if (loading || !data) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] dark:bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-neutral-400">Loading progress analytics...</p>
        </div>
      </div>
    );
  }

  const {
    overallMastery,
    totalConcepts,
    masteredConcepts,
    learningTimeFormatted,
    knowledgeGainPercent,
    masteryTimeline,
    conceptMasteryData,
    activeSkill,
  } = data;

  const chartAxisColor = isDark ? '#a1a1aa' : '#94a3b8';
  const chartGridColor = isDark ? '#1a1a20' : '#f1f5f9';

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Progress & Skill Intelligence Analytics" 
          subtitle="Longitudinal tracking of concept mastery, retest deltas, and learning velocity."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Metric 1: Overall Mastery */}
            <div className="bg-white dark:bg-[#0a0a0d] p-6 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">Overall Skill Mastery</span>
                <div className="text-3xl font-extrabold font-mono text-amber-500 dark:text-amber-400">{overallMastery}%</div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+14% this week</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
            </div>

            {/* Metric 2: Concepts Mastered */}
            <div className="bg-white dark:bg-[#0a0a0d] p-6 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">Concepts Mastered</span>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  {masteredConcepts} <span className="text-base text-slate-400 dark:text-neutral-600 font-normal">/ {totalConcepts}</span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
                  {Math.round((masteredConcepts / totalConcepts) * 100)}% of curriculum
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-[#0f1f18] text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            {/* Metric 3: Learning Time */}
            <div className="bg-white dark:bg-[#0a0a0d] p-6 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">Learning Time</span>
                <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">{learningTimeFormatted}</div>
                <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">Saved ~6h vs generic course</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#20160a] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>

            {/* Metric 4: Knowledge Gain */}
            <div className="bg-white dark:bg-[#0a0a0d] p-6 rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider">Net Knowledge Gain</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{knowledgeGainPercent}</div>
                <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">Post-diagnostic delta</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Chart Section 1: Mastery Timeline & Domain Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Timeline Area Chart */}
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Skill Mastery Over Time
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">Progression from initial diagnostic to verified retests</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60">
                  {activeSkill.name}
                </span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={masteryTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.45}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: chartAxisColor }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: chartAxisColor }} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#000000', 
                        borderRadius: '12px', 
                        color: '#d4af37', 
                        border: '1px solid #d4af3740', 
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                      formatter={(val) => [`${val}%`, 'Mastery']}
                    />
                    <Area type="monotone" dataKey="mastery" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorMastery)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Concept Mastery Bar Chart */}
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Domain Concept Mastery vs Benchmark
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">Mastery comparison across core functional pillars</p>
                </div>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conceptMasteryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                    <XAxis dataKey="subject" tick={{ fontSize: 10, fill: chartAxisColor }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: chartAxisColor }} />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#000000', 
                        borderRadius: '12px', 
                        color: '#fff', 
                        border: '1px solid #d4af3740', 
                        fontSize: '12px' 
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="mastery" name="Current Mastery %" fill="#d4af37" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="benchmark" name="Proficiency Benchmark %" fill={isDark ? '#27272e' : '#cbd5e1'} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Active Knowledge Tree Status Summary */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {activeSkill.name} Knowledge State Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">Summary status of verified concept branches</p>
              </div>
              <Link
                to={`/skills/${activeSkill.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Full Hierarchy Graph</span>
                <GitFork className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
              <div className="p-4 bg-emerald-50/70 dark:bg-[#0f1f18] rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <span>Fundamentals</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold font-mono text-emerald-700 dark:text-emerald-300">92%</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Mastered</div>
              </div>

              <div className="p-4 bg-amber-50/70 dark:bg-[#1a1608] rounded-2xl border border-amber-200/70 dark:border-amber-900/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                  <span>Control Flow</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">84%</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Strong</div>
              </div>

              <div className="p-4 bg-amber-50/70 dark:bg-[#1a1608] rounded-2xl border border-amber-200/70 dark:border-amber-900/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                  <span>Functions</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">71%</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Strong</div>
              </div>

              <div className="p-4 bg-amber-50/70 dark:bg-[#1a1608] rounded-2xl border border-amber-200/70 dark:border-amber-900/60 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                  <span>Data Structures</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">78%</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Strong</div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-1 ${
                overallMastery >= 75 ? 'bg-emerald-50/70 dark:bg-[#0f1f18] border-emerald-200 dark:border-emerald-900/60' : 'bg-rose-50/70 dark:bg-[#180d10] border-rose-200 dark:border-rose-900/60'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={overallMastery >= 75 ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}>OOP (Inheritance)</span>
                  {overallMastery >= 75 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  )}
                </div>
                <div className={`text-2xl font-extrabold font-mono ${overallMastery >= 75 ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                  {overallMastery >= 75 ? '74%' : '34%'}
                </div>
                <div className={`text-[10px] font-semibold ${overallMastery >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {overallMastery >= 75 ? 'Verified Post-Retest' : 'Needs Verification'}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
