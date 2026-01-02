"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { THEMES, type ThemeId } from "../theme/themes";
import { useTheme } from "../theme/ThemeProvider";

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
  const { theme, setTheme } = useTheme();
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
    setOpen(false);
  };

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
                className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border shadow-lg"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="p-3 text-xs" style={{ color: "var(--muted)" }}>
                  Pick a prebuilt theme
                </div>

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
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
