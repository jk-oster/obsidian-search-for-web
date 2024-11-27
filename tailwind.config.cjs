module.exports = {
  // prefix: 'ob-',
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
      fontSize: {
        "4xl": "32px",
        "3xl": "24px",
        "2xl": "22px",
        "xl": "20px",
        "lg": "18px",
        "base": "16px",
        "sm": "14px",
        "xs": "12px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
