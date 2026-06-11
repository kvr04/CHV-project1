"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  
  // Track mouse coordinates directly
  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorPosRef = useRef({ x: -100, y: -100 });
  
  // Track animation states for hover effects
  const isHoveringRef = useRef(false);
  const ringScaleRef = useRef(1);
  const dotScaleRef = useRef(1);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch screens (coarse pointers)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Instantly check if we are hovering an interactive element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        target.onclick != null ||
        target.getAttribute('role') === 'button';
        
      isHoveringRef.current = !!isClickable;
    };

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // SMOOTH HOVER SCALING
      const targetRingScale = isHoveringRef.current ? 1.8 : 1;
      const targetDotScale = isHoveringRef.current ? 0 : 1;
      
      ringScaleRef.current += (targetRingScale - ringScaleRef.current) * 0.15;
      dotScaleRef.current += (targetDotScale - dotScaleRef.current) * 0.2;

      // INNER DOT: Zero-latency INSTANT follow (Removes the sluggish delay feel completely)
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0) scale(${dotScaleRef.current})`;

      // OUTER RING: Premium cinematic smooth follow lag
      cursorPosRef.current.x += (mx - cursorPosRef.current.x) * 0.15;
      cursorPosRef.current.y += (my - cursorPosRef.current.y) * 0.15;
      
      // Apply background color gently when expanding
      if (isHoveringRef.current) {
        cursor.style.backgroundColor = "rgba(214, 185, 140, 0.05)";
      } else {
        cursor.style.backgroundColor = "transparent";
      }

      cursor.style.transform = `translate3d(${cursorPosRef.current.x - 16}px, ${cursorPosRef.current.y - 16}px, 0) scale(${ringScaleRef.current})`;

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 border border-champagne/80 rounded-full pointer-events-none z-[99999] will-change-transform transition-colors duration-300"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-champagne rounded-full pointer-events-none z-[100000] will-change-transform"
      />
    </>
  );
}
