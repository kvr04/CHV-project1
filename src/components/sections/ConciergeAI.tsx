"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Lock, LogIn } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

// Predefined fallback text if API fails
const BOT_FALLBACK = "I am experiencing a temporary connection issue to the main Palace network. Please try again in a moment.";

export default function ConciergeAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Welcome to Luxoria Palace. I am your private AI Concierge. How may I assist your luxury retreat today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const updatedMessages = [...messages, { sender: "user" as const, text: userText }];
    setMessages(updatedMessages);
    setInputValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error("API response error");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot" as const, text: data.reply || BOT_FALLBACK }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot" as const, text: BOT_FALLBACK }]);
    }
  };

  const handleQuickAction = (text: string) => {
    setInputValue(text);
  };

  return (
    <section id="concierge" className="py-32 px-6 sm:px-12 lg:px-24 bg-background relative overflow-hidden">
      {/* Decorative background blur objects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-champagne/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-88 h-88 bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-gold text-[11px] font-sans uppercase tracking-[0.3em] block mb-4">
          Bespoke Service
        </span>
        <h2 className="font-editorial text-section-title text-ink uppercase mb-6">
          The Private AI Concierge
        </h2>
        <p className="text-muted font-sans text-section-body max-w-lg mx-auto leading-relaxed">
          Unlock instant access to bookings, spa treatments, gourmet catering, and individual room requirements. Securely managed for your private comfort.
        </p>
      </div>

      {/* Main Luxury Glass UI */}
      <div className="max-w-2xl mx-auto bg-white/30 backdrop-blur-3xl border border-white/50 rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative min-h-[500px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* Logged Out state */
            <motion.div
              key="logged-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-beige/30 flex items-center justify-center text-gold mb-6 border border-champagne/10">
                <Lock size={24} />
              </div>
              <h3 className="font-editorial text-2xl text-ink uppercase tracking-wider mb-2">
                Palace Access Required
              </h3>
              <p className="text-muted font-sans text-[13px] tracking-wide max-w-sm mb-8">
                Please sign in to continue your luxury experience and interact with our automated private guest assistant.
              </p>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="px-8 py-4 rounded-full bg-gold text-white text-[11px] font-sans uppercase tracking-[0.2em] hover:bg-ink hover:text-white transition-colors duration-500 flex items-center gap-3 shadow-md"
              >
                <LogIn size={14} />
                Sign In to Palace
              </button>
            </motion.div>
          ) : (
            /* Logged In state */
            <motion.div
              key="logged-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col h-full justify-between"
            >
              {/* Chat Header */}
              <div className="px-8 py-5 border-b border-white/20 flex items-center justify-between bg-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-ink">
                    AI Butler Service (Online)
                  </span>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
                >
                  Log Out
                </button>
              </div>

              {/* Chat Output Window */}
              <div className="flex-1 overflow-y-auto p-8 max-h-[350px] min-h-[300px] flex flex-col gap-6 scrollbar-thin">
                {messages.map((msg, idx) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      key={idx}
                      className={`flex gap-3 max-w-[85%] ${
                        isBot ? "self-start" : "self-end flex-row-reverse"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-[12px] shrink-0 shadow-sm ${
                        isBot ? "bg-white/60 border-white/40 text-gold" : "bg-gold text-white border-gold shadow-gold/20"
                      }`}>
                        {isBot ? <Bot size={14} /> : <User size={14} />}
                      </div>
                      <div className={`p-4 rounded-2xl text-[13px] font-sans leading-relaxed tracking-wide shadow-sm border ${
                        isBot ? "bg-white/80 border-white/40 text-ink" : "bg-gold/10 border-gold/20 text-ink"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-8 py-3 flex flex-wrap gap-2 justify-center bg-surface/20">
                <button
                  onClick={() => handleQuickAction("Are there suites available?")}
                  className="px-3 py-1.5 rounded-full border border-stone/20 text-[10px] font-sans uppercase tracking-[0.1em] text-muted hover:border-gold hover:text-gold transition-colors"
                >
                  Suites Availability
                </button>
                <button
                  onClick={() => handleQuickAction("Tell me about dining experiences")}
                  className="px-3 py-1.5 rounded-full border border-stone/20 text-[10px] font-sans uppercase tracking-[0.1em] text-muted hover:border-gold hover:text-gold transition-colors"
                >
                  Dining Bookings
                </button>
                <button
                  onClick={() => handleQuickAction("Can I reserve a private spa treatment?")}
                  className="px-3 py-1.5 rounded-full border border-stone/20 text-[10px] font-sans uppercase tracking-[0.1em] text-muted hover:border-gold hover:text-gold transition-colors"
                >
                  Spa Sanctuary
                </button>
              </div>

              {/* Chat Input Bar */}
              <div className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-md flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ask about suites, spa, wellness, and restaurant bookings..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="flex-1 bg-white/50 backdrop-blur-sm border border-white/30 px-5 py-3 rounded-full text-[13px] font-sans tracking-wide text-ink focus:outline-none focus:border-gold/50 focus:bg-white/80 transition-all shadow-inner"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-11 h-11 rounded-full bg-gold text-white flex items-center justify-center hover:bg-ink transition-colors shadow-md shrink-0 cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
