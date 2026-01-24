"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniProgressPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .container { width: 300px; display: flex; flex-direction: column; gap: 20px; }
  .progress { width: 100%; height: 12px; background: #e2e8f0; border-radius: 99px; overflow: hidden; position: relative; }
  .bar { height: 100%; background: linear-gradient(to right, #3b82f6, #8b5cf6); width: 65%; border-radius: 99px; position: relative; }
  .bar::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent); background-size: 20px 20px; }
  .label { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 4px; font-weight: 600; }
</style>
</head>
<body>
  <div class="container">
    <div>
      <div class="label"><span>Uploading...</span><span>65%</span></div>
      <div class="progress">
        <div class="bar"></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default function ProgressGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniProgressPreview(), []);

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
            Progress Bar
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Ultimate progress indicator with liquid, glitch, and stripe effects.
            Supports buffers, steps, and timer modes.
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
                  Playground
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Full editor with all premium features.
                </p>
              </div>

              <Link
                href="/components/progress/playground"
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
                  title="Progress Preview"
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
                Liquid Effect
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Glitch Mode
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Animated Stripes
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
