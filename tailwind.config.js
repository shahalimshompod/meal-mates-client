/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tanHeadline: ["TanHeadline", "sans-serif"],
      },
      colors: {
        orange: "#FF914C",
        button: "#CBF3F0",
        btnHover: "#2EC4B6"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

