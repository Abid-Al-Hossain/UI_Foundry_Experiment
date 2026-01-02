"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

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
    focusRingNorm,
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
          <label htmlFor={idRing} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
            Enable focus ring
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label={`Ring width (${ringWidth}px)`}
            valueText={focusRingWidthText}
            setValueText={setFocusRingWidthText}
            min={0}
            max={20}
          />
          <SizeControl
            label={`Ring offset (${ringOffset}px)`}
            valueText={focusRingOffsetText}
            setValueText={setFocusRingOffsetText}
            min={0}
            max={16}
          />
        </div>

        <ColorControl
          title="Ring Color"
          palette={PALETTE}
          valueText={focusRingInput}
          setValueText={setFocusRingInput}
          normalizedHex={focusRingNorm.ok ? focusRingNorm.hex : "#60a5fa"}
          normalizedRgb={focusRingNorm.rgb}
          ok={focusRingNorm.ok}
        />
      </div>
    </SectionCard>
  );
}
