"use client";

import React from "react";
import { LabeledField } from "../layout/LabeledField";

export default function FontWeightSelect(props: {
  value: number;
  onChange: (v: number) => void;
}) {
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <LabeledField label="Weight">
      <select
        value={String(props.value)}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklab, var(--surface) 70%, transparent)",
          color: "var(--text)",
        }}
      >
        {weights.map((w) => (
          <option key={w} value={String(w)}>
            {w}
          </option>
        ))}
      </select>
    </LabeledField>
  );
}
