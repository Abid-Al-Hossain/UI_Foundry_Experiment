"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ANIMATIONS } from "../theme/animations";
import { useTheme, type ThemeVars } from "../theme/ThemeProvider";
import { THEMES } from "../theme/themes";
import { THEMES_3D, type Theme3DId } from "../theme/themes3d";
import { useTransition } from "../theme/TransitionProvider";
import type { AnimationType } from "../theme/types";

type SettingsTab = "theme" | "motion" | "3d";

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.4 15a8.7 8.7 0 0 0 .1-1l2-1.2-2-3.4-2.3.6a7.6 7.6 0 0 0-1.7-1l-.3-2.4H11l-.3 2.4a7.6 7.6 0 0 0-1.7 1l-2.3-.6-2 3.4 2 1.2a8.7 8.7 0 0 0 .1 1 8.7 8.7 0 0 0-.1 1l-2 1.2 2 3.4 2.3-.6a7.6 7.6 0 0 0 1.7 1l.3 2.4h4.2l.3-2.4a7.6 7.6 0 0 0 1.7-1l2.3.6 2-3.4-2-1.2a8.7 8.7 0 0 0-.1-1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.9"
      />
    </svg>
  );
}

function TabButton({
  tab,
  activeTab,
  onSelect,
  panelId,
  children,
}: {
  tab: SettingsTab;
  activeTab: SettingsTab;
  onSelect: (tab: SettingsTab) => void;
  panelId: string;
  children: React.ReactNode;
}) {
  const active = tab === activeTab;
  return (
    <button
      id={`${panelId}-${tab}-tab`}
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`${panelId}-${tab}-panel`}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(tab)}
      className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
        active ? "text-white" : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {children}
      {active && (
        <span
          className="absolute inset-x-0 bottom-0 h-0.5 rounded-full"
          style={{ background: "var(--primary)" }}
        />
      )}
    </button>
  );
}

const clampByte = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

const toColorInputValue = (value: string, fallback = "#ffffff") => {
  const hex = value.trim().match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);
  if (hex) {
    const raw = hex[1];
    if (raw.length === 3) return `#${raw.split("").map((part) => part + part).join("")}`;
    return `#${raw.slice(0, 6)}`;
  }

  const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (!rgb) return fallback;
  return `#${[rgb[1], rgb[2], rgb[3]]
    .map((part) => clampByte(Number(part)).toString(16).padStart(2, "0"))
    .join("")}`;
};

