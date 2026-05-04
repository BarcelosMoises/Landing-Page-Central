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

        // ── Tokens por serviço ──────────────────────────────────────────────
        // Usados como text-service-avcb, bg-service-sanitaria, etc.
        // Para accent dinâmico (subpáginas), prefira var(--color-service-accent)
        // via style= inline — CSS variables não são capturadas pelo Tailwind JIT.
        "service-avcb": {
          DEFAULT: "#800000",
          hover: "#4f0101",
        },
        "service-sanitaria": {
          DEFAULT: "#0d7377",
          hover: "#095e62",
        },
        "service-ambiental": {
          DEFAULT: "#2d6a2d",
          hover: "#1e4d1e",
        },
        "service-laudos": {
          DEFAULT: "#92610a",
          hover: "#6e4908",
        },
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
      // --- Animações de entrada ---
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(128,0,0,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(128,0,0,0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out both",
        "fade-in": "fadeIn 0.4s ease-out both",
        marquee: "marquee 30s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      transitionDuration: {
        "200": "200ms",
        "300": "300ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;
