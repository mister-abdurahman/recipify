/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand--1": "#FFF44F",
        "brand--2": "#f38e82",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Dancing Script", "sans-serif"],
      },
    },
  },

  plugins: [],
};
