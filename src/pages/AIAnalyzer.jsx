import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  RefreshCw,
  Sun,
  Moon,
  Calendar,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SkinScannerOverlay from '../components/SkinScannerOverlay';
import ProductCard from '../components/ProductCard';

export default function AIAnalyzer() {
  const { user } = useAuth();
  const { addMultipleToCart } = useCart();

  const [analysisType, setAnalysisType] = useState('skin'); // 'skin' | 'hair'
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [addedAll, setAddedAll] = useState(false);

  // Sample quick images
  const sampleSkinPhoto = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80";
  const sampleHairPhoto = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80";

  const handleSelectSample = (type) => {
    setAnalysisType(type);
    const sample = type === 'hair' ? sampleHairPhoto : sampleSkinPhoto;
    setPreviewUrl(sample);
    setSelectedFile(null);
    setResult(null);
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
      setError('');
    }
  };

  const handleRunScan = async () => {
    if (!previewUrl) {
      setError('Please upload a photo or select a sample image first.');
      return;
    }

    setError('');
    setIsScanning(true);

    try {
      const formData = new FormData();
      formData.append('analysisType', analysisType);
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else {
        formData.append('imageUrl', previewUrl);
      }

      // Simulate 2.4s AI scanning phase for cinematic feedback
      setTimeout(async () => {
        try {
          const res = await api.analyzeImage(formData);
          setResult(res);
          setIsScanning(false);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } catch (scanErr) {
          setError(scanErr.message || 'Analysis failed. Please try again.');
          setIsScanning(false);
        }
      }, 2200);
    } catch (err) {
      setError(err.message || 'Scanning failed');
      setIsScanning(false);
    }
  };

  const handleAddEntireRoutine = () => {
    if (result?.recommendedProducts?.length) {
      addMultipleToCart(result.recommendedProducts);
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title & Type Switcher */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Clinical Computer Vision Diagnostics</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          AI Skin & Scalp Analyzer
        </h1>

        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
          Upload a clear photo to diagnose epidermal hydration, barrier resilience, sebum balance, and follicle health.
        </p>

        {/* Tab switch */}
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-200/80 dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
          <button
            onClick={() => {
              setAnalysisType('skin');
              setResult(null);
              if (!selectedFile) setPreviewUrl(sampleSkinPhoto);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${
              analysisType === 'skin'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Facial Skin Analysis
          </button>
          <button
            onClick={() => {
              setAnalysisType('hair');
              setResult(null);
              if (!selectedFile) setPreviewUrl(sampleHairPhoto);
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${
              analysisType === 'hair'
                ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Hair & Scalp Diagnostic
          </button>
        </div>
      </div>

      {/* Upload and Scanner Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Box / Image Preview */}
        <div className="lg:col-span-6 bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              <span>Step 1: Capture or Select Photo</span>
            </h3>
            {previewUrl && (
              <button
                onClick={() => {
                  setPreviewUrl('');
                  setSelectedFile(null);
                  setResult(null);
                }}
                className="text-xs text-rose-500 hover:underline"
              >
                Clear Photo
              </button>
            )}
          </div>

          {/* Interactive photo box */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 flex flex-col items-center justify-center">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Scan target preview"
                  className="w-full h-full object-cover object-center"
                />
                <SkinScannerOverlay isScanning={isScanning} type={analysisType} />
              </>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Click to browse photo
                  </label>
                  <p className="text-xs text-stone-500 mt-1">PNG, JPG, or WEBP up to 10MB</p>
                </div>
              </div>
            )}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Sample quick buttons */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
              Instant Demo Presets:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectSample('skin')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition"
              >
                📸 Load Sample Face (Skin)
              </button>
              <button
                type="button"
                onClick={() => handleSelectSample('hair')}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition"
              >
                💇 Load Sample Scalp (Hair)
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs">
              {error}
            </div>
          )}

          {/* Run Analysis CTA */}
          <button
            onClick={handleRunScan}
            disabled={isScanning || !previewUrl}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-rose-500/20 active:scale-98 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Multi-Spectral Diagnostics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Execute AI Diagnostic Scan</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Instructions & Clinical Privacy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-4">
            <h3 className="font-serif font-bold text-lg text-amber-900 dark:text-amber-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <span>Scanning Guidelines for Best Results</span>
            </h3>
            <ul className="space-y-3 text-xs text-amber-900/80 dark:text-amber-300/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Even Natural Lighting:</strong> Stand near daylight or soft diffuse light without direct harsh glare.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Cleansed Surface:</strong> Bare skin or washed scalp provides accurate sebum & pore readings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>No Filters:</strong> Unretouched camera images ensure precision ingredient formulation.</span>
              </li>
            </ul>
          </div>

          {/* Privacy badge */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400 space-y-2">
            <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Diagnostic Privacy Guarantee</span>
            </div>
            <p>
              Your uploaded scans are processed locally and securely. Images are solely utilized for dermal feature extraction and custom routine formulation.
            </p>
          </div>
        </div>
      </div>

      {/* RESULTS DISPLAY SECTION (Rendered when result is available) */}
      {result && (
        <div className="space-y-12 pt-8 border-t border-stone-200 dark:border-stone-800 animate-fade-in">
          {/* Header Summary */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 border border-amber-500/20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Overall Score Circle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-md">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-200 dark:text-stone-800"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-500 transition-all duration-1000"
                    strokeDasharray={`${result.overallScore}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-mono text-4xl font-extrabold text-stone-900 dark:text-stone-100">
                    {result.overallScore}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                    Health Index
                  </span>
                </div>
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mt-3">
                {result.skinTypeOrHairType}
              </h4>
            </div>

            {/* AI Summary and Detected Concerns */}
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> AI Diagnostic Complete
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Clinical Biomarker Summary
              </h3>

              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {result.aiSummary}
              </p>

              {/* Detected concerns pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Identified Concerns & Severity:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {result.detectedConcerns?.map((dc, i) => (
                    <div
                      key={i}
                      className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 dark:text-stone-100">
                          {dc.concern}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            dc.severity === 'High'
                              ? 'bg-rose-500/15 text-rose-600'
                              : 'bg-amber-500/15 text-amber-600'
                          }`}
                        >
                          {dc.severity} ({dc.confidence}% conf)
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                        {dc.recommendationNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Granular Biomarker Gauges */}
          <div className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-500" />
              <span>Multi-Metric Breakdown</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(result.metrics || {}).map(([key, val]) => (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800/80 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold capitalize text-stone-700 dark:text-stone-300">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {val}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PERSONALIZED ROUTINE SCHEDULE */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                Tailored Dermal Regimen
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mt-1">
                Your Prescribed Daily Schedule
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Morning Routine */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col">
                <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800 text-amber-600 dark:text-amber-400 mb-4">
                  <Sun className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Morning Routine (AM)
                  </h4>
                </div>

                <div className="space-y-4 flex-1">
                  {result.recommendedRoutine?.morning?.map((step) => (
                    <div key={step.step} className="flex gap-3 text-xs">
                      <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">{step.title}</p>
                        <p className="text-stone-500 dark:text-stone-400 mt-0.5">{step.purpose}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 font-medium">
                          Actives: {step.keyIngredient}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evening Routine */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col">
                <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800 text-purple-600 dark:text-purple-400 mb-4">
                  <Moon className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Evening Routine (PM)
                  </h4>
                </div>

                <div className="space-y-4 flex-1">
                  {result.recommendedRoutine?.evening?.map((step) => (
                    <div key={step.step} className="flex gap-3 text-xs">
                      <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">{step.title}</p>
                        <p className="text-stone-500 dark:text-stone-400 mt-0.5">{step.purpose}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-purple-800 dark:text-purple-300 font-medium">
                          Actives: {step.keyIngredient}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Treatment */}
              <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col">
                <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100 dark:border-stone-800 text-rose-600 dark:text-rose-400 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Weekly Intensive Care
                  </h4>
                </div>

                <div className="space-y-4 flex-1">
                  {result.recommendedRoutine?.weekly?.map((step) => (
                    <div key={step.step} className="flex gap-3 text-xs">
                      <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-stone-100">{step.title}</p>
                        <p className="text-stone-500 dark:text-stone-400 mt-0.5">{step.purpose}</p>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-rose-800 dark:text-rose-300 font-medium">
                          Actives: {step.keyIngredient}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MATCHED PRODUCTS & ONE-CLICK ROUTINE CART */}
          <div className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">
                  Targeted Formulations
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Recommended Products For Your Profile
                </h3>
              </div>

              {result.recommendedProducts?.length > 0 && (
                <button
                  onClick={handleAddEntireRoutine}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition active:scale-95 ${
                    addedAll
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-amber-600 to-rose-600 text-white hover:brightness-105'
                  }`}
                >
                  {addedAll ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" /> Added Entire Routine to Bag!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add Entire Routine to Bag
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {result.recommendedProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
