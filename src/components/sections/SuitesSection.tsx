"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const suites = [
  {
    name: "Ocean Royal Suite",

    src: "/images/suites/presidential-ocean-suite.webp",

    gallery: [
      {
        image: "/images/suites/presidential-ocean-suite.webp",
        title: "Presidential Ocean Suite",
      },

      {
        image: "/images/suites/ocean-premium-suite.webp",
        title: "Ocean Premium Suite",
      },

      {
        image: "/images/suites/sunset-panorama-suite.webp",
        title: "Sunset Panorama Suite",
      },
    ],

    size: "320 SQM",

    price: "$4,500 / NIGHT",

    description:
      "Panoramic oceanfront sanctuary with handcrafted marble interiors and cinematic sunset views.",
  },

  {
    name: "Imperial Wellness Villa",

    src: "/images/suites/cliffside-infinity-villa.webp",

    gallery: [
      {
        image: "/images/suites/cliffside-infinity-villa.webp",
        title: "Infinity Villa",
      },

      {
        image: "/images/suites/imperial-spa-bathroom.webp",
        title: "Imperial Spa Bathroom",
      },

      {
        image: "/images/suites/royal-marble-bathroom.webp",
        title: "Royal Marble Bathroom",
      },
    ],

    size: "410 SQM",

    price: "$6,200 / NIGHT",

    description:
      "Private spa-inspired residence crafted with warm textures and timeless architecture.",
  },

  {
    name: "Metropolitan Penthouse",

    src: "/images/suites/deluxe-city-suite.webp",

    gallery: [
      {
        image: "/images/suites/deluxe-city-suite.webp",
        title: "Deluxe City Suite",
      },

      {
        image: "/images/suites/presidential-ocean-suite.webp",
        title: "Luxury Lounge",
      },

      {
        image: "/images/suites/royal-marble-bathroom.webp",
        title: "Marble Bath Experience",
      },
    ],

    size: "580 SQM",

    price: "$8,900 / NIGHT",

    description:
      "An ultra-luxury penthouse curated for cinematic skyline living and elevated hospitality.",
  },
];

