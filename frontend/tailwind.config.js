import daisyui from "daisyui";
import { keepTheme } from "keep-react/keepTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        metal: {
          200: "#3498db",
          700: "#e74c3c",
        },
      },
    },
  },
  plugins: [daisyui, keepTheme],
  daisyui: {
    themes: ["business"],
  },
};
