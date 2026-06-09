"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Suites", href: "#suites" },
  { label: "Dining", href: "#dining" },
  { label: "Wellness", href: "#wellness" },
  { label: "Gallery", href: "#gallery" },
  { label: "Private AI", href: "#concierge" },
  { label: "Contact", href: "#footer" },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Track active section
      const scrollPos = currentScrollY + window.innerHeight / 3;
      for (const item of NAV_ITEMS) {
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.8 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -50,
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="fixed top-3 left-0 right-0 z-[100] mx-auto w-[92%] max-w-6xl pointer-events-none"
      >
        <div className="w-full glass-ivory px-6 py-4 rounded-full flex items-center justify-between shadow-[0_10px_40px_rgba(24,21,18,0.04)] pointer-events-auto">
          {/* Palace Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="text-ink font-editorial text-lg tracking-[0.2em] font-light hover:opacity-70 transition-opacity"
          >
            THE WHITE PALACE
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative py-1 text-[11px] font-sans uppercase tracking-[0.15em] transition-colors duration-300",
                  activeSection === item.href.replace("#", "")
                    ? "text-gold font-medium"
                    : "text-muted hover:text-ink"
                )}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Reserve CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick("#cta")}
              className="relative hidden sm:block px-5 py-2 rounded-full border border-champagne text-[11px] font-sans uppercase tracking-[0.15em] text-ink hover:text-white transition-colors duration-500 overflow-hidden btn-glow group"
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                Reserve Stay
              </span>
              <span className="absolute inset-0 w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full -z-10" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-ink"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 bg-[#F6F1E8] flex flex-col justify-center items-center gap-8 px-6 lg:hidden"
          >
            <button
              className="absolute top-8 right-6 p-2 text-ink"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="font-editorial text-2xl tracking-[0.2em] text-gold mb-4">
              THE WHITE PALACE
            </h2>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "text-lg font-sans uppercase tracking-[0.2em] py-2",
                  activeSection === item.href.replace("#", "")
                    ? "text-gold font-medium"
                    : "text-muted"
                )}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick("#cta")}
              className="mt-6 px-8 py-3 rounded-full bg-gold text-white text-[12px] font-sans uppercase tracking-[0.2em] shadow-md hover:bg-champagne transition-colors"
            >
              Reserve Experience
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
