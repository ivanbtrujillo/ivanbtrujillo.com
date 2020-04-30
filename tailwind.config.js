// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: {
          primary: "var(--background-primary)",
          secondary: "var(--background-secondary)",
          ternary: "var(--background-ternary)",
          accent: "var(--background-accent)",
        },
        font: {
          primary: "var(--font-primary)",
          secondary: "var(--font-secondary)",
          ternary: "var(--font-ternary)",
        },
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [require("@tailwindcss/ui")],
};
