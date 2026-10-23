"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const EngineOilBottle3D = dynamic(() => import("./EngineOilBottle3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-orange-primary/40 border-t-orange-primary rounded-full animate-spin" />
    </div>
  ),
});

const packagingSizes = [
  { size: "1L", desc: "Top-up & emergency carry", highlight: false },
  { size: "4L", desc: "Standard passenger car service", highlight: true },
  { size: "5L", desc: "Large sump & SUV capacity", highlight: false },
  { size: "20L", desc: "Commercial fleet & workshop pail", highlight: false },
];

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [is3DMode, setIs3DMode] = useState(true);

  return (
    <section
      ref={sectionRef}
      id="buy"
      className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950"
    >
      <div id="product" className="absolute -top-20" />

      {/* Radiant studio ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-primary/20 via-amber-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-primary/40 bg-orange-primary/10 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
            <span className="text-orange-primary text-xs tracking-widest uppercase font-bold">
              360° Product Studio
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4">
            EXPERIENCE <span className="text-gradient-orange">MASTER OPTIMA</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Interact with certified UAE engineering in full 360° detail or inspect high-resolution studio photography.
          </p>
        </motion.div>

        {/* View Mode Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 border border-orange-primary/40 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setIs3DMode(true)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                is3DMode
                  ? "bg-gradient-to-r from-orange-primary to-orange-light text-black shadow-lg shadow-orange-500/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🎮 3D View (Rotate 360°)
            </button>
            <button
              onClick={() => setIs3DMode(false)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                !is3DMode
                  ? "bg-gradient-to-r from-orange-primary to-orange-light text-black shadow-lg shadow-orange-500/40"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              📸 Photo View
            </button>
          </div>
        </motion.div>

        {/* Interactive 3D Product Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto h-[480px] md:h-[600px] rounded-3xl glass-card border border-orange-primary/35 flex items-center justify-center overflow-hidden shadow-2xl"
        >
          {is3DMode ? (
            <div className="w-full h-full">
              <EngineOilBottle3D
                mode="studio"
                interactive={true}
                showControls={false}
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full max-w-md flex items-center justify-center float-animation p-6">
              <Image
                src="/actual-product.png"
                alt="TAF Master Optima 20W-50 - Authentic 4L Bottle"
                width={520}
                height={680}
                className="object-contain drop-shadow-[0_20px_60px_rgba(255,102,0,0.4)] max-h-[500px] rounded-2xl"
              />
            </div>
          )}

          {/* Bottom Indicators */}
          <div className="absolute bottom-4 left-4 z-10 glass-card px-4 py-2 rounded-xl border border-orange-primary/40 text-xs text-slate-200 flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
            <span className="font-bold">Original TAF Energies Guaranteed</span>
          </div>

          {is3DMode && (
            <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center gap-2 glass-card px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-slate-400 pointer-events-none">
              <span>🖱️ Drag to rotate</span>
              <span>•</span>
              <span>Scroll to zoom</span>
            </div>
          )}
        </motion.div>

        {/* Available Packaging Formats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <span className="text-slate-400 text-xs font-bold tracking-widest uppercase">
              Available Packaging Formats
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {packagingSizes.map((item, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border text-center transition-all ${
                  item.highlight
                    ? "border-orange-primary/60 bg-gradient-to-b from-orange-500/15 via-slate-900/90 to-slate-950 shadow-lg shadow-orange-500/20"
                    : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                {item.highlight && (
                  <span className="inline-block text-[10px] bg-gradient-to-r from-orange-primary to-orange-light text-black font-extrabold px-2.5 py-0.5 rounded-full uppercase mb-2">
                    Standard Pack
                  </span>
                )}
                <div className="font-black text-2xl md:text-3xl text-white mb-1">
                  {item.size}
                </div>
                <div className="text-xs text-slate-400 leading-snug">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quality Credentials Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 text-slate-300 text-xs md:text-sm font-medium border-t border-slate-800/80 pt-8"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            UAE Engineered Formulation
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            API SL / CF Certified Performance
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Thermal & Viscosity Stability
          </span>
        </motion.div>
      </div>
    </section>
  );
}
