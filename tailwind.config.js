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
          accent: "var(--background-accent)",
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
          accent: "var(--border-accent)",
        },
        font: {
          primary: "var(--font-primary)",
          secondary: "var(--font-secondary)",
          ternary: "var(--font-ternary)",
          remark: "var(--font-remark)",
        },
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [require("@tailwindcss/ui")],
};
