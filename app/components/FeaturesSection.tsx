"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 6V12L16 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Extended Engine Life",
    description:
      "Advanced additive technology extends engine life by up to 40%, keeping your vehicle running at peak performance for longer.",
    stat: "40%",
    statLabel: "Longer Engine Life",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Thermal Breakdown Shield",
    description:
      "Engineered to withstand extreme temperatures without degradation, ensuring consistent viscosity from cold starts to high-heat operation.",
    stat: "260°C",
    statLabel: "Heat Resistance",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Deposit Control",
    description:
      "Superior detergent and dispersant additives prevent sludge and varnish buildup, keeping engine internals pristinely clean.",
    stat: "99.2%",
    statLabel: "Clean Engine",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "High-Mileage Care",
    description:
      "Specially formulated for engines with 75,000+ miles. Seal conditioners rejuvenate aging seals and reduce oil consumption.",
    stat: "75K+",
    statLabel: "Miles Optimized",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards stagger on scroll
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative py-32 overflow-hidden"
    >
      {/* Background - Luminous studio ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-primary/15 via-amber-500/10 to-transparent blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-orange-primary text-xs tracking-[0.3em] uppercase font-bold px-4 py-1.5 rounded-full border border-orange-primary/40 bg-orange-primary/10 inline-block shadow-sm"
          >
            Engineered Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mt-4 mb-6"
          >
            <span className="text-white">WHY </span>
            <span className="text-gradient-orange">MASTER OPTIMA</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Every drop is precision-engineered to deliver unmatched protection
            and performance for older and high-mileage gasoline engines.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card group relative p-8 rounded-3xl border border-orange-primary/30 glass-card glass-card-hover overflow-hidden shadow-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-primary/10 to-transparent" />

              <div className="relative z-10 flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-orange-primary/15 border border-orange-primary/40 flex items-center justify-center text-orange-primary shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200 leading-relaxed text-base mb-5">
                    {feature.description}
                  </p>

                  {/* Stat */}
                  <div className="flex items-baseline gap-3 pt-2 border-t border-white/10">
                    <span className="text-3xl md:text-4xl font-black text-gradient-orange">
                      {feature.stat}
                    </span>
                    <span className="text-slate-300 text-xs tracking-wider uppercase font-semibold">
                      {feature.statLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-primary/10 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
