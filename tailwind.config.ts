import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      animation: {
        'gradient-x': 'gradient 15s ease infinite',
      },
      colors: {
        dark: '#121212', // Custom dark color
        accent: '#ff3cac', // Custom accent color
      },
      fontFamily: {
        'calm': ['Orbitron', 'sans-serif'], // Use your custom font name here
      },
    },
  },
  plugins: [],
};
export default config;
