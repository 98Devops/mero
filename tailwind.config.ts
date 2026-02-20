import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Color palette - dark background, glass colors, neon accents (Req 8.1, 8.2, 8.3)
      colors: {
        background: {
          primary: "#0a0a0a",
          secondary: "#141414",
        },
        glass: {
          background: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.08)",
          "border-hover": "rgba(255, 255, 255, 0.2)",
        },
        accent: {
          primary: "#00f5ff",
          secondary: "#7c3aed",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a0a0a0",
          muted: "#666666",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-dark": "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
      },
      // Typography scale and font families (Req 8.1)
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
      // Spacing system (Req 8.4)
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
      // Responsive breakpoints (Req 8.1)
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      // Backdrop blur for glassmorphism (Req 8.4)
      backdropBlur: {
        xs: "2px",
      },
      // Box shadows for glass effects (Req 8.4)
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-hover": "0 0 30px rgba(0, 245, 255, 0.1)",
        glow: "0 0 20px rgba(0, 245, 255, 0.3)",
      },
      // Animation durations
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [
    // Custom utilities for glassmorphism effects (Req 8.4)
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "1rem",
        },
        ".glass-card-hover": {
          background: "rgba(255, 255, 255, 0.08)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 30px rgba(0, 245, 255, 0.1)",
        },
        ".text-gradient": {
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundImage: "linear-gradient(135deg, #00f5ff 0%, #7c3aed 100%)",
        },
      });
    }),
  ],
};

export default config;