export default function SuitesSection() {
  const [activeSuite, setActiveSuite] =
    useState(suites[0]);

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  return (
    <section
      id="suites"
      className="
        relative
        overflow-hidden
        py-32
        px-6
        sm:px-12
        lg:px-24
        bg-[#f4efe7]
      "
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top,#ffffff_0%,#f4efe7_45%,#e7ded2_100%)]
          "
        />

        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[900px]
            bg-[#d6b98c]/30
            blur-[180px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">

          <div className="max-w-3xl">

            <span
              className="
                text-[#b38b59]
                text-[11px]
                tracking-[0.4em]
                uppercase
                block
                mb-5
              "
            >
              Private Sanctuaries
            </span>

            <h2
              className="
                font-editorial
                text-section-title
                uppercase
                text-[#2a241f]
                leading-[0.95]
              "
            >
              Signature Suites
              <br />
              & Villas
            </h2>
          </div>

          <p
            className="
              max-w-sm
              text-[#6d6257]
              text-[14px]
              leading-relaxed
              tracking-wide
            "
          >
            A curated collection of refined residences
            designed with cinematic elegance and immersive luxury experiences.
          </p>
        </div>

        {/* MAIN LAYOUT */}

        <div className="grid lg:grid-cols-[320px_1fr] gap-16">

          {/* LEFT MENU */}
          <div className="flex flex-col gap-8 lg:h-full">
            <div className="space-y-5">
              {suites.map((suite) => {
                const active = activeSuite.name === suite.name;
                return (
                  <motion.button
                    key={suite.name}
                    onClick={() => setActiveSuite(suite)}
                    whileHover={{ x: 8 }}
                    className={`
                      group
                      relative
                      w-full
                      overflow-hidden
                      rounded-[28px]
                      border
                      p-6
                      text-left
                      transition-all
                      duration-700
                      backdrop-blur-xl
                      ${
                        active
                          ? "border-[#c6a77d] bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                          : "border-[#ddd2c6] bg-white/40 hover:bg-white/60"
                      }
                    `}
                  >
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        bg-gradient-to-r
                        from-[#d6b98c]/20
                        to-transparent
                        transition
                        duration-700
                      "
                    />
                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <div>
                        <h3
                          className={`
                            font-editorial
                            text-2xl
                            transition
                            duration-500
                            ${
                              active
                                ? "text-[#b38b59]"
                                : "text-[#2a241f]"
                            }
                          `}
                        >
                          {suite.name}
                        </h3>
                        <div
                          className="
                            flex
                            gap-3
                            mt-3
                            text-[11px]
                            uppercase
                            tracking-[0.25em]
                            text-[#7a6d61]
                          "
                        >
                          <span>{suite.size}</span>
                          <span>•</span>
                          <span>{suite.price}</span>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className={`
                          transition-all
                          duration-500
                          ${
                            active
                              ? "text-[#b38b59] rotate-45"
                              : "text-[#8f8477]"
                          }
                        `}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* SIGNATURE PRIVILEGES CARD TO FILL EMPTY SPACE */}
            <div className="p-8 rounded-[28px] border border-[#ddd2c6] bg-white/30 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.03)] hidden lg:block">
              <span className="text-[#b38b59] text-[10px] uppercase tracking-[0.2em] font-sans block mb-5">
                Signature Privileges
              </span>
              <ul className="space-y-4 text-[13px] text-[#6d6257] font-sans tracking-wide">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a77d]" />
                  24/7 Dedicated Butler Service
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a77d]" />
                  Private In-Suite Dining
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a77d]" />
                  Complimentary Airport Transfer
                </li>
              </ul>
            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="space-y-10">

            {/* HERO IMAGE */}

            <div
              className="
                group
                relative
                w-full
                h-[50vh] min-h-[400px] lg:h-[600px]
                overflow-hidden
                rounded-[38px]
              "
            >

              <Image
                src={activeSuite.src}
                alt={activeSuite.name}
                fill
                priority
                className="
                  object-cover
                  transition-transform
                  duration-[5000ms]
                  ease-out
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/60
                  via-black/10
                  to-transparent
                "
              />

              <div className="absolute bottom-0 left-0 p-10">

                <h3
                  className="
                    text-white
                    font-editorial
                    text-5xl
                  "
                >
                  {activeSuite.name}
                </h3>

                <p
                  className="
                    mt-5
                    max-w-xl
                    text-white/80
                    text-[15px]
                    leading-relaxed
                  "
                >
                  {activeSuite.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH GALLERY (Moved from right column) */}
        <div className="overflow-hidden py-16 mt-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <motion.div
            animate={
              hoveredIndex === null
                ? { x: ["0%", "-50%"] }
                : { x: undefined }
            }
            transition={{
              duration: 30,
              repeat:
                hoveredIndex === null
                  ? Infinity
                  : 0,
              ease: "linear",
            }}
            className="flex gap-8 w-max px-6 sm:px-12 lg:px-24"
          >
            {[
              ...activeSuite.gallery,
              ...activeSuite.gallery,
              ...activeSuite.gallery, // Added extra duplication for wider screens
            ].map((item, i) => (
              <motion.div
                key={`${item.image}-${i}`}
                onHoverStart={() =>
                  setHoveredIndex(i)
                }
                onHoverEnd={() =>
                  setHoveredIndex(null)
                }
                whileHover={{
                  scale: 1.05,
                  y: -14,
                }}
                transition={{
                  duration: 0.5,
                }}
                className={`
                  relative
                  w-[420px]
                  h-[540px]
                  overflow-hidden
                  rounded-[36px]
                  shrink-0
                  cursor-pointer
                  transition-all
                  duration-[800ms]
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${
                    hoveredIndex !== null &&
                    hoveredIndex !== i
                      ? "opacity-40 scale-95 blur-[4px]"
                      : "opacity-100"
                  }
                `}
              >
                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`
                    object-cover
                    transition-transform
                    duration-[4000ms]
                    ease-out
                    ${hoveredIndex === i ? "scale-110" : ""}
                  `}
                />

                {/* DARK OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                  "
                />

                {/* GLOW */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    hover:opacity-100
                    transition-all
                    duration-700
                    bg-[#d6b98c]/10
                    backdrop-blur-[1px]
                  "
                />

                {/* INFO CARD */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    p-8
                    translate-y-16
                    opacity-0
                    hover:translate-y-0
                    hover:opacity-100
                    transition-all
                    duration-700
                  "
                >
                  <div
                    className="
                      rounded-[28px]
                      border
                      border-white/30
                      bg-white/10
                      backdrop-blur-3xl
                      p-8
                      shadow-[0_15px_40px_rgba(0,0,0,0.2)]
                    "
                  >
                    <span
                      className="
                        text-[#f2d2a1]
                        text-[10px]
                        uppercase
                        tracking-[0.35em]
                      "
                    >
                      Signature Luxury
                    </span>

                    <h4
                      className="
                        mt-4
                        text-white
                        font-editorial
                        text-3xl
                      "
                    >
                      {item.title}
                    </h4>

                    <p
                      className="
                        mt-3
                        text-white/70
                        text-[14px]
                        leading-relaxed
                      "
                    >
                      Crafted with immersive elegance,
                      cinematic architecture, and refined luxury hospitality.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
