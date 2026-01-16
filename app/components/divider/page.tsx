"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniDividerPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .wrapper { width: 80%; max-width: 300px; display: flex; flex-direction: column; gap: 24px; color: #64748b; font-size: 14px; }
  .divider { 
    height: 1px;
    width: 100%;
    background: #e2e8f0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label {
    background: #fff;
    padding: 0 12px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div>Text Block A</div>
    <div class="divider">
      <span class="label">OR</span>
    </div>
    <div>Text Block B</div>
  </div>
</body>
</html>`;
}

export default function DividerGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniDividerPreview(), []);

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
            Divider
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Smart divider components with content support, beam effects, and
            gradients.
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
                  Divider Studio
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Full editor with "Hyper FX" (beams, neon) and strict layout
                  controls.
                </p>
              </div>

              <Link
                href="/components/divider/playground"
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
                  title="Divider Preview"
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
                Beams
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Gradients
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Content/Labels
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
