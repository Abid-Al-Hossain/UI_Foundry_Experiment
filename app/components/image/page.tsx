"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniImagePreview() {
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
    font-family: sans-serif; 
    background: #fff; 
  }
  img {
    width: 240px;
    height: 160px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    filter: sepia(10%) contrast(105%);
  }
</style>
</head>
<body>
  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=320&fit=crop" alt="Mountain landscape" />
</body>
</html>`;
}

export default function ImageGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniImagePreview(), []);

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
            Image
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Enhanced image component with CSS filters, transforms, and styling
            effects.
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
                  Image Studio
                </h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  Full editor for image manipulation and effects.
                </p>
              </div>

              <Link
                href="/components/image/playground"
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
                  title="Image Preview"
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
                Filters
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Transforms
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Shapes
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
