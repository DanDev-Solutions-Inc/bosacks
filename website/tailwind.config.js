/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "25px",
      },
      screens: {
        sm: "1000px",
        md: "1000px",
        lg: "1000px",
        xl: "1000px",
        "2xl": "1000px",
      },
    },
    extend: {
      fontFamily: {},
      colors: {
        primary: "#5C0E06",
        grey: "#858585",
      },
    },
  },
  plugins: [],
};
