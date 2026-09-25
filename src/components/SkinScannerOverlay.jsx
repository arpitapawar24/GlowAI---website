import React, { useEffect, useState } from 'react';
import { Scan, ShieldAlert, Cpu } from 'lucide-react';

export default function SkinScannerOverlay({ isScanning, type = 'skin' }) {
  const [statusIdx, setStatusIdx] = useState(0);

  const skinStages = [
    "Aligning facial landmarks & focal depth...",
    "Analyzing epidermal hydration & barrier lipid ratio...",
    "Detecting erythema & pore micro-congestion...",
    "Measuring dermal elasticity & photoaging index...",
    "Synthesizing customized clinical routine..."
  ];

  const hairStages = [
    "Calibrating follicular density & scalp illumination...",
    "Analyzing sebum build-up & stratum corneum flaking...",
    "Detecting hairline recession & follicle miniaturization...",
    "Synthesizing customized trichological routine..."
  ];

  const stages = type === 'hair' ? hairStages : skinStages;

  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % stages.length);
    }, 600);
    return () => clearInterval(interval);
  }, [isScanning, stages.length]);

  if (!isScanning) return null;

  return (
    <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-20 flex flex-col justify-between p-6 bg-black/35 backdrop-blur-[2px]">
      {/* Corner bounding markers */}
      <div className="flex justify-between w-full">
        <div className="w-8 h-8 border-t-3 border-l-3 border-amber-400 rounded-tl-lg shadow-sm"></div>
        <div className="w-8 h-8 border-t-3 border-r-3 border-amber-400 rounded-tr-lg shadow-sm"></div>
      </div>

      {/* Center scanning line */}
      <div className="absolute left-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#fbbf24] animate-scan"></div>

      {/* Target reticle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 sm:w-64 sm:h-64 border border-dashed border-amber-400/50 rounded-full animate-spin-slow"></div>
        <div className="absolute w-2 h-2 rounded-full bg-amber-400 animate-ping"></div>
      </div>

      {/* Bottom diagnostic readouts */}
      <div className="flex justify-between items-end w-full">
        <div className="w-8 h-8 border-b-3 border-l-3 border-amber-400 rounded-bl-lg shadow-sm"></div>

        {/* Live scanning pill */}
        <div className="px-4 py-2 rounded-2xl bg-stone-900/90 border border-amber-400/40 text-amber-300 text-xs font-mono flex items-center gap-2 shadow-xl backdrop-blur-md">
          <Cpu className="w-4 h-4 animate-spin text-amber-400" />
          <span>{stages[statusIdx]}</span>
        </div>

        <div className="w-8 h-8 border-b-3 border-r-3 border-amber-400 rounded-br-lg shadow-sm"></div>
      </div>
    </div>
  );
}