export default function Header() {
  const { theme, setTheme, customTheme, setCustomTheme } = useTheme();
  const {
    animation,
    setAnimation,
    speed,
    setSpeed,
    mode3d,
    setMode3d,
    settings3d,
    updateSettings3d,
  } = useTransition();

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<SettingsTab>("theme");
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelId = useId().replace(/:/g, "");

  const closeSettings = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => document.getElementById(`${panelId}-${tab}-tab`)?.focus());
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !popoverRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, panelId, tab]);

  const updateCustom = (key: keyof ThemeVars, value: string) => {
    setCustomTheme({ ...customTheme, [key]: value });
  };

  const selectTab = (nextTab: SettingsTab) => setTab(nextTab);
  const moveTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!(["ArrowLeft", "ArrowRight", "Home", "End"] as string[]).includes(event.key)) return;
    event.preventDefault();
    const tabs: SettingsTab[] = ["theme", "motion", "3d"];
    const currentIndex = tabs.indexOf(tab);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (currentIndex + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    setTab(nextTab);
    requestAnimationFrame(() =>
      document.getElementById(`${panelId}-${nextTab}-tab`)?.focus()
    );
  };

  const colorFields: { key: keyof ThemeVars; label: string }[] = [
    { key: "bg", label: "Background" },
    { key: "surface", label: "Surface" },
    { key: "card", label: "Card" },
    { key: "text", label: "Text" },
    { key: "muted", label: "Muted" },
    { key: "border", label: "Border" },
    { key: "primary", label: "Primary" },
    { key: "onPrimary", label: "On primary" },
    { key: "primaryHover", label: "Primary hover" },
    { key: "ring", label: "Ring" },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in oklab, var(--surface) 88%, transparent)",
      }}
      suppressHydrationWarning
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group inline-flex min-w-0 items-center gap-2">
          <span className="truncate text-base font-semibold tracking-tight transition-opacity group-hover:opacity-80">
            UI Foundry
          </span>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            beta
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-sm sm:gap-4" style={{ color: "var(--muted)" }}>
          <Link className="hidden transition hover:opacity-90 hover:underline sm:inline" href="/">
            Home
          </Link>
          <Link
            className="hidden transition hover:opacity-90 hover:underline sm:inline"
            href="/components/buttons"
          >
            Components
          </Link>

          <div className="relative" ref={popoverRef}>
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls={`${panelId}-dialog`}
              onClick={() => (open ? closeSettings(false) : setOpen(true))}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition active:scale-95"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                background: "var(--card)",
              }}
            >
              <GearIcon />
              <span className="hidden xs:inline">Settings</span>
              <span className="sr-only xs:hidden">Settings</span>
            </button>

            {open && (
              <div
                id={`${panelId}-dialog`}
                role="dialog"
                aria-label="UI Foundry settings"
                className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-2xl ring-1 ring-black/5"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div
                  role="tablist"
                  aria-label="Settings sections"
                  onKeyDown={moveTab}
                  className="flex border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <TabButton tab="theme" activeTab={tab} onSelect={selectTab} panelId={panelId}>
                    Theme
                  </TabButton>
                  <TabButton tab="motion" activeTab={tab} onSelect={selectTab} panelId={panelId}>
                    Motion
                  </TabButton>
                  <TabButton tab="3d" activeTab={tab} onSelect={selectTab} panelId={panelId}>
                    3D Depth
                  </TabButton>
                </div>

                <div className="custom-scrollbar max-h-[min(60vh,32rem)] overflow-y-auto p-4">
                  {tab === "theme" && (
                    <div
                      id={`${panelId}-theme-panel`}
                      role="tabpanel"
                      aria-labelledby={`${panelId}-theme-tab`}
                      className="space-y-4"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                        Color Palette
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {THEMES.map((themeOption) => (
                          <button
                            key={themeOption.id}
                            type="button"
                            aria-pressed={theme === themeOption.id}
                            onClick={() => setTheme(themeOption.id)}
                            className="flex w-full flex-col gap-0.5 rounded-lg border px-3 py-2 text-left text-sm transition hover:bg-white/5"
                            style={{
                              borderColor:
                                theme === themeOption.id ? "var(--primary)" : "transparent",
                              background: theme === themeOption.id ? "var(--card)" : undefined,
                            }}
                          >
                            <span className="font-medium">{themeOption.name}</span>
                            <span className="text-[10px] opacity-60">{themeOption.description}</span>
                          </button>
                        ))}
                      </div>

                      {theme === "custom" && (
                        <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                          <div className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-50">
                            Custom Colors
                          </div>
                          <div className="grid gap-3">
                            {colorFields.map(({ key, label }) => (
                              <label key={key} className="flex items-center justify-between gap-3 text-sm">
                                <span style={{ color: "var(--text)" }}>{label}</span>
                                <input
                                  type="color"
                                  value={toColorInputValue(customTheme[key])}
                                  onChange={(event) => updateCustom(key, event.target.value)}
                                  className="h-7 w-10 cursor-pointer rounded border"
                                  style={{ borderColor: "var(--border)" }}
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {tab === "motion" && (
                    <div
                      id={`${panelId}-motion-panel`}
                      role="tabpanel"
                      aria-labelledby={`${panelId}-motion-tab`}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                          Page Transition
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(ANIMATIONS).map((key) => (
                            <button
                              key={key}
                              type="button"
                              aria-pressed={animation === key}
                              onClick={() => setAnimation(key as AnimationType)}
                              className="rounded-md border px-3 py-2 text-xs font-medium capitalize transition hover:bg-white/5"
                              style={{
                                borderColor: animation === key ? "var(--primary)" : "var(--border)",
                                color: animation === key ? "var(--primary)" : "var(--text)",
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">Speed</div>
                        <div
                          role="group"
                          aria-label="Transition speed"
                          className="grid grid-cols-4 gap-1 rounded-lg border p-1"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {(["slow", "normal", "fast", "sonic"] as const).map((speedOption) => (
                            <button
                              key={speedOption}
                              type="button"
                              aria-pressed={speed === speedOption}
                              onClick={() => setSpeed(speedOption)}
                              className="rounded py-1 text-[10px] font-medium capitalize transition"
                              style={{
                                background: speed === speedOption ? "var(--primary)" : "transparent",
                                color: speed === speedOption ? "var(--on-primary)" : "var(--muted)",
                              }}
                            >
                              {speedOption}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === "3d" && (
                    <div
                      id={`${panelId}-3d-panel`}
                      role="tabpanel"
                      aria-labelledby={`${panelId}-3d-tab`}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                          3D Environment
                        </div>
                        <div className="flex flex-col gap-2">
                          {(Object.keys(THEMES_3D) as Theme3DId[]).map((key) => {
                            const active = mode3d === key;
                            return (
                              <button
                                key={key}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setMode3d(key)}
                                className="flex items-center justify-between rounded-lg border px-3 py-2 text-left backdrop-blur-sm transition hover:bg-white/5"
                                style={{
                                  borderColor: active ? "var(--primary)" : "var(--border)",
                                  background: active ? "var(--card)" : undefined,
                                }}
                              >
                                <span className="text-sm font-medium">{THEMES_3D[key].name}</span>
                                {active && (
                                  <span
                                    aria-hidden="true"
                                    className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {mode3d !== "standard" && (
                        <div className="space-y-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
                          <label className="block space-y-1">
                            <span className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Perspective</span>
                              <output>{settings3d.perspective}px</output>
                            </span>
                            <input
                              type="range"
                              min="500"
                              max="3000"
                              step="100"
                              value={settings3d.perspective}
                              onChange={(event) =>
                                updateSettings3d("perspective", Number(event.target.value))
                              }
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </label>

                          <label className="block space-y-1">
                            <span className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Max Tilt</span>
                              <output>{settings3d.tiltMax}°</output>
                            </span>
                            <input
                              type="range"
                              min="0"
                              max="25"
                              value={settings3d.tiltMax}
                              onChange={(event) => updateSettings3d("tiltMax", Number(event.target.value))}
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </label>

                          <label className="block space-y-1">
                            <span className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Shadow Depth</span>
                              <output>{settings3d.shadowDepth}px</output>
                            </span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={settings3d.shadowDepth}
                              onChange={(event) =>
                                updateSettings3d("shadowDepth", Number(event.target.value))
                              }
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
