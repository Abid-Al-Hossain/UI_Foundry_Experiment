"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { THEMES, type ThemeId } from "./themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  customTheme: ThemeVars;
  setCustomTheme: (theme: ThemeVars) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "ui-foundry-theme";
const CUSTOM_STORAGE_KEY = "ui-foundry-custom-theme";
const DEFAULT_THEME: ThemeId = "navy";
const THEME_IDS = new Set<ThemeId>(THEMES.map(({ id }) => id));

export type ThemeVars = {
  bg: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  onPrimary: string;
  primaryHover: string;
  ring: string;
};

export const DEFAULT_CUSTOM_THEME: ThemeVars = {
  bg: "#070b16",
  surface: "#0c142b",
  card: "#0f1a36",
  text: "#eaf0ff",
  muted: "#a9b7e6",
  border: "rgba(255, 255, 255, 0.12)",
  primary: "#4f7cff",
  onPrimary: "#ffffff",
  primaryHover: "#3f6fff",
  ring: "rgba(79, 124, 255, 0.35)",
};

const THEME_VAR_KEYS = Object.keys(DEFAULT_CUSTOM_THEME) as (keyof ThemeVars)[];

type ThemeSnapshot = {
  theme: ThemeId;
  customTheme: ThemeVars;
};

const themeListeners = new Set<() => void>();

let cachedSnapshot: ThemeSnapshot = {
  theme: DEFAULT_THEME,
  customTheme: DEFAULT_CUSTOM_THEME,
};
let cachedTheme: ThemeId = DEFAULT_THEME;
let cachedCustom: ThemeVars = DEFAULT_CUSTOM_THEME;

const isThemeId = (value: unknown): value is ThemeId =>
  typeof value === "string" && THEME_IDS.has(value as ThemeId);

const isCssColor = (value: unknown): value is string => {
  if (typeof value !== "string" || value.length === 0 || value.length > 128) return false;
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return /^(#[\da-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)$/i.test(value);
  }
  return CSS.supports("color", value);
};

const normalizeCustomTheme = (value: unknown): ThemeVars => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return DEFAULT_CUSTOM_THEME;
  }

  const input = value as Record<string, unknown>;
  const normalized = { ...DEFAULT_CUSTOM_THEME };
  for (const key of THEME_VAR_KEYS) {
    if (isCssColor(input[key])) normalized[key] = input[key];
  }
  return normalized;
};

const sameCustomTheme = (a: ThemeVars, b: ThemeVars) =>
  THEME_VAR_KEYS.every((key) => a[key] === b[key]);

const getStoredSnapshot = (): ThemeSnapshot => {
  if (typeof window === "undefined") return cachedSnapshot;

  let theme: ThemeId = DEFAULT_THEME;
  let customTheme = DEFAULT_CUSTOM_THEME;
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (isThemeId(savedTheme)) theme = savedTheme;

    const savedCustom = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (savedCustom) customTheme = normalizeCustomTheme(JSON.parse(savedCustom));
  } catch {
    // Invalid or unavailable storage must never prevent the app from rendering.
  }

  if (theme === cachedTheme && sameCustomTheme(customTheme, cachedCustom)) {
    return cachedSnapshot;
  }

  cachedTheme = theme;
  cachedCustom = customTheme;
  cachedSnapshot = { theme, customTheme };
  return cachedSnapshot;
};

const getServerSnapshot = (): ThemeSnapshot => cachedSnapshot;

const subscribe = (callback: () => void) => {
  themeListeners.add(callback);
  if (typeof window === "undefined") {
    return () => themeListeners.delete(callback);
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === CUSTOM_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
};

const emitThemeChange = () => {
  cachedTheme = "" as ThemeId;
  themeListeners.forEach((listener) => listener());
};

function applyThemeVars(vars?: ThemeVars) {
  const root = document.documentElement;
  THEME_VAR_KEYS.forEach((key) => {
    const cssKey = `--${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`;
    if (vars) root.style.setProperty(cssKey, vars[key]);
    else root.style.removeProperty(cssKey);
  });
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, customTheme } = useSyncExternalStore(subscribe, getStoredSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    applyThemeVars(theme === "custom" ? customTheme : undefined);
  }, [theme, customTheme]);

  const setTheme = (nextTheme: ThemeId) => {
    if (!isThemeId(nextTheme)) return;
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The in-memory theme still remains usable when storage is unavailable.
    }
    emitThemeChange();
  };

  const setCustomTheme = (nextTheme: ThemeVars) => {
    const normalized = normalizeCustomTheme(nextTheme);
    try {
      localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(normalized));
    } catch {
      // The current render remains usable when storage is unavailable.
    }
    emitThemeChange();
  };

  const value = useMemo(
    () => ({ theme, setTheme, customTheme, setCustomTheme }),
    [theme, customTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
