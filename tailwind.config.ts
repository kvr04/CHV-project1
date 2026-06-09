import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        beige: "var(--beige)",
        champagne: "var(--champagne)",
        gold: "var(--gold)",
        stone: "var(--stone)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        white: "var(--white)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 8vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
        "hero-sub": ["clamp(1rem, 2vw, 1.5rem)", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "section-title": ["clamp(2rem, 5vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "section-body": ["clamp(0.95rem, 1.2vw, 1.15rem)", { lineHeight: "1.7", letterSpacing: "0em" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
