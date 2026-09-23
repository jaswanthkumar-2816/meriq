import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SkillCard from '../components/SkillCard';
import LoadingState from '../components/LoadingState';
import { 
  Search, 
  Plus, 
  Sparkles, 
  Layers, 
  X 
} from 'lucide-react';
import { useSkill } from '../context/SkillContext';
import { CATEGORIES } from '../data/demoData';

export default function Skills() {
  const navigate = useNavigate();
  const { skills, addSkill } = useSkill();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Programming');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter skills by category & search query
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateCustomSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setIsGenerating(true);
    try {
      const created = await addSkill(newSkillName.trim(), newSkillCategory);
      setIsModalOpen(false);
      setNewSkillName('');
      navigate(`/skills/${created.id}`);
    } catch (err) {
      console.error('Failed to create skill', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-black overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar 
          title="Skill Intelligence Directory" 
          subtitle="Explore concept hierarchies, run diagnostics, or map custom technical skills."
        />

        <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-[#1a1608] text-amber-800 dark:text-amber-300 text-xs font-extrabold mb-1.5 border border-amber-200/60 dark:border-amber-900/60">
                <Layers className="w-3.5 h-3.5 text-amber-500" />
                Adaptive Skill Graph Engine
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                What do you want to improve?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
                Select any domain to inspect its concept tree, estimate current mastery, or diagnose weak areas.
              </p>
            </div>

            {/* Add Custom Skill Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all self-start md:self-auto active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Any Custom Skill</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-4 sm:p-5 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search a skill (e.g. Python, SQL, React, AWS, Machine Learning)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:bg-white dark:focus:bg-[#18181f] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold shadow-sm shadow-amber-500/20'
                      : 'bg-slate-100 dark:bg-[#141419] text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-[#1e1e26] hover:text-slate-900 dark:hover:text-white border border-transparent dark:border-[#22222a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Grid */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#141419] text-slate-500 dark:text-neutral-400 flex items-center justify-center mx-auto border border-transparent dark:border-[#22222a]">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching skills found</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                  You can use the AI engine to generate a brand new skill hierarchy for "{searchQuery}".
                </p>
              </div>
              <button
                onClick={() => {
                  setNewSkillName(searchQuery);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate "{searchQuery}" Skill Graph</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add Custom Skill */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          {isGenerating ? (
            <LoadingState
              title={`Generating "${newSkillName}" Skill Hierarchy`}
              subtitle="Groq LLM synthesizing concept branches, prerequisite dependencies, and diagnostic questions."
            />
          ) : (
            <div className="bg-white dark:bg-[#0a0a0d] rounded-3xl border border-slate-200 dark:border-[#1a1a20] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1a1a20] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-[#1a1608] text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Map Custom Skill</h3>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">Dynamic AI Hierarchy Construction</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-neutral-200 hover:bg-slate-100 dark:hover:bg-[#141419] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kubernetes, Golang, System Design, Rust..."
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#18181f] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-neutral-300 mb-1.5">
                    Domain Category
                  </label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#121216] border border-slate-200 dark:border-[#1e1e26] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#18181f] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-[#121216] rounded-2xl border border-slate-200 dark:border-[#1e1e26] text-xs text-slate-600 dark:text-neutral-300 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">What MERIQ does:</div>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-neutral-400">
                    1. Checks MongoDB cache.<br />
                    2. Decomposes the skill into Fundamentals, Core Patterns, and Advanced Paradigms.<br />
                    3. Synthesizes an initial 10-question adaptive diagnostic.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#141419]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/25"
                  >
                    Synthesize Skill Map
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
