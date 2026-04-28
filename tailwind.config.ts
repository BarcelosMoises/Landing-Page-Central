import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#800000",
          dark: "#4f0101",
          light: "#a30000",
        },
        neutral: {
          50: "#f5f5f5",
          100: "#e8e8e8",
          400: "#9ca3af",
          700: "#374151",
          900: "#111827",
        },
        ink: "#0a0a0a",
        success: "#16a34a",
        warning: "#ca8a04",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #4f0101 0%, #800000 50%, #1a0000 100%)",
        "card-gradient":
          "linear-gradient(180deg, #800000 0%, #4f0101 100%)",
        "overlay-gradient":
          "linear-gradient(to bottom, rgba(79,1,1,0.85) 0%, rgba(10,0,0,0.6) 100%)",
      },
      maxWidth: {
        container: "1280px",
      },
      minHeight: {
        hero: "90vh",
      },
    },
  },
  plugins: [],
};

export default config;
