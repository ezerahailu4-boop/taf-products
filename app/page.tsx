"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import FeaturesSection from "./components/FeaturesSection";
import StorySection from "./components/StorySection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import 3D section to avoid SSR issues
const ThreeDSection = dynamic(
  () => import("./components/ThreeDSection"),
  {
    ssr: false,
    loading: () => (
      <section className="relative py-32 overflow-hidden" id="specs">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 border-2 border-orange-primary/30 border-t-orange-primary rounded-full animate-spin mx-auto" />
        </div>
      </section>
    ),
  }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    document.body.classList.remove("loading-active");
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("loading-active");
    }
  }, [isLoading]);

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Main content */}
      <main className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <StorySection />
        <FeaturesSection />
        <ThreeDSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
