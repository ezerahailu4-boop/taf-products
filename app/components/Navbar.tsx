"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Performance", href: "#performance" },
  { label: "Specs", href: "#specs" },
  { label: "Explore 3D", href: "#buy" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-2xl border-b border-orange-primary/30 shadow-2xl"
          : "bg-slate-950/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-orange-primary/50 shadow-md shadow-orange-500/20">
              <Image
                src="/taf-logo.jpg"
                alt="TAF Energies"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl leading-tight tracking-tight group-hover:text-orange-primary transition-colors">
                TAF
              </span>
              <span className="text-orange-400 font-bold text-[10px] tracking-[0.25em] uppercase">
                Energies PLC
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-sm tracking-wide font-semibold transition-all duration-300 ${
                  link.label === "Explore 3D"
                    ? "bg-gradient-to-r from-orange-primary to-orange-light hover:brightness-110 text-black font-extrabold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:scale-105"
                    : "text-slate-200 hover:text-orange-400 group"
                }`}
              >
                {link.label}
                {link.label !== "Explore 3D" && (
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange-primary transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-1.5"
          >
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-8 h-[2px] bg-white origin-center"
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[2px] bg-orange-primary"
            />
            <motion.span
              animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-8 h-[2px] bg-white origin-center"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl"
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`text-lg font-medium ${
                link.label === "Explore 3D"
                  ? "bg-orange-primary text-black font-bold px-6 py-3 rounded-full text-center mt-2"
                  : "text-text-muted hover:text-white transition-colors"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
