"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ahmed Al-Rashid",
    role: "Fleet Manager, Dubai Transport Co.",
    quote:
      "After switching our entire fleet of 120+ vehicles to Master Optima, our engine maintenance costs dropped by 30%. The difference in performance is undeniable.",
    rating: 5,
  },
  {
    name: "David Kimura",
    role: "Classic Car Restorer",
    quote:
      "For my vintage collection, I need an oil that understands older engines. Master Optima 20W-50 has been a revelation — smoother operation, less oil consumption, and perfect protection.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Professional Mechanic, 15+ years",
    quote:
      "I've tested dozens of engine oils in my career. Master Optima consistently delivers the cleanest drain samples I've ever seen. It's what I recommend to every customer.",
    rating: 5,
  },
];

function AnimatedCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));
      if (progress >= 1) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-gradient-orange mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-text-muted text-sm tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-orange-primary/10 via-amber-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats Counter */}
        <div className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-8 rounded-3xl border border-orange-primary/35 glass-card shadow-2xl">
            <AnimatedCounter target={50} suffix="M+" label="Litres Produced" />
            <AnimatedCounter target={35} suffix="+" label="Countries" />
            <AnimatedCounter target={98} suffix="%" label="Satisfaction" />
            <AnimatedCounter target={15} suffix="+" label="Years Trusted" />
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-orange-primary text-xs tracking-[0.3em] uppercase font-bold px-4 py-1.5 rounded-full border border-orange-primary/40 bg-orange-primary/10 inline-block shadow-sm">
            Trusted Worldwide
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mt-4 text-white">
            WHAT EXPERTS <span className="text-gradient-orange">SAY</span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative p-8 rounded-3xl border border-orange-primary/30 glass-card glass-card-hover shadow-xl transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="text-7xl font-black text-orange-primary/20 absolute top-4 right-6 leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, si) => (
                  <svg
                    key={si}
                    className="w-5 h-5 text-orange-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote - High contrast */}
              <p className="text-slate-200 leading-relaxed mb-6 text-base font-normal">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-primary to-orange-dark flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-orange-500/30">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-orange-400 font-medium text-xs">{testimonial.role}</div>
                </div>
              </div>

              {/* Bottom border glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
