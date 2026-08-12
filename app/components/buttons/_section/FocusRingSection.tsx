"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";

export default function FocusRingSection(props: {
  PALETTE: readonly string[];

  idRing: string;

  focusRingEnabled: boolean;
  setFocusRingEnabled: (v: boolean) => void;

  focusRingWidthText: string;
  setFocusRingWidthText: (v: string) => void;
  ringWidth: number;

  focusRingOffsetText: string;
  setFocusRingOffsetText: (v: string) => void;
  ringOffset: number;

  focusRingInput: string;
  setFocusRingInput: (v: string) => void;

  focusRingNorm: { ok: boolean; hex: string; rgb: string };
}) {
  const {
    PALETTE,
    idRing,
    focusRingEnabled,
    setFocusRingEnabled,
    focusRingWidthText,
    setFocusRingWidthText,
    ringWidth,
    focusRingOffsetText,
    setFocusRingOffsetText,
    ringOffset,
    focusRingInput,
    setFocusRingInput,
  } = props;

  return (
    <SectionCard title="Focus Ring" subtitle="Accessibility focus styling.">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2">
          <input
            id={idRing}
            type="checkbox"
            checked={focusRingEnabled}
            onChange={(e) => setFocusRingEnabled(e.target.checked)}
          />
          <label
            htmlFor={idRing}
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Enable focus ring
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label={`Ring width (${ringWidth}px)`}
            value={Number(focusRingWidthText) || 0}
            onChange={(v) => setFocusRingWidthText(String(v))}
            min={0}
            max={20}
          />
          <SizeControl
            label={`Ring offset (${ringOffset}px)`}
            value={Number(focusRingOffsetText) || 0}
            onChange={(v) => setFocusRingOffsetText(String(v))}
            min={0}
            max={16}
          />
        </div>

        <ColorControl
          label="Ring Color"
          palette={PALETTE}
          value={focusRingInput}
          onChange={setFocusRingInput}
        />
      </div>
    </SectionCard>
  );
}
