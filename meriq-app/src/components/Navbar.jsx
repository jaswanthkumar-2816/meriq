import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200/80 dark:border-[#1c1c22] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-black fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
              MERIQ
            </span>
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase mt-0.5">
              Adaptive Skill Intelligence
            </span>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-neutral-300">
          <a href="#how-it-works" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">How It Works</a>
          <a href="#skill-intelligence" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Skill Intelligence</a>
          <a href="#personalized-learning" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Targeted Learning</a>
          <a href="#learning-loop" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">The Loop</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <ThemeToggle />

          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/25 transition-all active:scale-[0.98]"
          >
            <span>Start Analysing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
