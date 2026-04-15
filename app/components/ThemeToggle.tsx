"use client"

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") setTheme("light");
      else setTheme("dark");
    } catch (e) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  return (
    <button
      className="theme-toggle-button p-2 rounded focus:outline-none"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 4.354a1 1 0 011 1V7a1 1 0 11-2 0V5.354a1 1 0 011-1zM12 17a5 5 0 100-10 5 5 0 000 10zm7.646-2.354a1 1 0 010 1.414L18.414 19.293a1 1 0 11-1.414-1.414l1.232-1.232a1 1 0 011.414 0zM6.586 6.586a1 1 0 010 1.414L5.354 9.828A1 1 0 114 8.414L5.232 7.182a1 1 0 011.354-.596zM20 12a1 1 0 110 2h-1a1 1 0 110-2h1zM5 12a1 1 0 110 2H4a1 1 0 110-2h1zM17.657 6.343a1 1 0 010 1.414l-0.707 0.707a1 1 0 11-1.414-1.414l0.707-0.707a1 1 0 011.414 0zM7.05 17.657a1 1 0 010 1.414l-0.707 0.707a1 1 0 11-1.414-1.414l0.707-0.707a1 1 0 011.414 0z" />
        </svg>
      )}
    </button>
  );
}
