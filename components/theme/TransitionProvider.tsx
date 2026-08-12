"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ANIMATIONS } from "./animations";
import type { AnimationType, Direction, Speed } from "./types";
import { type Theme3DId, THEMES_3D } from "./themes3d";
import { SECTION_LIST } from "../registry/componentRegistry";

type Settings3D = { perspective: number; tiltMax: number; shadowDepth: number };

type TransitionContextValue = {
  animation: AnimationType;
  setAnimation: (value: AnimationType) => void;
  speed: Speed;
  setSpeed: (value: Speed) => void;
  direction: Direction;
  mode3d: Theme3DId;
  setMode3d: (value: Theme3DId) => void;
  settings3d: Settings3D;
  updateSettings3d: (key: keyof Settings3D, value: number) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);
const STORAGE_KEY = "ui-foundry-motion";
const DEFAULT_SETTINGS: Settings3D = { perspective: 1200, tiltMax: 5, shadowDepth: 20 };
const SPEEDS = new Set<Speed>(["slow", "normal", "fast", "sonic"]);
const MODES_3D = new Set<Theme3DId>(Object.keys(THEMES_3D) as Theme3DId[]);
const ORDERED_COMPONENTS = SECTION_LIST.flatMap((section) => section.items.map((item) => item.slug));

function routeDepth(path: string) {
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return 0;
  if (parts.length === 1 && parts[0] === "components") return 1;
  if (parts.length === 2 && parts[0] === "components") return 2;
  if (parts.length >= 3) return 3;
  return 1;
}

function componentSlug(path: string) {
  const parts = path.split("/").filter(Boolean);
  return parts.length >= 2 && parts[0] === "components" ? parts[1] : null;
}

function routeDirection(previousPath: string, nextPath: string): Direction {
  if (previousPath === nextPath) return "left";
  const previousDepth = routeDepth(previousPath);
  const nextDepth = routeDepth(nextPath);
  if (nextDepth > previousDepth) return "left";
  if (nextDepth < previousDepth) return "right";

  const previousSlug = componentSlug(previousPath);
  const nextSlug = componentSlug(nextPath);
  if (!previousSlug || !nextSlug) return "left";
  const previousIndex = ORDERED_COMPONENTS.indexOf(previousSlug);
  const nextIndex = ORDERED_COMPONENTS.indexOf(nextSlug);
  if (previousIndex < 0 || nextIndex < 0) return "left";
  return nextIndex > previousIndex ? "down" : "up";
}

function finiteInRange(value: unknown, fallback: number, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value))
    : fallback;
}

function validateSettings(value: unknown): Settings3D {
  if (!value || typeof value !== "object") return DEFAULT_SETTINGS;
  const candidate = value as Partial<Settings3D>;
  return {
    perspective: finiteInRange(candidate.perspective, DEFAULT_SETTINGS.perspective, 200, 4000),
    tiltMax: finiteInRange(candidate.tiltMax, DEFAULT_SETTINGS.tiltMax, 0, 45),
    shadowDepth: finiteInRange(candidate.shadowDepth, DEFAULT_SETTINGS.shadowDepth, 0, 120),
  };
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [animation, setAnimation] = useState<AnimationType>("fade");
  const [speed, setSpeed] = useState<Speed>("normal");
  const [mode3d, setMode3d] = useState<Theme3DId>("standard");
  const [settings3d, setSettings3d] = useState<Settings3D>(DEFAULT_SETTINGS);
  const [storageReady, setStorageReady] = useState(false);
  const [route, setRoute] = useState<{ path: string; direction: Direction }>({ path: pathname, direction: "left" });

  if (route.path !== pathname) {
    setRoute({ path: pathname, direction: routeDirection(route.path, pathname) });
  }

  useEffect(() => {
    let nextAnimation: AnimationType = "fade";
    let nextSpeed: Speed = "normal";
    let nextMode: Theme3DId = "standard";
    let nextSettings = DEFAULT_SETTINGS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === "object") {
        const candidate = parsed as Record<string, unknown>;
        if (typeof candidate.animation === "string" && candidate.animation in ANIMATIONS) {
          nextAnimation = candidate.animation as AnimationType;
        }
        if (SPEEDS.has(candidate.speed as Speed)) nextSpeed = candidate.speed as Speed;
        if (MODES_3D.has(candidate.mode3d as Theme3DId)) nextMode = candidate.mode3d as Theme3DId;
        nextSettings = validateSettings(candidate.settings3d);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    queueMicrotask(() => {
      setAnimation(nextAnimation);
      setSpeed(nextSpeed);
      setMode3d(nextMode);
      setSettings3d(nextSettings);
      setStorageReady(true);
    });
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ animation, speed, mode3d, settings3d }));
  }, [animation, mode3d, settings3d, speed, storageReady]);

  useEffect(() => {
    const root = document.documentElement;
    const themeDefinition = THEMES_3D[mode3d] ?? THEMES_3D.standard;
    if (mode3d === "standard") {
      for (const property of ["--ui-perspective", "--ui-tilt-max", "--ui-shadow-depth", "--ui-card-border"]) {
        root.style.removeProperty(property);
      }
      return;
    }
    root.style.setProperty("--ui-perspective", `${settings3d.perspective}px`);
    root.style.setProperty("--ui-tilt-max", `${settings3d.tiltMax}deg`);
    root.style.setProperty("--ui-shadow-depth", `${settings3d.shadowDepth}px`);
    root.style.setProperty("--ui-card-border", themeDefinition.vars.cardBorder);
  }, [mode3d, settings3d]);

  const updateSettings3d = useCallback((key: keyof Settings3D, value: number) => {
    setSettings3d((current) => validateSettings({ ...current, [key]: value }));
  }, []);

  const value = useMemo<TransitionContextValue>(
    () => ({ animation, setAnimation, speed, setSpeed, direction: route.direction, mode3d, setMode3d, settings3d, updateSettings3d }),
    [animation, mode3d, route.direction, settings3d, speed, updateSettings3d],
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used inside TransitionProvider");
  return context;
}
