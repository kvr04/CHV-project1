"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { initLenis, destroyLenis } from "@/lib/lenis";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import FloatingNav from "@/components/ui/FloatingNav";
import dynamic from "next/dynamic";

const AtmosphericParticles = dynamic(
  () => import("@/components/three/AtmosphericParticles"),
  { ssr: false }
);
import HeroSection from "@/components/sections/HeroSection";
import SuitesSection from "@/components/sections/SuitesSection";
import WellnessSection from "@/components/sections/WellnessSection";
import DiningSection from "@/components/sections/DiningSection";
import FitnessSection from "@/components/sections/FitnessSection";
import ConciergeAI from "@/components/sections/ConciergeAI";
import InteractiveMap from "@/components/sections/InteractiveMap";
import GallerySection from "@/components/sections/GallerySection";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initLenis();

    let lenisRaf: ((time: number) => void) | null = null;

    if (lenis) {
      // Sync Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      lenisRaf = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);
    }

    // Refresh ScrollTrigger after layout settles
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener("load", onLoad);
      if (lenisRaf) gsap.ticker.remove(lenisRaf);
      destroyLenis();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader />
      <FloatingNav />

      <main ref={mainRef} className="relative z-10 w-full min-h-screen">
        {/* Three.js canvas in the background */}
        <AtmosphericParticles />

        {/* Hero Section */}
        <HeroSection />

        {/* Suites Section */}
        <SuitesSection />

        {/* Dining Section (Dark candlelight transition) */}
        <DiningSection />

        {/* Wellness Section */}
        <WellnessSection />

        {/* Fitness Section */}
        <FitnessSection />

        {/* Concierge Section */}
        <ConciergeAI />

        {/* Interactive Map */}
        <InteractiveMap />

        {/* Gallery Section */}
        <GallerySection />

        {/* Testimonials */}
        <Testimonials />

        {/* Final CTA */}
        <FinalCTA />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
