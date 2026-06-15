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
        surface: {
          DEFAULT: "#FAFAFA",
          raised: "#FFFFFF",
          muted: "#F4F4F5",
        },
        ink: {
          DEFAULT: "#18181B",
          secondary: "#52525B",
          muted: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          muted: "#EFF6FF",
        },
        line: {
          DEFAULT: "#E4E4E7",
          strong: "#D4D4D8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
