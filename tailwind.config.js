/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yantramanav: ["Yantramanav", "sans-serif"],
        muktaVaani: ["Mukta Vaani", "sans-serif"],
        imprima: ["Imprima", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        overlayFadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 0.65 },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 1s ease-out",
        overlayFadeIn: "overlayFadeIn 1.5s ease-in",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transition-standard": {
          transition: "all 0.3s ease-in-out",
        },
      });
    },
    require('@tailwindcss/line-clamp'),
  ],
};
