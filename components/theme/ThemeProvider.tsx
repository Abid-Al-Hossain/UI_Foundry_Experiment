"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ThemeId } from "./themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  customTheme: ThemeVars;
  setCustomTheme: (t: ThemeVars) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ui-foundry-theme";
const CUSTOM_STORAGE_KEY = "ui-foundry-custom-theme";
const DEFAULT_THEME: ThemeId = "navy";

export type ThemeVars = {
  bg: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  primaryHover: string;
  ring: string;
};

const DEFAULT_CUSTOM_THEME: ThemeVars = {
  bg: "#070b16",
  surface: "#0c142b",
  card: "#0f1a36",
  text: "#eaf0ff",
  muted: "#a9b7e6",
  border: "rgba(255, 255, 255, 0.12)",
  primary: "#4f7cff",
  primaryHover: "#3f6fff",
  ring: "rgba(79, 124, 255, 0.35)",
};

function applyThemeVars(vars?: ThemeVars) {
  const root = document.documentElement;
  const keys: (keyof ThemeVars)[] = [
    "bg",
    "surface",
    "card",
    "text",
    "muted",
    "border",
    "primary",
    "primaryHover",
    "ring",
  ];
  keys.forEach((key) => {
    const cssKey = `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
    if (vars) root.style.setProperty(cssKey, vars[key]);
    else root.style.removeProperty(cssKey);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [customTheme, setCustomThemeState] = useState<ThemeVars>(DEFAULT_CUSTOM_THEME);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as ThemeId | null) ?? DEFAULT_THEME;
      setThemeState(saved);
      const savedCustom = localStorage.getItem(CUSTOM_STORAGE_KEY);
      if (savedCustom) {
        setCustomThemeState(JSON.parse(savedCustom) as ThemeVars);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "custom") {
      applyThemeVars(customTheme);
    } else {
      applyThemeVars();
    }
  }, [theme, customTheme]);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // ignore
    }
  };

  const setCustomTheme = (t: ThemeVars) => {
    setCustomThemeState(t);
    try {
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(t));
    } catch {
      // ignore
    }
  };

  const value = useMemo(
    () => ({ theme, setTheme, customTheme, setCustomTheme }),
    [theme, customTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
