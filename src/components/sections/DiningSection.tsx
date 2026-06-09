"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DINING_IMAGES = [
  {
    name: "Signature Fine Dining",
    src: "/images/dining/chef-table-experience.png",
    description:
      "Michelin-inspired tasting experiences crafted with seasonal ingredients and elegant presentation.",
  },
  {
    name: "Private Chef Experience",
    src: "/images/dining/executive-chef-plating.png",
    description:
      "Exclusive culinary storytelling curated by world-class chefs in intimate luxury settings.",
  },
  {
    name: "Velvet Lounge & Bar",
    src: "/images/dining/luxury-cocktail-bar.png",
    description:
      "An atmospheric cocktail sanctuary with handcrafted spirits and timeless marble interiors.",
  },
];

export default function DiningSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="dining"
      className="relative overflow-hidden py-32 px-6 sm:px-12 lg:px-24 bg-[#f5efe6]"
    >
      {/* Luxury Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5efe6_45%,#e7ddd1_100%)]" />

        {/* Floating Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#d8b98b]/20 blur-[160px]"
        />

        {/* Soft Texture */}
        <div className="absolute inset-0 bg-white/[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#b38b59] text-[11px] font-sans uppercase tracking-[0.35em] block mb-5">
              Gastronomic Artistry
            </span>

            <h2 className="font-editorial text-section-title text-[#2a241f] uppercase leading-[0.95]">
              Fine Dining &
              <br />
              Private Tables
            </h2>
          </div>

          <p className="text-[#6d6257] font-sans text-[14px] max-w-sm tracking-wide leading-relaxed">
            Culinary narratives written in harmony with local seasonal harvests.
            Experience candlelight dining overlooking the whispering ocean
            gates.
          </p>
        </div>

        {/* Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {DINING_IMAGES.map((item, idx) => (
            <motion.div
              key={item.name}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: idx * 0.12,
                ease: [0.25, 1, 0.5, 1],
              }}
              whileHover={{
                y: -12,
              }}
              className={`group relative h-[580px] overflow-hidden rounded-[32px] border border-[#ddd2c6] bg-white/50 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.06)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                hoveredIndex !== null && hoveredIndex !== idx
                  ? "opacity-40 scale-[0.98] blur-[4px]"
                  : "opacity-100"
              }`}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`object-cover transition-transform duration-[4000ms] ease-out ${hoveredIndex === idx ? "scale-110" : ""}`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1712]/95 via-[#1c1712]/35 to-transparent group-hover:from-[#1c1712]/90 transition duration-700" />

              {/* Gold Glow */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#d6b98c]/30 blur-[90px] opacity-0 group-hover:opacity-100 transition duration-700" />

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-tr from-white/10 via-transparent to-white/20" />

              {/* Floating Number */}
              <div className="absolute top-6 right-6 z-20">
                <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md bg-white/10 flex items-center justify-center">
                  <span className="text-white text-[11px] tracking-[0.2em]">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                {/* Small Label */}
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#f2d2a1] text-[10px] font-sans uppercase tracking-[0.3em] mb-3 block"
                >
                  Culinary Experience
                </motion.span>

                {/* Title */}
                <h3 className="font-editorial text-3xl lg:text-4xl text-white font-light leading-tight group-hover:text-[#f2d2a1] transition-colors duration-500">
                  {item.name}
                </h3>

                {/* Animated Line */}
                <div className="w-full h-[1px] bg-white/10 mt-5 overflow-hidden relative">
                  <div className="absolute left-0 top-0 h-full w-full bg-[#d6b98c] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                </div>

                {/* Hover Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/75 font-sans text-[13px] leading-relaxed tracking-wide mt-5 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {item.description}
                  </p>
                </motion.div>

                {/* Floating CTA */}
                <div className="mt-8 flex items-center gap-3 opacity-0 translate-y-6 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">
                    →
                  </div>

                  <span className="text-white text-[11px] tracking-[0.25em] uppercase">
                    Explore Experience
                  </span>
                </div>
              </div>

              {/* Floating hover shadow */}
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/0 group-hover:ring-white/20 transition duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}