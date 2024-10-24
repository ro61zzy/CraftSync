import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B1179', // Primary background color
        header: '#5B0A59',  // Header text color
        black: '#000000',    // Body text color
        hover: '#C17EC0'
      },
    },
  },
  plugins: [],
};
export default config;
