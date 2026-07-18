import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        "ivory-deep": "#F3EDE4",
        espresso: "#2A211D",
        "espresso-soft": "#5C4F49",
        rosegold: "#B76E79",
        champagne: "#C9A66B",
        blush: "#F1DFDA",
        deeprose: "#8C4550",
        line: "#E4D9CE",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
