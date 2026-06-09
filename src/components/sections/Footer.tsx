"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { getLenis } from "@/lib/lenis";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.5 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="py-20 px-6 sm:px-12 lg:px-24 bg-[#181512] text-white border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-6">
          <h3 className="font-editorial text-2xl tracking-[0.2em] text-white uppercase font-light">
            LUXORIA PALACE
          </h3>
          <p className="text-stone/70 font-sans text-[12px] leading-relaxed max-w-xs">
            Where architecture, comfort, and emotion become one timeless experience.
          </p>
          <div className="flex gap-4 text-stone/80 mt-2 items-center">
            <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Quicklinks */}
        <div className="flex flex-col gap-4">
          <h4 className="font-editorial text-lg text-gold uppercase tracking-wider">Navigation</h4>
          <ul className="flex flex-col gap-3 font-sans text-[12px] text-stone/80">
            <li><button onClick={() => handleScrollTo("#hero")} className="hover:text-white transition-colors cursor-pointer">Home</button></li>
            <li><button onClick={() => handleScrollTo("#suites")} className="hover:text-white transition-colors cursor-pointer">Suites</button></li>
            <li><button onClick={() => handleScrollTo("#dining")} className="hover:text-white transition-colors cursor-pointer">Dining</button></li>
            <li><button onClick={() => handleScrollTo("#wellness")} className="hover:text-white transition-colors cursor-pointer">Wellness</button></li>
            <li><button onClick={() => handleScrollTo("#gallery")} className="hover:text-white transition-colors cursor-pointer">Gallery</button></li>
            <li><button onClick={() => handleScrollTo("#concierge")} className="hover:text-white transition-colors cursor-pointer">Concierge AI</button></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-4">
          <h4 className="font-editorial text-lg text-gold uppercase tracking-wider">Coordinates</h4>
          <ul className="flex flex-col gap-4 font-sans text-[12px] text-stone/80">
            <li className="flex gap-3 items-start">
              <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
              <span>Route de la Falaise 40, 06230 Villefranche-sur-Mer, France</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone size={14} className="text-gold shrink-0" />
              <span>+33 4 93 01 22 00</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail size={14} className="text-gold shrink-0" />
              <span>reservations@thewhitepalace.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="flex flex-col gap-4">
          <h4 className="font-editorial text-lg text-gold uppercase tracking-wider">Chronicles</h4>
          <p className="text-stone/70 font-sans text-[12px] leading-relaxed">
            Subscribe to receive private updates on upcoming events and season openings.
          </p>
          <form className="flex gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your Email"
              className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[12px] focus:outline-none focus:border-gold text-white w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gold text-white text-[11px] font-sans uppercase tracking-[0.1em] hover:bg-white hover:text-ink transition-colors cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>

      </div>

      {/* Footer Legal & Copyright */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-stone/60 font-sans text-[11px]">
        <span>© {new Date().getFullYear()} Luxoria Palace. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Retreat</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
