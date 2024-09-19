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
        background: {
          100: "#31263E",
          200: "#44355B",
          300: "#D9D9D9",
        },
        primary: "#ECA72C",
      },
    },
  },
  plugins: [],
};
export default config;
