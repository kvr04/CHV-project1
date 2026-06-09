"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/images";
import { X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-32 px-6 sm:px-12 lg:px-24 bg-surface relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
            Visual Anthology
          </span>
          <h2 className="font-editorial text-section-title text-ink uppercase mb-6">
            The Palace Gallery
          </h2>
          <p className="text-muted font-sans text-section-body leading-relaxed">
            Captured moments of quiet spaces, travertine pillars, light reflecting on smooth stone corridors, and the elegant architecture of The White Palace.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {GALLERY_IMAGES.map((src, idx) => {
            // Alternating sizing rules to generate a luxury masonry effect
            let gridClasses = "col-span-1 row-span-1";
            if (idx === 0) gridClasses = "col-span-1 row-span-2";
            else if (idx === 2) gridClasses = "col-span-2 row-span-1";
            else if (idx === 4) gridClasses = "col-span-1 row-span-2";
            else if (idx === 7) gridClasses = "col-span-2 row-span-2";

            return (
              <motion.div
                key={src}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => setActiveImage(src)}
                className={`relative group rounded-[20px] overflow-hidden cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-stone/5 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${gridClasses} ${
                  hoveredIndex !== null && hoveredIndex !== idx
                    ? "opacity-30 blur-[4px] scale-[0.98]"
                    : "opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`Palace Gallery Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />

                {/* High-end hover layout */}
                <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Expansion Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[#181512]/95 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setActiveImage(null)}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-8 right-8 text-white hover:text-gold transition-colors p-2"
              aria-label="Close Preview"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal image content
            >
              <Image
                src={activeImage}
                alt="Expanded Gallery View"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
