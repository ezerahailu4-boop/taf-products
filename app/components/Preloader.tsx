"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1200);
          }, 400);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 30);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-black"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,102,0,0.25) 0%, rgba(255,140,0,0.1) 40%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 mb-10 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="text-white">TAF</span>
              <span className="text-gradient-orange ml-3">ENERGIES</span>
            </h1>
            <p className="text-orange-400 font-bold text-xs tracking-[0.4em] uppercase mt-2">
              PLC • DUBAI, UAE
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "320px" }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative z-10"
          >
            <div className="h-[3px] w-[320px] bg-slate-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
              <motion.div
                className="h-full rounded-full shadow-lg shadow-orange-500/50"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background:
                    "linear-gradient(90deg, #FF5500, #FFAA00)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-slate-300 text-xs tracking-wider uppercase font-semibold">
                Initializing 3D Studio
              </span>
              <span className="text-orange-400 text-xs font-mono font-bold">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
