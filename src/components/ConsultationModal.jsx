import React, { useState } from 'react';
import { X, Calendar, Clock, Award, CheckCircle2, AlertCircle, FileText, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ConsultationModal({ isOpen, onClose, doctor, onBooked }) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState(doctor?.availableSlots?.[0] || '10:30 AM');
  const [concernType, setConcernType] = useState('Acne');
  const [concernDescription, setConcernDescription] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in first to book a consultation.');
      return;
    }
    if (!concernDescription.trim()) {
      setError('Please provide a brief description of your skin or hair concern.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        doctorId: doctor._id,
        date: selectedDate,
        timeSlot: selectedSlot,
        concernType,
        concernDescription,
        attachmentUrl
      };

      const booking = await api.bookAppointment(payload);
      setConfirmed(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onBooked) onBooked(booking);
    } catch (err) {
      setError(err.message || 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setConcernDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/40">
          <div className="flex items-center gap-3">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/30"
            />
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                {doctor.name}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                {doctor.specialty}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {confirmed ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Consultation Confirmed!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto">
                Your video telehealth appointment with <strong>{doctor.name}</strong> has been secured for <strong>{selectedDate} at {selectedSlot}</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 text-left space-y-1">
                <p className="font-semibold">Telehealth Instructions:</p>
                <p>• Video link will be activated in your profile 15 minutes before the session.</p>
                <p>• Cleanse skin with mild cleanser prior to the consultation for optimal dermal assessment.</p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 text-sm font-semibold transition"
              >
                Done / View in Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Consultation Fee Banner */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <span className="font-medium text-amber-900 dark:text-amber-200">
                  30-Min Comprehensive Telehealth Video Exam
                </span>
                <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                  ${Number(doctor.consultationFee).toFixed(2)}
                </span>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Select Day
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'This Weekend'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                        selectedDate === day
                          ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold'
                          : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Select Available Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots?.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono font-medium border flex items-center justify-center gap-1.5 transition ${
                        selectedSlot === slot
                          ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Primary Diagnosis Area
                </label>
                <select
                  value={concernType}
                  onChange={(e) => setConcernType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none"
                >
                  <option value="Acne">Hormonal / Inflammatory Acne</option>
                  <option value="Hair Loss">Hair Thinning / Scalp Issue</option>
                  <option value="Pigmentation">Hyperpigmentation & Melasma</option>
                  <option value="Anti-Aging">Wrinkles & Elasticity Loss</option>
                  <option value="Eczema / Redness">Rosacea & Skin Sensitivity</option>
                  <option value="General Dermatology">General Dermatological Consult</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Describe Symptoms & Current Routine
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Flareups along cheeks and jawline for the past 2 months, currently using AHA cleansers..."
                  value={concernDescription}
                  onChange={(e) => setConcernDescription(e.target.value)}
                  className="w-full p-3 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-500/20 active:scale-98 transition disabled:opacity-50 mt-2"
              >
                {loading ? 'Confirming Appointment...' : `Book Consultation • $${doctor.consultationFee}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
