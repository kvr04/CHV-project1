"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

export default function FinalCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsModalOpen(false);
    }, 2500);
  };

  return (
    <>
      <section id="cta" className="py-40 px-6 sm:px-12 lg:px-24 bg-[#181512] text-white text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
        {/* Architectural backdrop curves */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="white" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#181512]/60 to-[#181512] z-0" />

        <div className="relative z-10 max-w-3xl flex flex-col items-center gap-8">
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.4em] mb-2 block animate-pulse">
            Reservations
          </span>
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-wide leading-none">
            Your Palace Experience Awaits
          </h2>
          <p className="text-stone font-sans text-[13.5px] sm:text-[15px] max-w-md leading-relaxed mt-2 opacity-80">
            Secure your sanctuary of quiet marble columns, thermal lagoons, and Michelin-star candlelight dining.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-10 py-5 rounded-full bg-gold text-white text-[11px] font-sans uppercase tracking-[0.25em] hover:bg-white hover:text-ink transition-colors duration-500 shadow-xl btn-glow cursor-pointer"
          >
            Reserve Your Stay
          </button>
        </div>
      </section>

      {/* Reservation Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="w-full max-w-xl bg-surface border border-champagne/20 rounded-3xl overflow-hidden shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking modal card
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-ink hover:text-gold transition-colors cursor-pointer"
                aria-label="Close Booking Modal"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="booking-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center mb-4">
                      <span className="text-gold text-[9px] font-sans uppercase tracking-[0.2em] font-semibold">
                        Luxoria Palace
                      </span>
                      <h3 className="font-editorial text-2xl lg:text-3xl text-ink uppercase tracking-wider mt-1">
                        Request Reservation
                      </h3>
                    </div>

                    {/* Date Inputs */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Check-In</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Check-Out</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    {/* Suite Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Sanctuary Type</label>
                      <select className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors">
                        <option>Presidential Suite (From $4,500 / night)</option>
                        <option>Royal Ocean Suite (From $3,200 / night)</option>
                        <option>Sky Palace Suite (From $6,000 / night)</option>
                        <option>Imperial Garden Villa (From $8,500 / night)</option>
                      </select>
                    </div>

                    {/* Guests Selection */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Number of Guests</label>
                      <select className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4+ Guests</option>
                      </select>
                    </div>

                    {/* Personal Details */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Elena Rostova"
                        className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-sans uppercase tracking-[0.1em] text-muted">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="elena@designweek.it"
                        className="w-full bg-background border border-stone/15 p-3 rounded-xl text-[12px] font-sans focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 rounded-xl bg-gold text-white text-[11px] font-sans uppercase tracking-[0.2em] hover:bg-ink hover:text-white transition-colors duration-500 shadow-md cursor-pointer"
                    >
                      Submit Booking Inquiry
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6 border border-gold/15">
                      <Check size={28} />
                    </div>
                    <h4 className="font-editorial text-2xl text-ink uppercase tracking-wider mb-2">
                      Request Logged
                    </h4>
                    <p className="text-muted font-sans text-[12.5px] max-w-xs leading-relaxed">
                      Your inquiry has been registered. Our private hospitality officer will contact you shortly to coordinate your personalized schedule.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
