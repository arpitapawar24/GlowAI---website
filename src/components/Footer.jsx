import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Award, RefreshCw, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/50 transition-colors">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">AI Computer Vision</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Multi-metric skin & scalp mapping</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Board Dermatologists</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Certified telehealth consultations</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Clean & Cruelty-Free</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">100% verified non-toxic actives</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Personalized Regimen</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">Dynamic AM/PM routine tracking</p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                Glow<span className="beauty-gradient-text">AI</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mb-4 leading-relaxed">
              Empowering bespoke dermal wellness through next-generation AI diagnostics, personalized ingredient synergy, and certified medical consultation.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for healthy, glowing skin & hair</span>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-4">
              AI Diagnostics
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600 dark:text-stone-400">
              <li><Link to="/analyze" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Facial Skin Scan</Link></li>
              <li><Link to="/analyze" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Scalp & Hair Analysis</Link></li>
              <li><Link to="/profile" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Routine Builder</Link></li>
              <li><Link to="/profile" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Skin Journey History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-600 dark:text-stone-400">
              <li><Link to="/marketplace?category=Cleanser" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Ceramide Cleansers</Link></li>
              <li><Link to="/marketplace?category=Serum" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Active Serums</Link></li>
              <li><Link to="/marketplace?category=Sunscreen" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Invisible SPF 50+</Link></li>
              <li><Link to="/marketplace?category=Haircare" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Peptide Haircare</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-4">
              Skin Science Digest
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
              Subscribe for clinical ingredient breakdowns and personalized seasonal tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <button
                type="button"
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
          <p>© {new Date().getFullYear()} GlowAI Platform. All rights reserved.</p>
          <div className="flex gap-6 mt-3 sm:mt-0">
            <span className="hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-600 dark:hover:text-stone-300 cursor-pointer">HIPAA Telehealth Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
