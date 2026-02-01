"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniTooltipPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: system-ui, -apple-system, sans-serif;
    background: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
  .tooltip-demo {
    position: relative;
    display: inline-block;
  }
  .trigger {
    padding: 12px 24px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
  }
  .trigger:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
  }
  .tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: #f8fafc;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #1e293b;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  
  /* Second tooltip - light theme */
  .tooltip-demo:nth-child(2) .tooltip {
    background: #ffffff;
    color: #1e293b;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  .tooltip-demo:nth-child(2) .tooltip::after {
    border-top-color: #ffffff;
  }
  .tooltip-demo:nth-child(2) .trigger {
    background: linear-gradient(135deg, #06b6d4, #22d3ee);
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
  }
  .tooltip-demo:nth-child(2) .trigger:hover {
    box-shadow: 0 8px 30px rgba(6, 182, 212, 0.4);
  }
  
  .row {
    display: flex;
    gap: 40px;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="tooltip-demo">
        <div class="tooltip">✨ Dark Theme Tooltip</div>
        <button class="trigger">Hover Effect</button>
      </div>
      <div class="tooltip-demo">
        <div class="tooltip">🌟 Light Theme Tooltip</div>
        <button class="trigger">Click Trigger</button>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export default function TooltipGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniTooltipPreview(), []);

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
            Tooltip
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Ultimate tooltip builder with 50+ customization options. Supports 12
            placements, 5 animation types, themes, arrows, and advanced trigger
            behaviors.
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
                  Full editor with positioning, animation, triggers, and export.
                </p>
              </div>

              <Link
                href="/components/tooltip/playground"
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
                  title="Tooltip Preview"
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                  className="h-[200px] w-full border-none"
                />
              ) : (
                <div className="h-[200px] w-full" />
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                  color: "var(--muted)",
                }}
              >
                12 Placements
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                  color: "var(--muted)",
                }}
              >
                5 Animations
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                  color: "var(--muted)",
                }}
              >
                Themes
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                  color: "var(--muted)",
                }}
              >
                Arrows
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                  color: "var(--muted)",
                }}
              >
                Multi-Trigger
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
