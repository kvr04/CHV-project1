"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FITNESS_IMAGES } from "@/constants/images";
import { ShieldCheck, Heart, User, Sparkles } from "lucide-react";

const BENEFITS = [
  { icon: ShieldCheck, title: "Premium Equipment", desc: "Biomechanically optimized gear custom made for bespoke performance." },
  { icon: Sparkles, title: "Smart Tracking", desc: "Biometric analysis and digital performance tracking synced to your room panel." },
  { icon: User, title: "Private Instructors", desc: "On-demand coaches trained in functional movement and architectural posture." },
  { icon: Heart, title: "Recovery & Sauna", desc: "Infrared wraps and cold plunge baths immediately following your workout." }
];

export default function FitnessSection() {
  return (
    <section id="fitness" className="py-32 px-6 sm:px-12 lg:px-24 bg-surface relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
            Movement & Balance
          </span>
          <h2 className="font-editorial text-section-title text-ink uppercase mb-6">
            Bespoke Fitness & Yoga Studios
          </h2>
          <p className="text-muted font-sans text-section-body max-w-xl leading-relaxed">
            Re-engage with your natural rhythm. From light-filled yoga sanctuaries to state-of-the-art strength training, our space inspires focused movement.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left: Gym Features & Benefits */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="flex gap-4 p-6 rounded-2xl bg-background/30 hover:bg-background/80 transition-colors duration-300 border border-stone/10"
                  >
                    <div className="p-3 bg-surface text-gold rounded-xl shadow-sm h-fit">
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-editorial text-lg text-ink uppercase tracking-wider mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-muted font-sans text-[12.5px] leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Asymmetric Image Presentation */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {FITNESS_IMAGES.map((studio, idx) => (
              <motion.div
                key={studio.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.25, 1, 0.5, 1] }}
                className={`flex flex-col group ${idx === 1 ? "sm:translate-y-12" : ""}`}
              >
                <div className="parallax-wrap aspect-[3/4] w-full rounded-2xl overflow-hidden relative shadow-sm">
                  <Image
                    src={studio.src}
                    alt={studio.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover parallax-img"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
                </div>
                <h3 className="font-editorial text-xl text-ink font-light mt-6 mb-2">
                  {studio.name}
                </h3>
                <p className="text-muted font-sans text-[12px] leading-relaxed">
                  {studio.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
