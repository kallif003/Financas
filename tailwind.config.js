module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#BCE7D6",
        yellow: "#F1C50E",
        pink: "#e98f93",
        lightYellow: "#EBCD50",
        lightPink: "#F1B5B8",
        lightGreen: "#72EFE9",
        superLightPink: "#FDF3F3",
      },
    },
    screens: {
      sm: { min: "0px", max: "767px" },
      // => @media (min-width: 200px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px) { ... }

      xl: { min: "1280px" },
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}