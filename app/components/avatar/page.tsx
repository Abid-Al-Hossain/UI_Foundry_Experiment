"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import useHydrated from "@/components/hooks/useHydrated";
import { useMemo } from "react";

function buildMiniAvatarPreview() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: sans-serif; background: #fff; }
  .avatar { width: 64px; height: 64px; border-radius: 9999px; background-color: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #64748b; font-size: 24px; border: 2px solid #e2e8f0; }
  .img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
</style>
</head>
<body>
  <div class="avatar">
    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" class="img" />
  </div>
</body>
</html>`;
}

export default function AvatarGalleryPage() {
  const mounted = useHydrated();
  const srcDoc = useMemo(() => buildMiniAvatarPreview(), []);

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
            Avatar
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Highly customizable avatar component with advanced features like 3D
            tilt, groups, and badging.
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
                href="/components/avatar/playground"
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
                  title="Avatar Preview"
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
                3D Tilt
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Groups
              </span>
              <span className="rounded-full border px-3 py-1 text-xs opacity-60">
                Badges
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
