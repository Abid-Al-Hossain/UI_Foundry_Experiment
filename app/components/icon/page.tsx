"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniIconPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #fff; }
  .icon-wrapper { 
    width: 64px; 
    height: 64px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: #3b82f6;
  }
</style>
</head>
<body>
  <div class="icon-wrapper">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v20"/>
      <path d="M22 12H2"/>
      <path d="m17 7 5 5-5 5"/>
      <path d="m7 7-5 5 5 5"/>
    </svg>
  </div>
</body>
</html>`;
}

export default function IconGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniIconPreview(), []);

  return (
    <AppShell>
      <div className="space-y-6">
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in oklab, var(--card) 70%, transparent)",
          }}
        >
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            Icon Studio
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Ultimate icon customization with 3D tilts, neon glows,
            glassmorphism, and Framer Motion animations.
          </p>
        </div>

        <div className="space-y-5">
          <div
            className="rounded-2xl border p-5"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 80%, transparent)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Icon Playground
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Advanced editor for SVG icons.
                </p>
              </div>

              <Link
                href="/components/icon/playground"
                className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Edit
              </Link>
            </div>

            <div
              className="mt-4 overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              {mounted ? (
                <iframe
                  title="Icon Preview"
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                  className="h-[180px] w-full border-none"
                />
              ) : (
                <div className="h-[180px] w-full" />
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Lucide Icons
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                3D Engine
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Glow & Glass
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
