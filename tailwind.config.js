/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        base: "#ffffff",
      },
      colors: {
        mainColor: "#f5f5f5",
        baseColor: "#565eb6",
        buttonColor: "#efeeee",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
