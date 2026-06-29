import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: "#1F4F9C",
            dark: "#15396E",
            light: "#3A6FB8",
            50: "#EAF0F9",
            100: "#C9D8EE",
          },
          lime: {
            DEFAULT: "#AFCA0B",
            dark: "#8FA808",
            light: "#C9DE4A",
            50: "#F5FAD8",
          },
        },
        cta: {
          green: { DEFAULT: "#25D366", dark: "#1FB957" },
        },
        ink: {
          primary: "#1A2332",
          secondary: "#5A6776",
          tertiary: "#8B96A5",
        },
        surface: {
          base: "#FAFBFC",
          DEFAULT: "#FFFFFF",
          muted: "#F3F5F8",
        },
        line: {
          subtle: "#E5E9EF",
          DEFAULT: "#CDD4DE",
        },
      },
      fontFamily: {
        display: ["var(--font-raleway)", "system-ui", "sans-serif"],
        body: ["var(--font-roboto)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "brand-xs": "0 1px 2px rgba(31, 79, 156, 0.04)",
        "brand-sm":
          "0 2px 6px rgba(31, 79, 156, 0.06), 0 1px 2px rgba(31, 79, 156, 0.04)",
        "brand-md":
          "0 6px 16px rgba(31, 79, 156, 0.08), 0 2px 4px rgba(31, 79, 156, 0.04)",
        "brand-lg":
          "0 16px 40px rgba(31, 79, 156, 0.10), 0 4px 12px rgba(31, 79, 156, 0.05)",
        glow: "0 0 0 4px rgba(31, 79, 156, 0.12)",
      },
      borderRadius: {
        pill: "999px",
      },
      transitionTimingFunction: {
        "ease-out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "spine-pulse": "spinePulse 2.4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
      },
      keyframes: {
        spinePulse: {
          "0%, 100%": { opacity: "0.4", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(1.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
