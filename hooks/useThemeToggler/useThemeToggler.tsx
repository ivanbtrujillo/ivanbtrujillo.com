import styles from "./useThemeToggler.module.css";
import { useState, useEffect } from "react";

type Theme = "theme-light" | "theme-dark";

const Icon = ({ children }: { children: React.ReactChild }) => (
  <span className="absolute text-font-primary " style={{ marginTop: "-2px" }}>
    {children}
  </span>
);

const Ball = ({ theme }: { theme: Theme }) => (
  <span
    aria-hidden="true"
    className={`${
      theme === "theme-light" ? "translate-x-0" : "translate-x-5"
    } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
  ></span>
);

export const useThemeToggler = () => {
  const [theme, setTheme] = useState<Theme>("theme-light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "theme-light"
      | "theme-dark";
    setTheme(savedTheme || "theme-light");
  }, []);

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
      className={`${theme} ${styles.toggler} focus:outline-none focus:shadow-outline`}
    >
      {theme === "theme-dark" && <Icon>🌙</Icon>}
      <Ball theme={theme} />
      {theme === "theme-light" && <Icon>🌤</Icon>}
    </span>
  );

  return { theme, Toggler };
};
