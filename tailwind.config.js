const { transform } = require("next/dist/build/swc");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      doc: "425px",
      xsm: "470px",
      sm: "640px",
      xmd: "710px",
      md: "768px",
      "md-u": "900px",
      lg: "1024px",
      "2lg": "1170px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        swipe: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "40%": { opacity: 1 },
          "100%": { transform: "translateX(0%)" },
        },
        swipe_left: {
          "0%": { transform: "translateX(100%)", opacity: 0 },
          "40%": { opacity: 1 },
          "100%": { transform: "translateX(0%)" },
        },
        swipe_right: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "40%": { opacity: 1 },
          "100%": { transform: "translateX(0%)" },
        },
        scale_y: {
          "0%": { transform: "scaleY(-100%)" },
          "100%": { transform: "scaleY(0%)" },
        },
        rotateOut: {
          "0%": { transform: "rotate(0deg) scale(1)", opacity: 1 },
          "100%": { transform: "rotate(180deg) scale(0.1)", opacity: 0 },
        },
        rotateIn: {
          "0%": { transform: "rotate(180deg) scale(0.1)", opacity: 0 },
          "100%": { transform: "rotate(0deg) scale(1)", opacity: 1 },
        },
      },
      animation: {
        spin_fast: "spin 1s linear infinite",
        fade: "fade 2s ease-in-out",
        fade_fast: "fade 1s ease-in-out",
        swipe: "swipe 0.8s ease-in-out",
        swipe_left: "swipe_left 0.8s ease-in-out",
        swipe_right: "swipe_right 0.8s ease-in-out",
        hero_swipe_left: "swipe_left 1s ease-in-out",
        hero_swipe_right: "swipe_right 1s ease-in-out",
        scale_y: "scale_y 0.8s ease-in-out",
        rotateOut: "rotateOut 0.3s ease-in-out",
        rotateIn: "rotateIn 0.2s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 250deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient": "linear-gradient(190deg, #141c2e 60%, #DCC428 )",
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        custom: {
          maincolor: "#18ad8f",
          lightermaincolor: "#f3fbf9",
          whiteColor: "#fff",
          BlackColor: "#000",
          lighterblackColor: "#1C1A1BCC",
          gray5D: "#5D6C60",
          Gray858: "#858585",
          gray525: "#525252",
          reservationformgray: "#7B837C",
        },
      },
    },
    fontFamily: {
      almarai: ["Almarai", "Arial", "sans-serif"],
      cairo: ["Cairo", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
