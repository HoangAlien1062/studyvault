/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0D11",
          900: "#0F1115",
          850: "#13151B",
          800: "#171A21",
          700: "#1E222B",
          600: "#262B36",
          500: "#343B49",
        },
        paper: {
          50: "#FAFAF9",
          100: "#F4F3F1",
          200: "#E9E7E3",
          300: "#D8D5CF",
        },
        ash: {
          200: "#EDEEF2",
          300: "#C4C8D2",
          400: "#9AA1B0",
          500: "#6B7280",
        },
        cue: {
          DEFAULT: "#F2B84B",
          soft: "#FFD989",
          dim: "#7A5C22",
        },
        signal: {
          done: "#5FD0A4",
          live: "#E8734A",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.24), 0 8px 24px -12px rgba(0,0,0,0.4)",
        cardHover: "0 4px 12px rgba(0,0,0,0.3), 0 16px 40px -16px rgba(0,0,0,0.55)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.35s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};
