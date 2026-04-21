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
        "brand-primary": "#4E1F30",
        "brand-secondary": "#FF649C",
        "brand-accent": "#FFFFFF",
        bg: "#F6F9FC",
        surface: "#FFFFFF",
        text: "#0F172A",
        muted: "#6B7280",
        border: "#E2E8F0",
        sand: "#EAF2FB",
        paper: "#F6F9FC",
        ink: "#0F172A",
        mist: "#6B7280",
        bronze: "#FFFFFF",
        espresso: "#4E1F30",
        olive: "#FF649C"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(78, 31, 48, 0.08)",
        float: "0 28px 80px rgba(78, 31, 48, 0.16)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 42%)"
      }
    }
  },
  plugins: []
};

export default config;

