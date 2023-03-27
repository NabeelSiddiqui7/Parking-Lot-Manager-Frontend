/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        main: '125px',
      },
      backgroundImage: {
        'card-gradient': "linear-gradient(284.32deg, rgba(255, 255, 255, 0) 3.13%, rgba(255, 255, 255, 0.018) 98.92%);"
      },
      
      colors: {
        ...colors,
        primary: "#0015BC",
        secondary: "#FF0000",
        other: "#22c74e",
        white: "white",
        black: "black",
        selectBg: "white",
        selectBorder: "#e3edfc",
        selectBorderActive: "#6b96db",
        blue: "#2563EB",
        red: "#EF4444",
        lightGreyText: "#4a4a4a",
        blueGray300: "#90a4ae",
        blueGray600: "#546e7a",
        blue500: "#2196f3",
        footerBackground: "#3F3F46",
        footerText: "#d4d4d4",
        tooltipBack: "#e6f7f4",
        searchHover: "#deebff",
        textColor: "#dbdbdb"
      }
    },
  },
  plugins: [],
}
