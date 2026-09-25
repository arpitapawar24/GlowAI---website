import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ShoppingBag, User as UserIcon, Menu, X, LogOut, Calendar, HeartHandshake } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemsCount, setIsCartOpen } = useCart();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'AI Analyzer', path: '/analyze', highlight: true },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Dermatologists', path: '/doctors' },
    { name: 'Routine & Profile', path: '/profile', requiresAuth: true }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-stone-50/85 dark:bg-stone-950/85 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                  Glow<span className="beauty-gradient-text">AI</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-400/20">
                  Clinical
                </span>
              </div>
              <p className="text-[10px] text-stone-600 dark:text-stone-300 tracking-wider">AI DERMA & COSMETICS</p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-stone-950 dark:text-white bg-amber-500/10 dark:bg-amber-400/10'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-stone-800/60'
                } ${link.highlight ? 'flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400' : ''}`}
              >
                {link.highlight && <Sparkles className="w-4 h-4 text-amber-500" />}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold shadow-md shadow-rose-500/30 animate-pulse">
                  {itemsCount}
                </span>
              )}
            </button>

            {/* Auth / Profile menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800/80 transition"
                >
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-300 hidden sm:inline">
                    {user.name.split(' ')[0]}
                  </span>
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/30"
                  />
                </button>

                {userDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-50 animate-fade-in"
                    onClick={() => setUserDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{user.name}</p>
                      <p className="text-xs text-stone-400 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                        <span>🔥 {user.routineStreak?.current || 1} Day Streak</span>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      <UserIcon className="w-4 h-4 text-stone-400" />
                      My Skin Identity & Routines
                    </Link>
                    <Link
                      to="/profile?tab=consultations"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    >
                      <Calendar className="w-4 h-4 text-stone-400" />
                      Doctor Appointments
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 shadow-sm transition active:scale-95"
              >
                <UserIcon className="w-3.5 h-3.5" />
                Sign In / Demo
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 space-y-2 border-t border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 text-white text-sm font-semibold text-center"
              >
                Sign In / Demo
              </button>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
