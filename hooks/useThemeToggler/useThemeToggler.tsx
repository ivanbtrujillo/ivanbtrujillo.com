import { useState } from "react";

type Theme = "theme-light" | "theme-dark";

const Icon = ({ children }: { children: React.ReactChild }) => (
  <span className="absolute" style={{ marginTop: "-2px" }}>
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
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem("theme") as "theme-light" | "theme-dark") ||
      "theme-light"
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
      className={`${theme} bg-background-secondary relative text-left align-middle inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline cursor-pointer`}
    >
      {theme === "theme-dark" && <Icon>🌙</Icon>}
      <Ball theme={theme} />
      {theme === "theme-light" && <Icon>🌤</Icon>}
    </span>
  );

  return { theme, Toggler };
};
