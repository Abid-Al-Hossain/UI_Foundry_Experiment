"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { THEMES, type ThemeId } from "../theme/themes";
import { useTheme, type ThemeVars } from "../theme/ThemeProvider";

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

export default function Header() {
  const { theme, setTheme, customTheme, setCustomTheme } = useTheme();
  const [open, setOpen] = useState(false);
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

  const onPick = (id: ThemeId) => {
    setTheme(id);
    if (id === "custom") {
      const styles = getComputedStyle(document.documentElement);
      const next = {
        bg: styles.getPropertyValue("--bg").trim() || customTheme.bg,
        surface: styles.getPropertyValue("--surface").trim() || customTheme.surface,
        card: styles.getPropertyValue("--card").trim() || customTheme.card,
        text: styles.getPropertyValue("--text").trim() || customTheme.text,
        muted: styles.getPropertyValue("--muted").trim() || customTheme.muted,
        border: styles.getPropertyValue("--border").trim() || customTheme.border,
        primary: styles.getPropertyValue("--primary").trim() || customTheme.primary,
        primaryHover: styles.getPropertyValue("--primary-hover").trim() || customTheme.primaryHover,
        ring: styles.getPropertyValue("--ring").trim() || customTheme.ring,
      };
      setCustomTheme(next);
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const updateCustom = (key: keyof ThemeVars, value: string) => {
    setCustomTheme({ ...customTheme, [key]: value });
  };

  const toHex = (value: string, fallback: string) => {
    const raw = (value || "").trim().toLowerCase();
    if (/^#([0-9a-f]{6})$/.test(raw)) return raw;
    if (/^#([0-9a-f]{3})$/.test(raw)) {
      const m = raw.slice(1);
      return `#${m[0]}${m[0]}${m[1]}${m[1]}${m[2]}${m[2]}`;
    }
    const rgbMatch = raw.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
    if (rgbMatch) {
      const r = Math.max(0, Math.min(255, Number(rgbMatch[1])));
      const g = Math.max(0, Math.min(255, Number(rgbMatch[2])));
      const b = Math.max(0, Math.min(255, Number(rgbMatch[3])));
      const toHex2 = (n: number) => n.toString(16).padStart(2, "0");
      return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
    }
    return fallback;
  };

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
      className="sticky top-0 z-50 border-b"
      style={{ background: "color-mix(in oklab, var(--surface) 88%, transparent)", borderColor: "var(--border)" }}
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

        <nav className="flex items-center gap-4 text-sm" style={{ color: "var(--muted)" }}>
          <Link className="transition hover:opacity-90 hover:underline" href="/">
            Home
          </Link>
          <Link className="transition hover:opacity-90 hover:underline" href="/components/buttons">
            Components
          </Link>
          <span className="cursor-not-allowed opacity-70">Login (later)</span>

          {/* Settings */}
          <div className="relative" ref={popRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
            >
              <GearIcon />
              Theme
            </button>

            {open && (
              <div
                className="absolute right-0 mt-2 w-72 max-h-[80vh] overflow-hidden rounded-xl border shadow-lg"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="p-3 text-xs" style={{ color: "var(--muted)" }}>
                  Pick a prebuilt theme
                </div>

                <div className="max-h-[70vh] overflow-auto">
                  <div className="p-2">
                    {THEMES.map((t) => {
                      const active = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => onPick(t.id)}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm transition"
                          style={{
                            background: active ? "color-mix(in oklab, var(--primary) 22%, transparent)" : "transparent",
                            color: "var(--text)",
                            border: active ? "1px solid var(--ring)" : "1px solid transparent",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{t.name}</span>
                            {active && (
                              <span className="text-xs" style={{ color: "var(--muted)" }}>
                                Active
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-xs" style={{ color: "var(--muted)" }}>
                            {t.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {theme === "custom" ? (
                    <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
                      <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                        Customize
                      </div>

                      <div className="mt-3 grid gap-3">
                        {colorFields.map(({ key, label }) => (
                          <div key={key} className="grid gap-2 text-sm">
                            <div className="flex items-center justify-between gap-3">
                              <span style={{ color: "var(--text)" }}>{label}</span>
                              <input
                                type="color"
                                value={toHex(customTheme[key], "#ffffff")}
                                onChange={(e) => updateCustom(key, e.target.value)}
                                className="h-8 w-12 rounded-lg border"
                                style={{ borderColor: "var(--border)", cursor: "pointer" }}
                              />
                            </div>
                            <input
                              type="text"
                              value={customTheme[key]}
                              onChange={(e) => updateCustom(key, e.target.value)}
                              placeholder="#RRGGBB or rgba(r,g,b,a)"
                              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                              style={{
                                borderColor: "var(--border)",
                                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                                color: "var(--text)",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
