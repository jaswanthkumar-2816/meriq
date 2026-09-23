import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SkillProvider, useSkill } from './context/SkillContext';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import SkillMap from './pages/SkillMap';
import Assessment from './pages/Assessment';
import AssessmentResult from './pages/AssessmentResult';
import Recommendations from './pages/Recommendations';
import Learning from './pages/Learning';
import Retest from './pages/Retest';
import Progress from './pages/Progress';
import Resumes from './pages/Resumes';
import ResumeScreening from './pages/ResumeScreening';

// Global Notification Toast
function NotificationToast() {
  const { notification } = useSkill();
  if (!notification) return null;

  const bgColors = {
    success: 'bg-emerald-900 text-emerald-100 border-emerald-700',
    error: 'bg-rose-900 text-rose-100 border-rose-700',
    info: 'bg-slate-900 text-white border-slate-700',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-semibold flex items-center gap-2.5 ${bgColors[notification.type] || bgColors.info}`}>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>{notification.message}</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SkillProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/skills/:skillId" element={<SkillMap />} />
            <Route path="/skill-map/:skillId" element={<SkillMap />} />
            <Route path="/assessment/:skillId" element={<Assessment />} />
            <Route path="/assessment-result/:skillId" element={<AssessmentResult />} />
            <Route path="/recommendations/:skillId" element={<Recommendations />} />
            <Route path="/learning/:skillId/:resourceId" element={<Learning />} />
            <Route path="/learning/:skillId" element={<Learning />} />
            <Route path="/retest/:skillId/:conceptId" element={<Retest />} />
            <Route path="/retest/:skillId" element={<Retest />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/screening" element={<ResumeScreening />} />
            <Route path="/resume-screening" element={<ResumeScreening />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <NotificationToast />
        </div>
      </BrowserRouter>
    </SkillProvider>
  );
}

