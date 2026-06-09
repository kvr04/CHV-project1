"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Compass, ShoppingBag, UtensilsCrossed, Waves } from "lucide-react";

interface Landmark {
  id: string;
  name: string;
  type: "palace" | "airport" | "beach" | "shopping" | "dining" | "attraction";
  distance: string;
  time: string;
  desc: string;
  x: string; // SVG relative X coordinate
  y: string; // SVG relative Y coordinate
}

const LANDMARKS: Landmark[] = [
  {
    id: "palace",
    name: "The White Palace",
    type: "palace",
    distance: "0 km",
    time: "Estate Center",
    desc: "Our architectural sanctuary situated on a private rocky peninsula.",
    x: "50%",
    y: "50%"
  },
  {
    id: "airport",
    name: "Nice International Airport",
    type: "airport",
    distance: "24 km",
    time: "25 min by Private Transfer",
    desc: "Direct luxury electric limousine shuttles to the estate front gates.",
    x: "20%",
    y: "30%"
  },
  {
    id: "beach",
    name: "Plage Blanche Cove",
    type: "beach",
    distance: "1.2 km",
    time: "3 min by Golf Cart",
    desc: "Private sandy beach cove fully catered with personal loungers and towel service.",
    x: "65%",
    y: "60%"
  },
  {
    id: "shopping",
    name: "Avenue de l'Or (Shopping)",
    type: "shopping",
    distance: "6.5 km",
    time: "10 min by Chauffeur",
    desc: "Curated shopping street housing elite haute-couture houses and design galleries.",
    x: "40%",
    y: "25%"
  },
  {
    id: "dining",
    name: "La Table de la Falaise",
    type: "dining",
    distance: "3.2 km",
    time: "5 min by Chauffeur",
    desc: "Michelin-starred cliffside dining specializing in raw coastal gastronomy.",
    x: "70%",
    y: "35%"
  },
  {
    id: "attraction",
    name: "Ancient Fortress Ruins",
    type: "attraction",
    distance: "8.0 km",
    time: "12 min by Chauffeur",
    desc: "12th-century stone fortress columns overlooking the coastal landscape.",
    x: "30%",
    y: "75%"
  }
];

export default function InteractiveMap() {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(LANDMARKS[0]);

  return (
    <section id="map" className="py-32 px-6 sm:px-12 lg:px-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
            Palace Location
          </span>
          <h2 className="font-editorial text-section-title text-ink uppercase mb-6">
            Coastal Coordinates
          </h2>
          <p className="text-muted font-sans text-section-body leading-relaxed">
            Suspended on a quiet clifftop along the shorelines. Select pins on our map to explore distances and elite regional attractions.
          </p>
        </div>

        {/* Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Map Display (7 Columns) */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl border border-beige/40 p-6 shadow-sm relative h-[450px] overflow-hidden flex flex-col justify-between">
            
            {/* Custom SVG cartography backdrop */}
            <div className="absolute inset-0 z-0 opacity-40">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                {/* Coastal contours */}
                <path d="M 0,220 C 120,220 180,140 280,180 C 380,220 420,320 540,300 C 660,280 720,450 900,450" fill="none" stroke="#E7D9C9" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 0,260 C 130,260 190,180 290,220 C 390,260 430,360 550,340 C 670,320 730,480 900,480" fill="none" stroke="#E7D9C9" strokeWidth="1" />
                
                {/* Water text */}
                <text x="70%" y="85%" fill="#D8C7B5" fontSize="10" fontFamily="sans-serif" letterSpacing="0.2em" className="uppercase select-none">Mediterranean Sea</text>
                
                {/* Roads */}
                <line x1="20%" y1="30%" x2="40%" y2="25%" stroke="#E7D9C9" strokeWidth="1" />
                <line x1="40%" y1="25%" x2="50%" y2="50%" stroke="#E7D9C9" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="65%" y2="60%" stroke="#E7D9C9" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="70%" y2="35%" stroke="#E7D9C9" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="30%" y2="75%" stroke="#E7D9C9" strokeWidth="1" />
              </svg>
            </div>

            {/* Render markers */}
            <div className="absolute inset-0 z-10">
              {LANDMARKS.map((landmark) => {
                const isSelected = selectedLandmark.id === landmark.id;
                const isPalace = landmark.type === "palace";
                
                return (
                  <motion.button
                    key={landmark.id}
                    onClick={() => setSelectedLandmark(landmark)}
                    style={{ left: landmark.x, top: landmark.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2 focus:outline-none"
                    whileHover={{ scale: 1.15 }}
                  >
                    <div className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                      isSelected 
                        ? "w-10 h-10 bg-gold text-white shadow-md ring-4 ring-gold/10" 
                        : isPalace
                          ? "w-10 h-10 bg-ink text-white ring-4 ring-ink/15 animate-pulse"
                          : "w-8 h-8 bg-surface border border-beige text-muted hover:border-gold hover:text-gold"
                    }`}>
                      {isPalace ? <Compass size={18} /> : 
                       landmark.type === "airport" ? <Plane size={14} /> :
                       landmark.type === "beach" ? <Waves size={14} /> :
                       landmark.type === "shopping" ? <ShoppingBag size={14} /> :
                       landmark.type === "dining" ? <UtensilsCrossed size={14} /> :
                       <MapPin size={14} />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* Scale indicator */}
            <div className="mt-auto ml-4 mb-4 z-20 flex flex-col gap-1 select-none">
              <div className="w-16 h-[2px] bg-stone" />
              <span className="font-mono text-[9px] text-muted tracking-widest uppercase">Scale 1 : 50,000</span>
            </div>

          </div>

          {/* Details Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLandmark.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="glass-ivory rounded-3xl p-8 shadow-sm flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                    {selectedLandmark.type === "palace" ? <Compass size={22} /> :
                     selectedLandmark.type === "airport" ? <Plane size={18} /> :
                     selectedLandmark.type === "beach" ? <Waves size={18} /> :
                     selectedLandmark.type === "shopping" ? <ShoppingBag size={18} /> :
                     selectedLandmark.type === "dining" ? <UtensilsCrossed size={18} /> :
                     <MapPin size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gold text-[9px] font-sans uppercase tracking-[0.2em] font-semibold">
                      Location Guide
                    </span>
                    <h3 className="font-editorial text-2xl text-ink font-light">
                      {selectedLandmark.name}
                    </h3>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-beige/50" />

                <p className="text-muted font-sans text-[13px] leading-relaxed tracking-wide">
                  {selectedLandmark.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-stone">Distance</span>
                    <span className="font-sans text-[14px] font-medium text-ink">{selectedLandmark.distance}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-stone">Transfer Time</span>
                    <span className="font-sans text-[14px] font-medium text-ink">{selectedLandmark.time}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
