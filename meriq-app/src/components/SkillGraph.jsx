import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConceptNode from './ConceptNode';
import MasteryBar from './MasteryBar';
import { 
  GitFork, 
  AlertTriangle, 
  BookOpen, 
  Target 
} from 'lucide-react';

export default function SkillGraph({ hierarchy, skillId, skillName }) {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(
    hierarchy?.children?.find(c => c.mastery < 40) || hierarchy?.children?.[0] || hierarchy
  );
  const [expandedNodes, setExpandedNodes] = useState({
    'py-fundamentals': true,
    'py-control': true,
    'py-functions': true,
    'py-ds': true,
    'py-oop': true,
  });

  const toggleExpand = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  if (!hierarchy) {
    return (
      <div className="p-8 text-center bg-white dark:bg-[#0c0c0f] rounded-2xl border border-slate-200 dark:border-[#1c1c22]">
        <p className="text-slate-500 dark:text-neutral-400 text-sm">No hierarchy data available for this skill.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left 2 Cols: Hierarchical Concept Tree */}
      <div className="lg:col-span-2 space-y-4">
        {/* Tree Root Header */}
        <div className="p-4 bg-slate-900 dark:bg-[#070709] text-white rounded-2xl shadow-sm flex items-center justify-between border border-slate-800 dark:border-[#1c1c22]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold shadow-sm shadow-amber-500/20">
              <GitFork className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-500/90 dark:text-amber-400">Root Skill Node</div>
              <h3 className="text-base font-extrabold">{hierarchy.name || skillName}</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-300 dark:text-neutral-400">Overall Mastery</span>
            <div className="text-lg font-extrabold font-mono text-amber-400">{hierarchy.mastery || 67}%</div>
          </div>
        </div>

        {/* Tree Branches */}
        <div className="space-y-4">
          {hierarchy.children?.map((category) => {
            const isCategoryExpanded = expandedNodes[category.id] ?? true;
            return (
              <div key={category.id} className="space-y-2">
                {/* Level 1 Domain Node */}
                <ConceptNode
                  node={category}
                  isSelected={selectedNode?.id === category.id}
                  onSelect={(node) => setSelectedNode(node)}
                  isExpanded={isCategoryExpanded}
                  onToggleExpand={toggleExpand}
                  level={1}
                />

                {/* Level 2 Sub-concepts with indentation and connectors */}
                {isCategoryExpanded && category.children && (
                  <div className="pl-6 border-l-2 border-slate-200/80 dark:border-[#1c1c22] ml-5 space-y-2 my-2 transition-all">
                    {category.children.map((subNode) => (
                      <div key={subNode.id} className="relative">
                        <ConceptNode
                          node={subNode}
                          isSelected={selectedNode?.id === subNode.id}
                          onSelect={(node) => setSelectedNode({ ...node, parentCategory: category.name })}
                          level={2}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 1 Col: Dynamic Concept Inspection Drawer */}
      <div className="lg:col-span-1 sticky top-20">
        {selectedNode ? (
          <div className="bg-white dark:bg-[#0a0a0d] rounded-2xl border border-slate-200/90 dark:border-[#1a1a20] shadow-card dark:shadow-card-dark p-5 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-[#1a1a20] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                  Concept Inspector
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {selectedNode.name}
                </h3>
              </div>
              {selectedNode.mastery < 40 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-[#180d10] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Detected Gap
                </span>
              )}
            </div>

            {/* Mastery Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600 dark:text-neutral-300">Current Knowledge State</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedNode.mastery ?? 50}%</span>
              </div>
              <MasteryBar value={selectedNode.mastery ?? 50} size="md" showLabel={false} showPercentage={false} />
            </div>

            {/* Description */}
            <div className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed bg-slate-50 dark:bg-[#121216] p-3 rounded-xl border border-slate-100 dark:border-[#1c1c22]">
              {selectedNode.description || 'Core modular concept in the active skill hierarchy. Mastered through focused code synthesis and diagnostic verification.'}
            </div>

            {/* Subtopics breakdown if parent */}
            {selectedNode.children && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-neutral-200">Covered Subtopics ({selectedNode.children.length}):</span>
                <div className="space-y-1.5">
                  {selectedNode.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between text-xs py-1 px-2.5 bg-slate-50/80 dark:bg-[#121216] rounded-lg border border-slate-100 dark:border-[#1c1c22]">
                      <span className="text-slate-700 dark:text-neutral-300 font-medium">{child.name}</span>
                      <span className="font-mono text-slate-500 dark:text-neutral-400 font-bold text-[11px]">{child.mastery}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1c1c22]">
              {selectedNode.mastery < 50 ? (
                <button
                  onClick={() => navigate(`/recommendations/${skillId}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Fix Weak Area in Learning Plan</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/assessment/${skillId}`)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-sm shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Target className="w-4 h-4" />
                  <span>Run Concept Diagnostic</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-[#0c0c0f] rounded-2xl border border-dashed border-slate-300 dark:border-[#1c1c22] p-8 text-center text-slate-400 dark:text-neutral-500 text-xs">
            Click on any concept in the tree to view granular diagnostic metrics.
          </div>
        )}
      </div>
    </div>
  );
}
