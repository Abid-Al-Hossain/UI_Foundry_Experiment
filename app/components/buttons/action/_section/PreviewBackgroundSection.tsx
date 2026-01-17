"use client";

import React from "react";
import { SectionCard } from "./ui";
import ColorControl from "@/app/components/controls/color/ColorControl";

export type PreviewBgMode = "white" | "black" | "custom";

export default function PreviewBackgroundSection(props: {
  PALETTE: readonly string[];

  bgMode: PreviewBgMode;
  setBgMode: (v: PreviewBgMode) => void;

  previewBgInput: string;
  setPreviewBgInput: (v: string) => void;

  previewBgNorm: { ok: boolean; hex: string; rgb: string };
}) {
  const {
    PALETTE,
    bgMode,
    setBgMode,
    previewBgInput,
    setPreviewBgInput,
    previewBgNorm,
  } = props;

  return (
    <SectionCard
      title="Preview Background"
      subtitle="Only affects the preview canvas (not export)."
    >
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {(["white", "black", "custom"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setBgMode(m)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold transition uf-clickable"
              style={{
                borderColor: "var(--border)",
                background:
                  bgMode === m
                    ? "var(--primary)"
                    : "color-mix(in oklab, var(--surface) 65%, transparent)",
                color: bgMode === m ? "white" : "var(--text)",
              }}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        {bgMode === "custom" && (
          <ColorControl
            label="Preview Background"
            palette={PALETTE}
            value={previewBgInput}
            onChange={setPreviewBgInput}
          />
        )}
      </div>
    </SectionCard>
  );
}
