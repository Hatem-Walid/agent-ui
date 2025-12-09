/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        shine: {
          "0%": { backgroundPositionX: "200%" },
          "100%": { backgroundPositionX: "-200%" },
        },
      },
      animation: {
        shine: "shine 4s linear infinite",
      },
    },
  },
  plugins: [],
};
