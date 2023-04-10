/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        anakin: {
          50: "#ecfcff",
          100: "#cef7ff",
          200: "#8de8fe",
          300: "#63ddfd",
          400: "#1dc3f3",
          500: "#01a6d9",
          600: "#0484b6",
          700: "#0b6a93",
          800: "#135677",
          900: "#144865",
          950: "#062e46",
        },
        ebony: {
          50: "#f3f6fc",
          100: "#e7edf7",
          200: "#c9d8ee",
          300: "#9ab9df",
          400: "#6393cd",
          500: "#3f76b8",
          600: "#2e5d9b",
          700: "#274b7d",
          800: "#234069",
          900: "#223758",
          950: "#0c131f",
        },
      },
    },
  },
  plugins: [],
};
