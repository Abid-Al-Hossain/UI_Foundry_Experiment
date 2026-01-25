"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniSpinnerPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .spinner { width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .label { margin-top: 10px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center; }
</style>
</head>
<body>
  <div>
    <div class="spinner"></div>
    <div class="label">Loading...</div>
  </div>
</body>
</html>`;
}

export default function SpinnerGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniSpinnerPreview(), []);

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
            Spinner & Loaders
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Next-gen loading indicators featuring 3D cubes, quantum particles,
            liquid morphing, and cyberpunk glitch effects.
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
                  Spinner Studio
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Interactive playground with 10+ variants and physics controls.
                </p>
              </div>

              <Link
                href="/components/spinner/playground"
                className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                style={{ background: "var(--primary)", color: "white" }}
              >
                Open Studio
              </Link>
            </div>

            <div
              className="mt-4 overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              {mounted ? (
                <iframe
                  title="Spinner Preview"
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
                3D Cubes & Spheres
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                True Liquid / Gooey
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Quantum Orbit
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Glitch Mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
