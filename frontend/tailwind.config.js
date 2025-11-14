/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Forest Mist Theme Colors
        primary: {
          DEFAULT: "#34d399",
          light: "#6ee7b7",
          dark: "#059669",
        },
        secondary: {
          DEFAULT: "#14b8a6",
          light: "#5eead4",
          dark: "#0d9488",
        },
        accent: {
          DEFAULT: "#5eead4",
          light: "#99f6e4",
          dark: "#2dd4bf",
        },
        glass: {
          bg: "rgba(255, 255, 255, 0.05)",
          "bg-hover": "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.1)",
          "border-hover": "rgba(255, 255, 255, 0.2)",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.2)",
        "glass-lg": "0 20px 60px rgba(0, 0, 0, 0.3)",
        "glow-primary": "0 4px 15px rgba(52, 211, 153, 0.4)",
        "glow-primary-lg": "0 6px 25px rgba(52, 211, 153, 0.6)",
        "glow-success": "0 4px 15px rgba(16, 185, 129, 0.4)",
        "glow-error": "0 4px 15px rgba(239, 68, 68, 0.4)",
      },
      animation: {
        float: "float 20s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, 30px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forest: {
          primary: "#34d399",
          secondary: "#14b8a6",
          accent: "#5eead4",
          neutral: "#1e293b",
          "base-100": "rgba(255, 255, 255, 0.05)",
          "base-200": "rgba(255, 255, 255, 0.03)",
          "base-300": "rgba(255, 255, 255, 0.02)",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};
