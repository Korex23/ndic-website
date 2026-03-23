/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/**/*.js",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2C2E81",
          mid:     "#393CA7",
          dark:    "#1B2735",
          overlay: "#181612",
        },
        surface: {
          light: "#F5F5F5",
          blue:  "#E8F9FF",
          cream: "#FCFBFC",
        },
        ndic: {
          text:      "#141313",
          secondary: "#525252",
          muted:     "#777776",
          dark:      "#292929",
        },
        accent: {
          gold:   "#817F2C",
          orange: "#FE9239",
        },
        "ndic-border": "#D9D9D9",
      },
      fontFamily: {
        heading: ["Oxygen", "sans-serif"],
        body:    ['"Nunito Sans"', "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
