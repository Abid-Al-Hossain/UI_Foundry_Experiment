"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniBadgePreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .badge { 
    display: inline-flex; 
    align-items: center; 
    padding: 6px 12px; 
    border-radius: 9999px; 
    background-color: #3b82f6; 
    color: white; 
    font-size: 14px; 
    font-weight: 600; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
</style>
</head>
<body>
  <div class="badge">
    New Feature
  </div>
</body>
</html>`;
}

export default function BadgeGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniBadgePreview(), []);

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
            Badge
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Versatile badge component for status indicators, notifications, and
            labels.
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
                  Badge Studio
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Full editor with 3D support, status dots, and custom shapes.
                </p>
              </div>

              <Link
                href="/components/badge/playground"
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
                  title="Badge Preview"
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
                3D Effects
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Status Dots
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Gradients
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
