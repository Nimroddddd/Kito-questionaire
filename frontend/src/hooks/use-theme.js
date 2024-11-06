import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // First check for saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // If there's a saved theme, use it
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // If no saved theme, use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(prefersDark.matches ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark.matches);

      // Add listener for system theme changes
      const mediaQueryListener = (e) => {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", e.matches);
      };

      prefersDark.addEventListener("change", mediaQueryListener);
      return () =>
        prefersDark.removeEventListener("change", mediaQueryListener);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggleTheme };
}
