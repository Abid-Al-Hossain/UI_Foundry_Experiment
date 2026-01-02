"use client";

import React from "react";
import { SectionCard } from "./ui";

type ButtonVariant = "solid" | "outline" | "ghost";

export default function OutlineGhostPresetsSection(props: {
  variant: ButtonVariant;
  previewBg: string;
  applyOutlinePreset: () => void;
  applyGhostPreset: () => void;
}) {
  const { variant, previewBg, applyOutlinePreset, applyGhostPreset } = props;
  const disabled = variant === "solid";

  return (
    <SectionCard title="Outline & Ghost" subtitle="Presets with auto contrast.">
      <div className="space-y-3">
        <div className="text-xs break-words" style={{ color: "var(--muted)" }}>
          Uses preview background for contrast: {previewBg}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={applyOutlinePreset}
            className="w-full rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            Outline preset
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={applyGhostPreset}
            className="w-full rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            Ghost preset
          </button>
        </div>
        {disabled ? (
          <div className="text-xs" style={{ color: "var(--muted)" }}>
            Switch to Outline or Ghost to enable presets.
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
