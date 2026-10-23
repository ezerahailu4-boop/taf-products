"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import gsap from "gsap";

const EngineOilBottle3D = dynamic(() => import("./EngineOilBottle3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin" />
    </div>
  ),
});

const PARTICLES = [
  { left: "12%", top: "18%", duration: 5.2, delay: 0.5 },
  { left: "24%", top: "65%", duration: 6.8, delay: 1.2 },
  { left: "38%", top: "25%", duration: 4.5, delay: 2.1 },
  { left: "45%", top: "80%", duration: 7.1, delay: 0.8 },
  { left: "58%", top: "15%", duration: 5.9, delay: 1.7 },
  { left: "67%", top: "72%", duration: 4.8, delay: 2.4 },
  { left: "75%", top: "35%", duration: 6.2, delay: 0.3 },
  { left: "82%", top: "60%", duration: 5.5, delay: 1.9 },
  { left: "88%", top: "20%", duration: 7.5, delay: 2.8 },
  { left: "15%", top: "85%", duration: 4.9, delay: 1.5 },
  { left: "92%", top: "45%", duration: 6.4, delay: 0.9 },
  { left: "30%", top: "40%", duration: 5.8, delay: 2.2 },
  { left: "52%", top: "55%", duration: 4.3, delay: 0.4 },
  { left: "62%", top: "90%", duration: 6.7, delay: 1.8 },
  { left: "78%", top: "10%", duration: 5.1, delay: 2.6 },
  { left: "8%", top: "45%", duration: 7.0, delay: 1.1 },
  { left: "42%", top: "12%", duration: 4.6, delay: 2.0 },
  { left: "85%", top: "82%", duration: 6.3, delay: 0.7 },
  { left: "20%", top: "30%", duration: 5.7, delay: 1.4 },
  { left: "70%", top: "50%", duration: 4.7, delay: 2.5 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [heroView, setHeroView] = useState<"3d" | "photo">("3d");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background
      gsap.to(".hero-bg", {
        yPercent: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      id="hero"
    >
      {/* Background image & Luminous Studio Lighting (Brightened & High Contrast) */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="TAF Energies Studio Background"
          fill
          className="object-cover opacity-60"
          priority
          quality={90}
        />
        {/* Ambient warm orange and slate illumination */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(255,102,0,0.28),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_65%,rgba(30,58,138,0.22),transparent_55%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-primary/30"
            style={{
              left: p.left,
              top: p.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div ref={headingRef}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-primary/30 bg-orange-primary/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
              <span className="text-orange-primary text-xs tracking-widest uppercase font-medium">
                Premium Engine Oil
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tighter mb-6"
            >
              <span className="block text-white">MASTER</span>
              <span className="block text-gradient-orange">OPTIMA</span>
            </motion.h1>

            {/* Viscosity badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-black text-white">
                  20W-50
                </span>
                <span className="text-orange-primary font-bold text-xl">SM</span>
              </div>
              <div className="h-12 w-[1px] bg-surface-border" />
              <div className="flex flex-col">
                <span className="text-text-muted text-xs tracking-widest uppercase">
                  API Grade
                </span>
                <span className="text-white font-semibold">SM/CF</span>
              </div>
            </motion.div>

            {/* Description - High contrast & readable */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-slate-200 text-lg md:text-xl max-w-lg leading-relaxed mb-10"
            >
              Premium multi-grade gasoline engine oil engineered for maximum
              protection against wear, deposits, and thermal breakdown. Built
              for older and high-mileage vehicles that demand peak reliability.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#buy"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-light text-black font-extrabold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,107,0,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore in 3D
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="#specs"
                className="px-8 py-4 border-2 border-orange-primary/40 bg-slate-900/60 text-white font-semibold text-lg rounded-full hover:border-orange-primary hover:bg-orange-primary/10 transition-all backdrop-blur-sm"
              >
                3D Interactive Specs
              </a>
            </motion.div>
          </div>

          {/* Right - Interactive 3D Model or Studio Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="relative flex flex-col items-center justify-center min-h-[520px] md:min-h-[620px]"
          >
            {/* Ambient Studio Backlight */}
            <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-br from-orange-primary/30 to-amber-500/20 blur-[90px] pointer-events-none" />

            {/* View Mode Toggle Pill */}
            <div className="relative z-20 mb-4 flex items-center gap-2 p-1.5 rounded-full bg-slate-900/90 border border-orange-500/40 backdrop-blur-md shadow-xl">
              <button
                onClick={() => setHeroView("photo")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  heroView === "photo"
                    ? "bg-gradient-to-r from-orange-primary to-orange-light text-black shadow-lg shadow-orange-500/40"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span>📸</span> Original Product Photo
              </button>
              <button
                onClick={() => setHeroView("3d")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  heroView === "3d"
                    ? "bg-gradient-to-r from-orange-primary to-orange-light text-black shadow-lg shadow-orange-500/40"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <span>🎮</span> Live 3D Canister
              </button>
            </div>

            {/* Container for 3D or Photo */}
            <div className="relative w-full h-[480px] md:h-[540px] flex items-center justify-center">
              {heroView === "3d" ? (
                <div className="w-full h-full">
                  <EngineOilBottle3D
                    mode="studio"
                    interactive={true}
                    showControls={true}
                    className="w-full h-full"
                  />
                </div>
              ) : (
                <div className="relative w-full max-w-md float-animation flex flex-col items-center justify-center">
                  <div className="relative p-3 rounded-3xl bg-gradient-to-b from-white/10 via-slate-900/40 to-slate-950/80 border border-orange-primary/30 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    <Image
                      src="/actual-product.png"
                      alt="TAF Energies PLC Master Optima 20W-50 Gasoline Engine Oil - Authentic Canister"
                      width={500}
                      height={680}
                      className="object-contain drop-shadow-[0_20px_50px_rgba(255,102,0,0.35)] max-h-[440px] rounded-2xl"
                      priority
                    />
                  </div>
                  <span className="mt-3 text-[11px] font-bold text-orange-400 uppercase tracking-widest bg-slate-950/80 px-3 py-1 rounded-full border border-orange-500/30">
                    Official 4L Bottle • UAE Certified
                  </span>
                </div>
              )}

              {/* Floating specs badges - High visibility glass */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-2 glass-card px-4 py-2.5 rounded-xl border border-orange-primary/40 shadow-xl pointer-events-none z-10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-primary animate-pulse" />
                  <span className="text-white font-bold text-sm tracking-wide">4 Litres Net</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-6 left-2 glass-card px-4 py-2.5 rounded-xl border border-orange-primary/40 shadow-xl pointer-events-none z-10"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🇦🇪</span>
                  <span className="text-white font-bold text-sm tracking-wide">Engineered in UAE</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-text-muted/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-orange-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
