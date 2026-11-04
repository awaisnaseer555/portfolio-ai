"use client";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark or light theme" className="btn btn-ghost !p-2.5">
      <Sun size={18} className="hidden dark:block" /><Moon size={18} className="dark:hidden" />
    </button>
  );
}
