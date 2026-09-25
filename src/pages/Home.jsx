import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Camera,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle,
  Activity,
  Heart,
  Calendar,
  Sparkle
} from 'lucide-react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [prods, docs] = await Promise.all([
          api.getProducts(),
          api.getDoctors()
        ]);
        setFeaturedProducts(prods.slice(0, 4));
        setDoctors(docs.slice(0, 3));
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 pb-12 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-400/20 via-rose-400/20 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>Next-Gen Computer Vision Derm Diagnostics</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.12]">
                Your Skin & Hair, <br />
                <span className="beauty-gradient-text">Clinically Decoded by AI.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Upload a photo to detect barrier health, hydration, sebum levels, and follicle density. Receive bespoke AM/PM routines, clean cosmetics, and certified dermatologist appointments.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/analyze"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white font-semibold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-rose-500/25 active:scale-98 transition group"
                >
                  <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Start Free AI Scan</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/marketplace"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <span>Explore Marketplace</span>
                </Link>
              </div>

              {/* Trust micro-stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-200/80 dark:border-stone-800/80 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">98.4%</div>
                  <div className="text-[11px] text-stone-500">Diagnostic Accuracy</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">40,000+</div>
                  <div className="text-[11px] text-stone-500">Scans Analyzed</div>
                </div>
                <div>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">100%</div>
                  <div className="text-[11px] text-stone-500">Cruelty-Free Actives</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-amber-400/30 via-rose-300/30 to-purple-400/30 shadow-2xl">
                <div className="relative rounded-[22px] overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                    alt="Facial Diagnostic Scan Simulation"
                    className="w-full h-96 object-cover object-center opacity-90"
                  />

                  {/* Laser scan line overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent pointer-events-none"></div>

                  {/* Floating AI Diagnostic Readout Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white">
                    <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-[11px] font-mono text-amber-300 flex items-center gap-1.5 border border-amber-400/30">
                      <Activity className="w-3 h-3 text-amber-400 animate-pulse" /> AI Biometric Match
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-[11px] font-bold text-white shadow-sm">
                      89% Health Score
                    </span>
                  </div>

                  {/* Bottom Scan Preview Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-left text-white space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-stone-200">Hydration Index</span>
                      <span className="font-mono text-emerald-400 font-bold">82% (Optimal)</span>
                    </div>
                    <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1">
                      <span className="font-semibold text-stone-200">Barrier Resilience</span>
                      <span className="font-mono text-amber-400 font-bold">78% (Healthy)</span>
                    </div>
                    <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / 3-STEP FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
            Precision Dermatological Pipeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mt-2">
            How GlowAI Elevates Your Regimen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-serif text-xl font-bold mb-6">
              01
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
              Multi-Spectral AI Scan
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Upload a clear photo of your face or scalp. Our diagnostic algorithms measure 6 clinical biomarkers including pore clarity, lipid ratio, and follicle density.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-serif text-xl font-bold mb-6">
              02
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
              Bespoke Regimen Generation
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Receive personalized 3-step Morning & Night routines synced with exact active ingredients like Ceramides, BHA Salicylic Acid, and Redensyl Peptides.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-serif text-xl font-bold mb-6">
              03
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 mb-2">
              Doctor Telehealth & Tracking
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Book one-on-one video sessions with certified dermatologists & trichologists, track daily routine streaks, and log skin progress over time.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED BESTSELLER MARKETPLACE PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
              Clean Medical Grade Formulations
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
              Trending Skincare & Haircare
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* CERTIFIED DERMATOLOGISTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-purple-500/10 border border-stone-200/80 dark:border-stone-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400">
                Board Certified Dermatological Care
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                Meet Our Clinical Specialists
              </h2>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline"
            >
              <span>Explore All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/30"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{doctor.rating}</span>
                      <span>({doctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
                  {doctor.bio}
                </p>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    From <strong className="font-mono text-stone-900 dark:text-stone-100">${doctor.consultationFee}</strong>
                  </span>
                  <Link
                    to="/doctors"
                    className="px-3.5 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition"
                  >
                    Book Consult
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCAN CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white text-center shadow-2xl border border-stone-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-400/30">
              <Sparkle className="w-3.5 h-3.5" /> 100% Free Diagnostic Scan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Discover Your True Skin & Scalp Metrics?
            </h2>
            <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
              Join thousands who replaced guesswork with clinical AI analysis and saw measurable barrier improvements in under 21 days.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                to="/analyze"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:brightness-110 active:scale-95 transition"
              >
                Scan Your Face or Scalp Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
