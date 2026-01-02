"use client";

import React from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function LabeledField(props: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {props.label}
        </label>
        {props.hint ? (
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {props.hint}
          </span>
        ) : null}
      </div>
      <div className="mt-2">{props.children}</div>
    </div>
  );
}

/** Slider + manual input (exact same behavior + styling as your page.tsx) */
export default function SizeControl(props: {
  label: string;
  valueText: string;
  setValueText: (v: string) => void;
  min: number;
  max: number;
  step?: number;
  computedValue?: number; // optional display of clamped value
  hintRight?: string;
}) {
  const step = props.step ?? 1;
  const n = Number(props.valueText);
  const safe = Number.isFinite(n) ? n : props.min;
  const clamped = clamp(safe, props.min, props.max);

  return (
    <LabeledField label={props.label} hint={props.hintRight}>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={step}
        value={clamped}
        onChange={(e) => props.setValueText(String(e.target.value))}
        className="w-full uf-clickable"
      />
      <input
        value={props.valueText}
        onChange={(e) => props.setValueText(e.target.value)}
        className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          color: "var(--text)",
        }}
      />
      {typeof props.computedValue === "number" ? (
        <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
          Applied: <b style={{ color: "var(--text)" }}>{props.computedValue}</b>
        </div>
      ) : null}
    </LabeledField>
  );
}
