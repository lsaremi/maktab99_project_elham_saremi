/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tw-elements-react/dist/plugin.cjs"),
    require("tailwind-scrollbar-hide"),
  ],
=======
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
>>>>>>> origin/payment-gateway
};
