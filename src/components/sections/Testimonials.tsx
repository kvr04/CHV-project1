"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    quote: "An architectural wonder. Entering The White Palace feels like walking into an editorial painting. The quietness, the detail in the travertine stone, and the ocean views are unmatched.",
    author: "Elena Rostova",
    title: "President, Milan Design Week",
    rating: 5
  },
  {
    quote: "A rare resort that understands quiet luxury. Service is invisible yet omnipresent. The private thermal pools carved into the pillars are a restorative masterclass.",
    author: "Julian Vance",
    title: "Creative Director, Studio Vance",
    rating: 5
  },
  {
    quote: "The dining experiences alone are worth the trip. Sitting at the chef's private table, tasting vintages in the art vault under dramatic lighting — an unforgettable memory.",
    author: "Dr. Marcus Thorne",
    title: "Arts Patron & Collector",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 sm:px-12 lg:px-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
            Guest Chronicles
          </span>
          <h2 className="font-editorial text-section-title text-ink uppercase mb-6">
            Timeless Experiences
          </h2>
          <p className="text-muted font-sans text-section-body leading-relaxed">
            Words from those who have traveled the world and still choose to return to our sanctuary of quiet stone and silent waters.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 rounded-3xl bg-surface border border-beige/40 shadow-sm flex flex-col justify-between group hover:shadow-[0_15px_40px_rgba(24,21,18,0.03)] hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-6 text-gold">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="font-editorial text-lg italic text-ink/90 leading-relaxed mb-8">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Guest Details */}
              <div className="flex flex-col border-t border-beige/30 pt-6">
                <span className="font-sans text-[13px] font-medium text-ink">
                  {review.author}
                </span>
                <span className="font-sans text-[11px] text-muted tracking-wide mt-1">
                  {review.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
