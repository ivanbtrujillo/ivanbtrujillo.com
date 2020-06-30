import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
type Theme = "theme-light" | "theme-dark";

export const useThemeToggler = () => {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem("theme") as "theme-light" | "theme-dark") ||
      "theme-dark"
  );

  const changeTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  const Toggler = () => (
    <span
      onClick={() =>
        changeTheme(theme === "theme-light" ? "theme-dark" : "theme-light")
      }
      role="checkbox"
      aria-checked="false"
      className="text-xl cursor-pointer hover:text-3xl bg-background-secondary rounded-full h-8 w-8 flex items-center justify-center"
    >
      {theme === "theme-dark" && <FiSun />}
      {theme === "theme-light" && <FiMoon />}
    </span>
  );

  return { theme, Toggler };
};
