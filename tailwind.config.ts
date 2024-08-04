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
        "primary-50": "#f6f5f5",
        "primary-100": "#e8e5e5",
        "primary-200": "#d4cecd",
        "primary-300": "#b6acaa",
        "primary-400": "#908380",
        "primary-500": "#756865",
        "primary-600": "#645a56",
        "primary-700": "#544d4a",
        "primary-800": "#494341",
        "primary-900": "#403b39",
        "primary-950": "#191716",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
