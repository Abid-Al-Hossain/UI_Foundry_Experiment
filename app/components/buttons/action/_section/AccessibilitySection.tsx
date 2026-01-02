"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";
import SizeControl from "./SizeControl";

export type MinTouchMode = "off" | "warn" | "enforce";

export default function AccessibilitySection(props: {
  ariaLabel: string;
  setAriaLabel: (v: string) => void;

  minTouchMode: MinTouchMode;
  setMinTouchMode: (v: MinTouchMode) => void;

  minTouchSizeText: string;
  setMinTouchSizeText: (v: string) => void;
  minTouchSizePx: number;
  minTouchWarning: boolean;

  contrastRatioText: string;
  contrastOk: boolean;
  contrastNote: string;
}) {
  return (
    <SectionCard title="Accessibility" subtitle="Touch size, contrast hints, and aria label.">
      <div className="space-y-4">
        <LabeledField label="Aria label">
          <input
            value={props.ariaLabel}
            onChange={(e) => props.setAriaLabel(e.target.value)}
            placeholder="Optional (for icon-only buttons)"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Min touch size
          </div>
          <Segmented
            value={props.minTouchMode}
            onChange={(v) => props.setMinTouchMode(v as MinTouchMode)}
            items={[
              { value: "off", label: "Off" },
              { value: "warn", label: "Warn" },
              { value: "enforce", label: "Enforce" },
            ]}
          />
          <SizeControl
            label={`Minimum size (${props.minTouchSizePx}px)`}
            valueText={props.minTouchSizeText}
            setValueText={props.setMinTouchSizeText}
            min={24}
            max={80}
            step={1}
          />
          {props.minTouchMode !== "off" ? (
            <div className="text-xs" style={{ color: props.minTouchWarning ? "#ef4444" : "var(--muted)" }}>
              {props.minTouchWarning
                ? "Warning: button is below the minimum touch size."
                : "Touch size meets the minimum."}
            </div>
          ) : null}
        </div>

        <div className="space-y-1 text-xs" style={{ color: props.contrastOk ? "var(--muted)" : "#ef4444" }}>
          <div>Contrast: {props.contrastRatioText}</div>
          <div>{props.contrastNote}</div>
        </div>
      </div>
    </SectionCard>
  );
}
