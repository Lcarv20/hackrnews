import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      md: "var(--font-size-md)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-xxl)",
      "3xl": "var(--font-size-xxxl)",
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out",
      },
      colors: {
        primary: "rgb(var(--color-primary)/ <alpha-value>)",
        secondary: "rgb(var(--color-secondary)/ <alpha-value>)",
        warn: "rgb(var(--color-warn)/ <alpha-value>)",
        error: "rgb(var(--color-error)/ <alpha-value>)",
        info: "rgb(var(--color-info)/ <alpha-value>)",
        success: "rgb(var(--color-success)/ <alpha-value>)",
        surface1: "rgb(var(--surface-1)/ <alpha-value>)",
        surface2: "rgb(var(--surface-2)/ <alpha-value>)",
        surface3: "rgb(var(--surface-3)/ <alpha-value>)",
        background: "rgb(var(--background-color)/ <alpha-value>)",
        textColor: "rgb(var(--text-color)/ <alpha-value>)",
        subText: "rgb(var(--sub-text)/ <alpha-value>)",
        discreetText: "rgb(var(--discreet-text)/ <alpha-value>)",
        link: colors.blue[400],
      },
    },
  },
  // variants: {
  //   extend: {
  //     opacity: ["open"],
  //     translate: ["open"],
  //     transitionProperty: ["open"],
  //     transitionDuration: ["open"],
  //     transitionTimingFunction: ["open"],
  //   },
  // },
  plugins: [],
};
export default config;
