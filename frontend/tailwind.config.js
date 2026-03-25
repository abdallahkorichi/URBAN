/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        deserturban: {
          primary: "#C2A878", // sand
          secondary: "#A68A64", // deeper sand
          accent: "#8C6E4F",
          neutral: "#3D3D3D",
          "base-100": "#F5EFE6", // very light beige
          "base-200": "#E8DFD0",
          "base-300": "#D8CCB8",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        urbandark: {
          primary: "#C2A878", // golden sand
          secondary: "#A68A64", // deeper sand
          accent: "#D4AF37", // brighter gold for dark mode pop
          neutral: "#171616", // almost black
          "base-100": "#121212", // deep obsidian space
          "base-200": "#1A1A1A", // slightly lighter charcoal for cards
          "base-300": "#242424", // lighter borders
          "base-content": "#E8DFD0", // soft off-white text for readability
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
