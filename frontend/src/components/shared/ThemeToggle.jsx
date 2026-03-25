import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "urbandark" : "deserturban";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    
    if (theme === "urbandark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "deserturban" ? "urbandark" : "deserturban");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 focus:outline-none"
      title={theme === "urbandark" ? "Switch to Architectural Light" : "Switch to Obsidian Dark"}
    >
      {theme === "urbandark" ? (
        <Sun size={20} className="text-yellow-400 animate-in spin-in-180 duration-700" />
      ) : (
        <Moon size={20} className="text-slate-600 animate-in spin-in-180 duration-700" />
      )}
    </button>
  );
}

export default ThemeToggle;
