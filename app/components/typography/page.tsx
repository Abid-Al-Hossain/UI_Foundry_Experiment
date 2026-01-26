"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniTypographyPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 24px; font-family: system-ui, sans-serif; background: #fff; }
  h1 { font-size: 2rem; font-weight: 700; line-height: 1.1; margin: 0 0 8px; color: #0f172a; }
  h2 { font-size: 1.5rem; font-weight: 600; line-height: 1.2; margin: 0 0 8px; color: #1e293b; }
  h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.3; margin: 0 0 8px; color: #334155; }
  p { font-size: 1rem; font-weight: 400; line-height: 1.6; margin: 0; color: #475569; max-width: 400px; }
  .caption { font-size: 0.75rem; color: #94a3b8; margin-top: 12px; }
</style>
</head>
<body>
  <h1>H1 Heading</h1>
  <h2>H2 Heading</h2>
  <h3>H3 Heading</h3>
  <p>Body text paragraph with optimal line height and letter spacing for readability.</p>
  <div class="caption">Caption · Scale: Major Third (1.25)</div>
</body>
</html>`;
}

export default function TypographyGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniTypographyPreview(), []);

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
            Typography System
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Design a complete typography scale with modular ratios, fluid
            sizing, and export CSS variables or React components.
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
                  Typography Studio
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Interactive playground with modular scales, fluid typography,
                  and full export options.
                </p>
              </div>

              <Link
                href="/components/typography/playground"
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
                  title="Typography Preview"
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
                Modular Scale
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Fluid Typography
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                H1-H6 + Body
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                CSS / React / Tailwind
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
