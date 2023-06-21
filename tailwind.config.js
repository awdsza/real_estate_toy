/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        base: "#ffffff",
        button: {
          baseColor: "#565eb6",
        },
      },
      colors: {
        mainColor: "#f5f5f5",
        baseColor: "#565eb6",

        buttonColor: "#efeeee",
      },
      borderWidth: {
        1: "1px",
      },
      translate: {
        xHalf: "50%",
        yHalf: "50%",
      },
    },
  },
  plugins: [],
};
