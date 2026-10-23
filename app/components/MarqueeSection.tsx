"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const marqueeItems = [
  "ANTI-WEAR PROTECTION",
  "●",
  "THERMAL STABILITY",
  "●",
  "DEPOSIT CONTROL",
  "●",
  "HIGH-MILEAGE FORMULA",
  "●",
  "API SM/CF CERTIFIED",
  "●",
  "MADE IN UAE",
  "●",
];

export default function MarqueeSection() {
  return (
    <section className="relative py-6 overflow-hidden border-y border-surface-border bg-surface/50">
      <div className="flex whitespace-nowrap">
        <div className="marquee flex items-center gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`text-lg md:text-xl font-bold tracking-widest ${
                item === "●"
                  ? "text-orange-primary text-sm"
                  : "text-white/20"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="marquee flex items-center gap-8" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`text-lg md:text-xl font-bold tracking-widest ${
                item === "●"
                  ? "text-orange-primary text-sm"
                  : "text-white/20"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
