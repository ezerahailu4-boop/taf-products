"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const EngineOilBottle3D = dynamic(() => import("./EngineOilBottle3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-orange-primary/40 border-t-orange-primary rounded-full animate-spin" />
    </div>
  ),
});

const SPECS = [
  { label: "Viscosity Grade", value: "SAE 20W-50", highlight: true },
  { label: "API Certification", value: "SM / CF", highlight: true },
  { label: "Net Volume", value: "4 Litres Net", highlight: false },
  { label: "Base Oil Technology", value: "Group II+ Hydrotreated", highlight: false },
  { label: "Pour Point", value: "-24°C Cold Start", highlight: false },
  { label: "Flash Point", value: "245°C High Stability", highlight: true },
  { label: "Total Base Number (TBN)", value: "9.2 mg KOH/g", highlight: false },
  { label: "Manufacturing Origin", value: "United Arab Emirates 🇦🇪", highlight: true },
];

export default function ThreeDSection() {
  const [active3DMode, setActive3DMode] = useState<"studio" | "shield" | "thermal">("studio");

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950" id="specs">
      {/* Studio Radial Illumination - High Visibility */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-orange-primary/20 via-amber-500/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-primary/40 bg-orange-primary/10 mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
            <span className="text-orange-primary text-xs tracking-widest uppercase font-bold">
              3D Interactive Product Experience
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
            INSPECT IN <span className="text-gradient-orange">FULL 3D</span>
          </h2>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
            Rotate the Master Optima 20W-50 canister in 360°, inspect the fluid viscosity gauge, and switch simulation modes to visualize extreme thermal endurance.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Interactive Canvas & Mode Controls (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative h-[520px] md:h-[620px] rounded-3xl glass-card overflow-hidden border border-orange-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              {/* Studio Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              
              {/* 3D Model */}
              <EngineOilBottle3D
                mode={active3DMode}
                interactive={true}
                showControls={false}
                className="w-full h-full"
              />

              {/* Mode Control Bar Inside Box */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-20 pointer-events-auto">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                  Active Mode: <span className="text-orange-primary">{active3DMode.toUpperCase()}</span>
                </span>

                <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-orange-primary/40 backdrop-blur-md shadow-lg">
                  <button
                    onClick={() => setActive3DMode("studio")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active3DMode === "studio"
                        ? "bg-gradient-to-r from-orange-primary to-orange-light text-black shadow-md shadow-orange-500/40"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    ✨ Studio
                  </button>
                  <button
                    onClick={() => setActive3DMode("shield")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active3DMode === "shield"
                        ? "bg-gradient-to-r from-sky-500 to-cyan-400 text-black shadow-md shadow-sky-500/40"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🛡️ Wear Shield
                  </button>
                  <button
                    onClick={() => setActive3DMode("thermal")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      active3DMode === "thermal"
                        ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-red-500/40"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    🔥 300°C Heat
                  </button>
                </div>
              </div>

              {/* Bottom Helper Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none text-xs text-slate-300">
                <span className="bg-slate-900/80 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                  🖱️ Click and drag to orbit 360°
                </span>
                <span className="bg-slate-900/80 px-3 py-1 rounded-md border border-white/10 backdrop-blur-sm text-orange-primary font-bold">
                  High-Viscosity Amber Fluid Simulation
                </span>
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications Grid (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <span className="text-orange-primary font-bold text-xs uppercase tracking-[0.25em] block mb-2">
                Certified Formulation
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Molecular Engineering & Specifications
              </h3>
              <p className="text-slate-300 text-base mt-3 leading-relaxed">
                Formulated with premium Group II+ hydrotreated base stocks and advanced shear-stable viscosity index improvers.
              </p>
            </div>

            {/* High-Contrast Specs Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {SPECS.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className={`p-4 rounded-2xl glass-card glass-card-hover border transition-all ${
                    spec.highlight
                      ? "border-orange-primary/50 bg-gradient-to-br from-orange-500/15 via-slate-900/90 to-slate-900/95"
                      : "border-slate-700/60 bg-slate-900/80"
                  }`}
                >
                  <span className="text-slate-400 text-[11px] font-semibold tracking-wider uppercase block mb-1">
                    {spec.label}
                  </span>
                  <span className={`text-base md:text-lg font-bold block ${spec.highlight ? "text-orange-400 font-extrabold" : "text-white"}`}>
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#buy"
                className="w-full py-4 text-center bg-gradient-to-r from-orange-primary to-orange-light text-black font-extrabold text-base rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all"
              >
                Explore 360° Product Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
