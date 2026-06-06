import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: "#0B132B", 950: "#020C1B" },
        slate: { 800: "#1C2541", 900: "#3A506B" },
        cyan: { 400: "#00E5FF", 500: "#00B4D8" }
      }
    }
  },
  plugins: [],
};
export default config;
