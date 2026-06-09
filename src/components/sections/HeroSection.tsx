
"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

const TOTAL_FRAMES = 151;

const pad = (n: number) => String(n).padStart(6, "0");

const frameUrl = (i: number) =>
  `/hero-frames/frame_${pad(i)}.png`;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imageRefs = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );

  const currentFrame = useRef(0);

  const textRef = useRef<HTMLDivElement>(null);

  const [, setImagesLoaded] =
    useState(false);

  // DRAW FRAME

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;

    const img = imageRefs.current[index];

    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const cw = canvas.width;
    const ch = canvas.height;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // FULLSCREEN CINEMATIC SCALE
    const scale =
      Math.max(cw / iw, ch / ih) * 1.12;

    const sw = iw * scale;
    const sh = ih * scale;

    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);

    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // PRELOAD FRAMES

  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const promises = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        promises.push(
          new Promise<void>((resolve) => {
            const img = new Image();

            img.src = frameUrl(i);

            img.onload = () => {
                  if (cancelled) return;

                  imageRefs.current[i] = img;

                  // DRAW FIRST FRAME
                  if (i === 0) {
                    drawFrame(0);
                  }

                  // UPDATE LOADING PROGRESS
                  const loadedImages =
                    imageRefs.current.filter(Boolean).length;

                  const percent = Math.round(
                    (loadedImages / TOTAL_FRAMES) * 100
                  );

                  window.dispatchEvent(
                    new CustomEvent("hero-progress", {
                      detail: { percent },
                    })
                  );

                  resolve();
                };

            img.onerror = () => resolve();
          })
        );
      }

      await Promise.all(promises);

      if (!cancelled) {
        setImagesLoaded(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // CANVAS RESIZE

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      drawFrame(currentFrame.current);
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [drawFrame]);

  // SCROLL ANIMATION

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const textNode = textRef.current;

    if (!container || !canvas) return;

    const obj = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",

        scrub: 1.2,

        pin: canvas,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });

    tl.to(obj, {
      frame: TOTAL_FRAMES - 8,

      snap: "frame",

      ease: "none",

      onUpdate: () => {
        currentFrame.current = Math.floor(obj.frame);

        drawFrame(currentFrame.current);
      },
    });

    // HERO TEXT ANIMATION

    gsap.fromTo(
      textNode,
      {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      {
        opacity: 0,
        y: -100,
        scale: 0.95,

        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "center center",
          scrub: true,
        },
      }
    );

    return () => {
      tl.kill();

      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      gsap.killTweensOf(textNode);
    };
  }, [drawFrame]);

  // SMOOTH SCROLL

  const handleScrollTo = (id: string) => {
    if (typeof window === "undefined") return;

    const target = document.querySelector(id);

    if (!target) return;

    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        duration: 1.6,
      });
    } else {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-[400vh] w-screen bg-[#181512]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* HERO VIDEO FRAMES */}

        <canvas
          ref={canvasRef}
          className="
            absolute
            inset-0
            h-full
            w-full
            scale-[1.02]
          "
        />

        {/* CINEMATIC OVERLAY */}

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.12) 0%,
                rgba(0,0,0,0.03) 35%,
                rgba(246,241,232,0.04) 72%,
                rgba(246,241,232,0.10) 100%
              )
            `,
          }}
        />

        {/* LUXURY VIGNETTE */}

        <div
          className="absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.20) 100%)",
          }}
        />

        {/* CONTENT */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-6
            pt-52
            text-center
          "
        >
          <div
            ref={textRef}
            className="
              max-w-5xl
              flex
              flex-col
              items-center
            "
          >
            {/* TOP TAG */}

            <span
              className="
                text-[#D7B98E]
                uppercase
                tracking-[0.45em]
                text-[11px]
                mb-6
              "
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              THE PALACE EXPERIENCE
            </span>

            {/* MAIN TITLE */}

            <h1
              className="
                text-[#FFFDF9]
                uppercase
                leading-[0.92]
                font-light
              "
              style={{
                fontFamily:
                  "Cormorant Garamond, serif",

                fontSize:
                  "clamp(3.5rem, 8vw, 7rem)",

                textShadow:
                  "0 10px 40px rgba(0,0,0,0.28)",
              }}
            >
              THE WHITE
              <br />
              PALACE
            </h1>

            {/* SUBTITLE */}

            <p
              className="
                text-[#F8F4EE]
                font-light
                leading-relaxed
                max-w-2xl
                text-[17px]
                md:text-[20px]
                mt-6
              "
              style={{
                fontFamily: "Inter, sans-serif",

                textShadow:
                  "0 4px 40px rgba(0,0,0,0.32)",
              }}
            >
              Where architecture,
              comfort, and emotion
              become one timeless
              experience.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              {/* BUTTON 1 */}

              <button
                onClick={() =>
                  handleScrollTo("#suites")
                }
                className="
                  px-10
                  py-4
                  rounded-full
                  bg-[#FFFDF9]
                  text-[#181512]
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  shadow-xl
                  hover:bg-[#C6A97A]
                  hover:text-[#181512]
                  hover:scale-[1.03]
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Explore Suites
              </button>

              {/* BUTTON 2 */}

              <button
                onClick={() =>
                  handleScrollTo("#cta")
                }
                className="
                  px-10
                  py-4
                  rounded-full
                  border
                  border-white/40
                  text-white
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  hover:bg-[#F8F4EE]
                  hover:text-[#181512]
                  hover:border-[#C6A97A]
                  hover:scale-[1.03]
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Reserve Experience
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

