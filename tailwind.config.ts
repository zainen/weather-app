import type { Config } from "tailwindcss"
const { fontFamily } = require("tailwindcss/defaultTheme")

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      monserrat: ["monserrat-bold", "monserrat-italic", "monserrat"]
    },
    extend: {
      colors: {
        "thunderstorm-day": "#4D5B6B",
        "drizzle-day": "#7393A7",
        "rain-day": "#577590",
        "snow-day": "#95A5A6",
        "atmosphere-day": "#B2BEC3",
        "clear-day": "#48A9A6",
        "clouds-day": "#778DA9",
        "thunderstorm-night": "#334551",
        "drizzle-night": "#506974",
        "rain-night": "#3B4E5A",
        "snow-night": "#6C7D8B",
        "atmosphere-night": "#546A7B",
        "clear-night": "#2C3E50",
        "clouds-night": "#475B64",

        "primary-dark": "#2B2D42 ",
        "primary-light": '#E0E1DD',
        "secondary-text": '#A9B2AC',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config