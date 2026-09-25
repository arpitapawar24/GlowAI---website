import React, { useState, useEffect } from 'react';
import { Award, Star, Calendar, Clock, Video, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import ConsultationModal from '../components/ConsultationModal';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specialties = ['All', 'Acne Specialist', 'Trichologist', 'Anti-Aging', 'Dermatologist'];

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await api.getDoctors(specialtyFilter);
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [specialtyFilter]);

  const handleOpenBooking = (doc) => {
    setSelectedDoctor(doc);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Certified Telehealth Network</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Consult Top Dermatologists & Trichologists
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Book clinical 1-on-1 video sessions with board-certified physicians for acne, hair restoration, and barrier repair.
        </p>

        {/* Specialty Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                specialtyFilter === spec
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-stone-400">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mb-2" />
          <p className="text-xs">Connecting to physician directory...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-6">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-56 object-cover rounded-2xl ring-1 ring-stone-200 dark:ring-stone-800"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 text-xs font-mono flex items-center gap-1 border border-amber-400/30">
                    <Video className="w-3.5 h-3.5" /> Video Telehealth
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {doc.experienceYears}+ Years Clinical Experience
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-stone-900 dark:text-stone-100">{doc.rating}</span>
                    <span className="text-[11px] text-stone-400">({doc.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                  {doc.name}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mb-3">
                  {doc.qualifications}
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                  {doc.bio}
                </p>

                {/* Available Slots Preview */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Next Available Slot:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.availableSlots?.slice(0, 2).map((slot, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">Fee</span>
                  <div className="font-mono text-xl font-bold text-stone-900 dark:text-stone-100">
                    ${Number(doc.consultationFee).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(doc)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 active:scale-95 transition flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
}
