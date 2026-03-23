import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#0A2540",
        "brand-secondary": "#1D4ED8",
        "brand-accent": "#2DD4BF",
        bg: "#F6F9FC",
        surface: "#FFFFFF",
        text: "#0F172A",
        muted: "#6B7280",
        border: "#E2E8F0",
        sand: "#EAF2FB",
        paper: "#F6F9FC",
        ink: "#0F172A",
        mist: "#6B7280",
        bronze: "#2DD4BF",
        espresso: "#0A2540",
        olive: "#1D4ED8"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(10, 37, 64, 0.08)",
        float: "0 28px 80px rgba(10, 37, 64, 0.16)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(45,212,191,0.18), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;

