import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {

  darkMode: "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#05111b",
          deep: "#0a192f",
          primary: "#06b6d4",
          secondary: "#10b981",
          accent: "#1e293b",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "#06b6d4",
          foreground: "#ffffff",
        },
      },
      backgroundImage: {
        'brand-gradient': "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
        'hero-gradient': "radial-gradient(circle at top right, #115e59, #05111b)",
      }
    },
  },
  plugins: [tailwindAnimate],
};

export default config;