import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  Package,
  Activity,
  Sun,
  Moon,
  Clock,
  ExternalLink,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

export default function Profile() {
  const [searchParams] = useSearchParams();
  const { user, toggleRoutine, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'routine');
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [scanHistory, setScanHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Edit skin profile state
  const [editSkinType, setEditSkinType] = useState(user?.skinProfile?.skinType || 'Combination');
  const [editHairType, setEditHairType] = useState(user?.skinProfile?.hairType || 'Straight / Fine');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEditSkinType(user.skinProfile?.skinType || 'Combination');
      setEditHairType(user.skinProfile?.hairType || 'Straight / Fine');
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoadingHistory(true);
    try {
      const [apts, ords, scans] = await Promise.all([
        api.getMyAppointments().catch(() => []),
        api.getMyOrders().catch(() => []),
        api.getAnalysisHistory().catch(() => [])
      ]);
      setAppointments(apts);
      setOrders(ords);
      setScanHistory(scans);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleRoutineCheck = async (period) => {
    try {
      const res = await toggleRoutine(period);
      if (res.dailyRoutineLog.morning && res.dailyRoutineLog.evening) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        skinProfile: {
          skinType: editSkinType,
          hairType: editHairType
        }
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold">Please Sign In</h2>
        <p className="text-xs text-stone-500">
          Sign in to access your skin profile, routine tracker, scan history, and consultations.
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-md hover:bg-amber-700"
        >
          Sign In or One-Click Demo
        </button>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* User Header Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white border border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/40 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="font-serif text-2xl font-bold">{user.name}</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30">
                Verified Profile
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{user.email}</p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300">
                Skin: <strong>{user.skinProfile?.skinType || 'Combination'}</strong>
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300">
                Hair: <strong>{user.skinProfile?.hairType || 'Straight / Fine'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Routine Streak Banner */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-800/80 border border-stone-700">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
            <Flame className="w-7 h-7 text-amber-400 animate-bounce" />
          </div>
          <div className="text-left">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
              Daily Regimen Streak
            </span>
            <div className="font-mono text-2xl font-black text-amber-400">
              {user.routineStreak?.current || 1} Days
            </div>
            <span className="text-[10px] text-stone-400">
              Personal Best: {user.routineStreak?.best || 7} Days
            </span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-2 overflow-x-auto">
        {[
          { id: 'routine', label: 'Daily Routine Tracker', icon: CheckCircle2 },
          { id: 'history', label: 'Scan History', icon: Activity },
          { id: 'consultations', label: 'Doctor Telehealth', icon: Calendar },
          { id: 'orders', label: 'My Orders', icon: Package },
          { id: 'settings', label: 'Skin Profile Settings', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. Daily Routine Tracker */}
      {activeTab === 'routine' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Morning Checklist */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 text-amber-600">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Morning Routine (AM)
                  </h3>
                </div>
                <button
                  onClick={() => handleRoutineCheck('morning')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    user.dailyRoutineLog?.morning
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {user.dailyRoutineLog?.morning ? 'Completed' : 'Mark Completed'}
                </button>
              </div>

              <ul className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Hydra-Barrier Cera-Repair Cleanser (Lukewarm wash)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Glow Radiance 15% Vitamin C + Ferulic Elixir</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Invisible Water-Gel Broad Spectrum SPF 50+</span>
                </li>
              </ul>
            </div>

            {/* Evening Checklist */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 text-purple-600">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Evening Routine (PM)
                  </h3>
                </div>
                <button
                  onClick={() => handleRoutineCheck('evening')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    user.dailyRoutineLog?.evening
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-purple-100'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {user.dailyRoutineLog?.evening ? 'Completed' : 'Mark Completed'}
                </button>
              </div>

              <ul className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Gentle Double Cleanse (Remove SPF & sebum)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Clarifying Salicylic & BHA Clarifying Serum</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Peptide & Bakuchiol Overnight Renewal Cream</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. Scan History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {scanHistory.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <Activity className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-serif font-bold text-lg">No AI Scans Logged Yet</p>
              <p className="text-xs text-stone-500">Run your first diagnostic to start tracking skin metrics over time.</p>
            </div>
          ) : (
            scanHistory.map((scan) => (
              <div
                key={scan._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={scan.imageUrl}
                  alt="Scan thumbnail"
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-amber-500/30 shrink-0"
                />
                <div className="flex-1 space-y-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {scan.analysisType === 'hair' ? 'Hair & Scalp Diagnostic' : 'Facial Skin Analysis'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      Score: {scan.overallScore}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Logged on {new Date(scan.createdAt).toLocaleDateString()} • {scan.skinTypeOrHairType}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 pt-1">
                    {scan.aiSummary}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. Consultations */}
      {activeTab === 'consultations' && (
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <Calendar className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-serif font-bold text-lg">No Consultations Scheduled</p>
              <p className="text-xs text-stone-500">Book certified dermatologists for personalized medical care.</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={apt.doctor?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80"}
                    alt={apt.doctor?.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/30"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      {apt.doctor?.name}
                    </h4>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {apt.concernType} Consultation
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      📅 {apt.date} at {apt.timeSlot}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    {apt.status}
                  </span>
                  <button
                    onClick={() => alert(`Connecting to Telehealth room for ${apt.doctor?.name}...`)}
                    className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold"
                  >
                    Enter Video Room
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 4. Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
              <ShoppingBag className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-serif font-bold text-lg">No Orders Placed Yet</p>
              <p className="text-xs text-stone-500">Discover formulations in the marketplace to place an order.</p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord._id}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                      Tracking: {ord.trackingNumber}
                    </span>
                    <p className="text-[11px] text-stone-400">
                      Placed on {new Date(ord.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                      {ord.orderStatus}
                    </span>
                    <span className="font-mono font-bold text-base text-stone-900 dark:text-stone-100">
                      ${ord.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                      />
                      <div>
                        <p className="font-semibold text-stone-800 dark:text-stone-200 line-clamp-1">{item.name}</p>
                        <p className="text-stone-400">Qty: {item.quantity} • ${item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. Profile Settings */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveProfile} className="max-w-xl p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            Dermal Profile Configuration
          </h3>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-xs">
              Profile updated successfully!
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Primary Skin Classification
            </label>
            <select
              value={editSkinType}
              onChange={(e) => setEditSkinType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
            >
              <option value="Normal">Normal</option>
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
              <option value="Combination">Combination</option>
              <option value="Sensitive">Sensitive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Hair & Scalp Classification
            </label>
            <select
              value={editHairType}
              onChange={(e) => setEditHairType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100"
            >
              <option value="Straight / Fine">Straight / Fine</option>
              <option value="Wavy">Wavy</option>
              <option value="Curly">Curly</option>
              <option value="Coily">Coily</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
