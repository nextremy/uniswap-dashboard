import headlessUIPlugin from "@headlessui/tailwindcss";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.zinc,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      blue: colors.blue,
    },
  },
  plugins: [headlessUIPlugin],
  darkMode: "class",
};

export default config;
