/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/dashboard/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        marquee: "marquee 50s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      /* ================= FONT SYSTEM ================= */
      fontFamily: {
        // 🔥 BODY / CHAT FONT (SMOOTH READING)
        sans: ["Geist", "SF Pro Display", "Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "Helvetica Neue", "sans-serif"],

        // 💎 HEADINGS / PREMIUM UI
        display: ["Geist", "SF Pro Display", "Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "Helvetica Neue", "sans-serif"],
      },

      /* ================= TYPOGRAPHY ================= */
      fontSize: {
        base: ["17px", { lineHeight: "1.8" }],
        lg: ["18px", { lineHeight: "1.9" }],
        xl: ["20px", { lineHeight: "2" }],
      },

      /* ================= LETTER SPACING ================= */
      letterSpacing: {
        tight: "-0.01em",
        normal: "0.01em",
      },

      /* ================= EXTRA (PREMIUM FEEL) ================= */
      maxWidth: {
        reading: "760px", // 👀 perfect reading width
      },
    },
  },

  plugins: [
    require("tailwind-scrollbar"),
  ],
};