"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    tag: "01 — THE PROBLEM",
    title: "YOUR ENGINE\nDESERVES BETTER",
    description:
      "Conventional oils break down under extreme heat and pressure. Sludge accumulates, seals deteriorate, and your engine pays the price. Every mile without proper protection chips away at your engine's lifespan.",
    image: "/engine-closeup.jpg",
    imageAlt: "Engine close-up with oil pour",
  },
  {
    tag: "02 — THE SOLUTION",
    title: "FORGED IN\nPRECISION",
    description:
      "Master Optima 20W-50 is engineered with advanced molecular shielding technology. Our proprietary blend creates an unbreakable film between metal surfaces, reducing friction by up to 35% and extending drain intervals significantly.",
    image: "/oil-splash.jpg",
    imageAlt: "Golden oil splash",
  },
  {
    tag: "03 — THE RESULT",
    title: "RELENTLESS\nPROTECTION",
    description:
      "From scorching desert highways to cold morning startups, Master Optima delivers consistent viscosity and protection. Your engine runs cleaner, cooler, and stronger — mile after mile, year after year.",
    image: "/cta-bg.jpg",
    imageAlt: "Sports car in dramatic lighting",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin each story panel
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      panels.forEach((panel, i) => {
        const image = panel.querySelector(".story-image");
        const text = panel.querySelector(".story-text");

        // Parallax image
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: 20, scale: 1.1 },
            {
              yPercent: -20,
              scale: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }

        // Text reveal
        if (text) {
          gsap.fromTo(
            text,
            { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 65%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="overview" className="relative">
      {/* Section intro */}
      <div className="py-20 text-center">
        <div className="section-divider max-w-xs mx-auto mb-16" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter"
        >
          <span className="text-white">THE </span>
          <span className="text-gradient-orange">STORY</span>
        </motion.h2>
      </div>

      {/* Story panels */}
      {storySteps.map((step, i) => (
        <div
          key={i}
          className={`story-panel relative min-h-screen flex items-center ${
            i % 2 === 0 ? "" : ""
          }`}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="story-image absolute inset-0">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-cover opacity-85"
                quality={90}
              />
            </div>
            {/* Luminous gradient overlay - Brightened & warm */}
            <div
              className={`absolute inset-0 ${
                i % 2 === 0
                  ? "bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-transparent"
                  : "bg-gradient-to-l from-slate-950/95 via-slate-900/75 to-transparent"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-orange-primary/10 via-transparent to-slate-950/60 pointer-events-none" />
          </div>

          {/* Content inside high-contrast glass card */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
            <div
              className={`story-text max-w-xl p-8 md:p-10 rounded-3xl glass-card border border-orange-primary/35 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl ${
                i % 2 === 0 ? "mr-auto" : "ml-auto text-left"
              }`}
            >
              {/* Tag */}
              <span className="inline-block text-orange-primary text-xs tracking-[0.3em] uppercase font-bold mb-4 px-3.5 py-1.5 border border-orange-primary/40 bg-orange-primary/10 rounded-full">
                {step.tag}
              </span>

              {/* Title */}
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-6">
                {step.title.split("\n").map((line, li) => (
                  <span key={li} className="block">
                    {li === 1 ? (
                      <span className="text-gradient-orange">{line}</span>
                    ) : (
                      <span className="text-white">{line}</span>
                    )}
                  </span>
                ))}
              </h3>

              {/* Description - High contrast & readable */}
              <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Decorative line */}
              <div
                className="h-[3px] w-24 bg-gradient-to-r from-orange-primary via-orange-light to-transparent rounded-full"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
