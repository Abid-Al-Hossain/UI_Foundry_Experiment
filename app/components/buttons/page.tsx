// app/components/buttons/page.tsx
"use client";

import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { useMemo } from "react";
import useHydrated from "@/components/hooks/useHydrated";

function escapeHtml(s: string) {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildMiniActionButtonSrcDoc(opts: {
  label: string;
  bgHex: string;
  textHex: string;
  widthPx: number;
  heightPx: number;
  radius: number;
  previewBg: string;
}) {
  const label = escapeHtml(opts.label);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Preview</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body{
    margin:0;
    min-height:100vh;
    display:grid;
    place-items:center;
    background:${opts.previewBg};
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    padding:16px;
  }
  .btn{
    width:${opts.widthPx}px;
    height:${opts.heightPx}px;
    border: 1px solid rgba(0,0,0,.06);
    background:${opts.bgHex};
    color:${opts.textHex};
    border-radius:${opts.radius}px;
    padding: 0 14px;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    box-shadow: 0 10px 24px rgba(0,0,0,.10);
    user-select:none;
  }
</style>
</head>
<body>
  <button class="btn" type="button">${label}</button>
</body>
</html>`;
}

type ButtonCard = {
  key: string;
  name: string;
  desc: string;
  editHref: string;
  srcDoc: string;
};

export default function ButtonsLandingPage() {
  const mounted = useHydrated();

  const actionPreviewDoc = useMemo(
    () =>
      buildMiniActionButtonSrcDoc({
        label: "Confirm",
        bgHex: "#2563eb",
        textHex: "#ffffff",
        widthPx: 240,
        heightPx: 44,
        radius: 14,
        previewBg: "#ffffff",
      }),
    [],
  );

  const cards: ButtonCard[] = useMemo(
    () => [
      {
        key: "action",
        name: "Action Button",
        desc: "Normal click button for confirm / send / delete actions.",
        editHref: "/components/buttons/action",
        srcDoc: actionPreviewDoc,
      },
    ],
    [actionPreviewDoc],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
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
            Buttons
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Organized list of button types. Each has its own edit page and
            export.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {cards.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border p-5"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 80%, transparent)",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {c.name}
                  </h2>
                  <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                    {c.desc}
                  </p>
                </div>

                <Link
                  href={c.editHref}
                  className="shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition"
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  Open Studio
                </Link>
              </div>

              {/* Preview */}
              <div
                className="mt-4 overflow-hidden rounded-2xl border"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--card) 70%, transparent)",
                }}
              >
                {mounted ? (
                  <iframe
                    title={`${c.name} preview`}
                    sandbox="allow-scripts"
                    srcDoc={c.srcDoc}
                    className="h-[180px] w-full"
                  />
                ) : (
                  <div className="h-[180px] w-full" />
                )}
              </div>

              {/* Meta */}
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
                  Live preview
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
                  Theme isolated
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
                  Export available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
