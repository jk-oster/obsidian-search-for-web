module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
  // purge: [
  //   "./options.html",
  //   "./src/**/*.{vue,js,ts,jsx,tsx}",
  // ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: "#ffff33",
        white: "white",
        black: "black",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
