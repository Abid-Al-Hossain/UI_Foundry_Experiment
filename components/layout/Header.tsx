"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { THEMES, type ThemeId } from "../theme/themes";
import { useTheme, type ThemeVars } from "../theme/ThemeProvider";
import { useTransition } from "../theme/TransitionProvider";
import { ANIMATIONS } from "../theme/animations";
import { AnimationType } from "../theme/types";
import { THEMES_3D, Theme3DId } from "../theme/themes3d";

function GearIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

// Reusable Tab Button
function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
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

export default function Header() {
  // Theme State
  const { theme, setTheme, customTheme, setCustomTheme } = useTheme();
  // Motion State
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
  const [tab, setTab] = useState<"theme" | "motion" | "3d">("theme");
  const popRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!open) return;
      const el = popRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  // --- Helpers ---
  const updateCustom = (key: keyof ThemeVars, value: string) => {
    setCustomTheme({ ...customTheme, [key]: value });
  };
  const toHex = (value: string, fallback: string) => {
    // Basic hex helper (simplified for brevity)
    return value || fallback;
  };

  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.background =
        "color-mix(in oklab, var(--surface) 88%, transparent)";
    }
  }, []);

  const colorFields: { key: keyof ThemeVars; label: string }[] = [
    { key: "bg", label: "Background" },
    { key: "surface", label: "Surface" },
    { key: "card", label: "Card" },
    { key: "text", label: "Text" },
    { key: "muted", label: "Muted" },
    { key: "border", label: "Border" },
    { key: "primary", label: "Primary" },
    { key: "primaryHover", label: "Primary Hover" },
    { key: "ring", label: "Ring" },
  ];

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ borderColor: "var(--border)" }}
      suppressHydrationWarning
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight transition-opacity group-hover:opacity-80">
            UI Foundry
          </span>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            beta
          </span>
        </Link>

        <nav
          className="flex items-center gap-4 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <Link
            className="transition hover:opacity-90 hover:underline"
            href="/"
          >
            Home
          </Link>
          <Link
            className="transition hover:opacity-90 hover:underline"
            href="/components/buttons"
          >
            Components
          </Link>

          {/* Settings Popover */}
          <div className="relative" ref={popRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition active:scale-95"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                background: "var(--card)",
              }}
            >
              <GearIcon />
              Settings
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border shadow-2xl ring-1 ring-black/5"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                }}
              >
                {/* Tabs */}
                <div
                  className="flex border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <TabBtn
                    active={tab === "theme"}
                    onClick={() => setTab("theme")}
                  >
                    Theme
                  </TabBtn>
                  <TabBtn
                    active={tab === "motion"}
                    onClick={() => setTab("motion")}
                  >
                    Motion
                  </TabBtn>
                  <TabBtn active={tab === "3d"} onClick={() => setTab("3d")}>
                    3D Depth
                  </TabBtn>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                  {/* === THEME TAB === */}
                  {tab === "theme" && (
                    <div className="space-y-4">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                        Color Palette
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {THEMES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className="flex w-full flex-col gap-0.5 rounded-lg border px-3 py-2 text-left text-sm transition hover:bg-white/5"
                            style={{
                              borderColor:
                                theme === t.id
                                  ? "var(--primary)"
                                  : "transparent",
                              background:
                                theme === t.id ? "var(--card)" : undefined,
                            }}
                          >
                            <span className="font-medium">{t.name}</span>
                            <span className="text-[10px] opacity-60">
                              {t.description}
                            </span>
                          </button>
                        ))}
                      </div>

                      {theme === "custom" && (
                        <div
                          className="mt-4 border-t pt-4"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <div className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-50">
                            Custom Colors
                          </div>
                          <div className="grid gap-3">
                            {colorFields.map(({ key, label }) => (
                              <div key={key} className="grid gap-2 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                  <span style={{ color: "var(--text)" }}>
                                    {label}
                                  </span>
                                  <input
                                    type="color"
                                    value={toHex(customTheme[key], "#ffffff")}
                                    onChange={(e) =>
                                      updateCustom(key, e.target.value)
                                    }
                                    className="h-6 w-8 rounded border"
                                    style={{
                                      borderColor: "var(--border)",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* === MOTION TAB === */}
                  {tab === "motion" && (
                    <div className="space-y-6">
                      {/* Transition Type */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                          Page Transition
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.keys(ANIMATIONS).map((key) => (
                            <button
                              key={key}
                              onClick={() => setAnimation(key as AnimationType)}
                              className="rounded-md border px-3 py-2 text-xs font-medium capitalize transition hover:bg-white/5"
                              style={{
                                borderColor:
                                  animation === key
                                    ? "var(--primary)"
                                    : "var(--border)",
                                color:
                                  animation === key
                                    ? "var(--primary)"
                                    : "var(--text)",
                              }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Speed Control */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                          Speed
                        </div>
                        <div
                          className="grid grid-cols-4 gap-1 rounded-lg border p-1"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {(["slow", "normal", "fast", "sonic"] as const).map(
                            (s) => (
                              <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                className="rounded py-1 text-[10px] font-medium capitalization transition"
                                style={{
                                  background:
                                    speed === s
                                      ? "var(--primary)"
                                      : "transparent",
                                  color: speed === s ? "#fff" : "var(--muted)",
                                }}
                              >
                                {s}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* === 3D TAB === */}
                  {tab === "3d" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-50">
                          3D Environment
                        </div>
                        <div className="flex flex-col gap-2">
                          {(Object.keys(THEMES_3D) as Theme3DId[]).map(
                            (key) => {
                              const isActive = mode3d === key;
                              const def = THEMES_3D[key];
                              return (
                                <button
                                  key={key}
                                  onClick={() => setMode3d(key)}
                                  className="flex items-center justify-between rounded-lg border px-3 py-2 text-left backdrop-blur-sm transition hover:bg-white/5"
                                  style={{
                                    borderColor: isActive
                                      ? "var(--primary)"
                                      : "var(--border)",
                                    background: isActive
                                      ? "var(--card)"
                                      : undefined,
                                  }}
                                >
                                  <span className="text-sm font-medium">
                                    {def.name}
                                  </span>
                                  {isActive && (
                                    <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
                                  )}
                                </button>
                              );
                            },
                          )}
                        </div>
                      </div>

                      {mode3d !== "standard" && (
                        <div
                          className="space-y-4 pt-4 border-t"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Perspective</span>
                              <span>{settings3d.perspective}px</span>
                            </div>
                            <input
                              type="range"
                              min="500"
                              max="3000"
                              step="100"
                              value={settings3d.perspective}
                              onChange={(e) =>
                                updateSettings3d(
                                  "perspective",
                                  Number(e.target.value),
                                )
                              }
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Max Tilt</span>
                              <span>{settings3d.tiltMax}°</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="25"
                              value={settings3d.tiltMax}
                              onChange={(e) =>
                                updateSettings3d(
                                  "tiltMax",
                                  Number(e.target.value),
                                )
                              }
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] font-medium uppercase tracking-wider opacity-60">
                              <span>Shadow Depth</span>
                              <span>{settings3d.shadowDepth}px</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={settings3d.shadowDepth}
                              onChange={(e) =>
                                updateSettings3d(
                                  "shadowDepth",
                                  Number(e.target.value),
                                )
                              }
                              className="h-1.5 w-full cursor-grab appearance-none rounded-full bg-slate-700 accent-[var(--primary)]"
                            />
                          </div>
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
