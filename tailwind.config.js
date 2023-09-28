module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
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
