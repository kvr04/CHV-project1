"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WELLNESS_IMAGES } from "@/constants/images";

const FEATURES = [
  { title: "Private Spa Sanctuary", desc: "A secluded zone carved into volcanic basalt stone, housing personal sauna chambers and hot springs.", imageIdx: 0 },
  { title: "Slow Aromatherapy", desc: "Custom organic oils extracted from mountain pine and local flora, misted into oxygen chambers.", imageIdx: 1 },
  { title: "Infinity Lagoon Pool", desc: "A temperature-controlled pool dissolving into the horizon, blending architecture with sea fog.", imageIdx: 2 },
  { title: "Zen Meditation Lounge", desc: "A peaceful wooden pavilion surrounded by whispering shallow waters and wind-chimes.", imageIdx: 2 },
  { title: "Travertine Thermal Therapy", desc: "Ancient hot/cold mineral plunge pools modeled after classical Roman bath houses.", imageIdx: 0 }
];

export default function WellnessSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="wellness" className="py-32 px-6 sm:px-12 lg:px-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Dynamic Text / Features */}
        <motion.div 
          className="lg:col-span-5 flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
            An Sanctuary of Silence
          </span>
          <h2 className="font-editorial text-section-title text-ink uppercase mb-12">
            Wellness, Spa & Thermal Pools
          </h2>

          <div className="flex flex-col gap-6">
            {FEATURES.map((feature, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={feature.title}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className="group cursor-pointer py-4 border-b border-stone/20 relative"
                >
                  {/* Slow sliding hover highlight background */}
                  {isActive && (
                    <motion.div
                      layoutId="wellness-accent"
                      className="absolute inset-0 -z-10 bg-surface/50 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className="flex flex-col px-4">
                    <h3 className={`font-editorial text-xl lg:text-2xl transition-colors duration-300 ${
                      isActive ? "text-gold" : "text-ink hover:text-gold"
                    }`}>
                      {feature.title}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-muted font-sans text-[13px] mt-2 tracking-wide leading-relaxed"
                      >
                        {feature.desc}
                      </motion.p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Side: Cinematic Image Transitions */}
        <div className="lg:col-span-7 aspect-[16/10] w-full rounded-3xl overflow-hidden relative shadow-md bg-stone/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={WELLNESS_IMAGES[FEATURES[activeIdx].imageIdx].src}
                alt={WELLNESS_IMAGES[FEATURES[activeIdx].imageIdx].name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[10000ms] ease-out hover:scale-105"
                priority
              />
              {/* Cinematic fog effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-transparent mix-blend-overlay" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
