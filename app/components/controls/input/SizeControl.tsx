"use client";

import React, { useEffect, useState } from "react";
import { LabeledField } from "../layout/LabeledField";

import Input from "./Input";
import Slider from "./Slider";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Smart SizeControl: Matches Action Button's exact UI but manages text state internally.
 */
export default function SizeControl(props: {
  label: string;
  value: number; // The actual numeric value (source of truth)
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hintRight?: string;
}) {
  const { value, onChange, min, max, step = 1, unit = "" } = props;

  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const handleTextChange = (nextText: string) => {
    setText(nextText);
    const parsed = parseFloat(nextText);
    if (!isNaN(parsed)) {
      // We don't clamp immediately on type, only on blur or effectively?
      // Start Button logic actually just parses.
      // But we should clamped it for the "Computed" display at least.
      onChange(parsed);
    }
  };

  // Clamp only for the slider and computed value
  const numericVal = parseFloat(text);
  const safeVal = isNaN(numericVal) ? min : numericVal;
  const clamped = clamp(safeVal, min, max);

  return (
    <LabeledField label={props.label} hint={props.hintRight}>
      <Slider
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(val) => {
          setText(String(val));
          onChange(val);
        }}
      />
      <Input
        value={text}
        onChange={handleTextChange}
        className="mt-2"
        placeholder={`${min}-${max}${unit}`}
      />
      <div className="mt-1 text-xs" style={{ color: "var(--muted)" }}>
        Applied:{" "}
        <b style={{ color: "var(--text)" }}>
          {clamped}
          {unit}
        </b>
      </div>
    </LabeledField>
  );
}
