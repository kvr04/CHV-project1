"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ percent: number }>;
      setProgress(customEvent.detail.percent);
      if (customEvent.detail.percent >= 100 && !isLoaded) {
        setIsLoaded(true);
      }
    };

    window.addEventListener("hero-progress", handleProgress);

    // Safety fallback trigger for cache/instant load hits
    const fallbackTimeout = setTimeout(() => {
      if (!isLoaded) {
        setProgress(100);
        setIsLoaded(true);
      }
    }, 6000);

    return () => {
      window.removeEventListener("hero-progress", handleProgress);
      clearTimeout(fallbackTimeout);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && containerRef.current && textRef.current && barRef.current) {
      const tl = gsap.timeline();

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: "power3.inOut",
        },
        0.2
      )
        .to(
          barRef.current,
          {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.8,
            ease: "power3.inOut",
          },
          0.2
        )
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1.4,
            ease: "expo.inOut",
          },
          0.8
        );
    }
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#181512] flex flex-col items-center justify-center pointer-events-none"
    >
      <div ref={textRef} className="flex flex-col items-center gap-6">
        <h1 className="text-white font-editorial text-4xl tracking-[0.25em] font-light">
          THE WHITE PALACE
        </h1>
        <p className="text-stone font-sans text-xs tracking-[0.3em] uppercase opacity-70">
          Entering Timeless Luxury
        </p>
        <div className="w-64 h-[1px] bg-white/10 mt-6 relative">
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full bg-champagne transition-all duration-300 ease-out origin-left"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-champagne font-mono text-sm tracking-[0.1em] mt-2">
          {progress}%
        </div>
      </div>
    </div>
  );
}
