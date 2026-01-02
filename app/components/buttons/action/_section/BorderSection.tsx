"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";
type ButtonVariant = "solid" | "outline" | "ghost";

export default function BorderSection(props: {
  PALETTE: readonly string[];

  variant: ButtonVariant;

  borderWidthText: string;
  setBorderWidthText: (v: string) => void;

  borderStyle: BorderStyle;
  setBorderStyle: (v: BorderStyle) => void;

  borderInput: string;
  setBorderInput: (v: string) => void;

  borderNorm: { ok: boolean; hex: string; rgb: string };

  computedBorderWidth: number;
  computedBorderStyle: BorderStyle;

  borderHoverWidthText: string;
  setBorderHoverWidthText: (v: string) => void;

  borderActiveWidthText: string;
  setBorderActiveWidthText: (v: string) => void;
}) {
  const ghost = props.variant === "ghost";

  return (
    <SectionCard title="Border" subtitle="Stroke width, style, and color.">
      <div className="space-y-4">
        <SizeControl
          label="Border width"
          valueText={props.borderWidthText}
          setValueText={props.setBorderWidthText}
          min={0}
          max={12}
          computedValue={props.computedBorderWidth}
        />

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Hover width"
            valueText={props.borderHoverWidthText}
            setValueText={props.setBorderHoverWidthText}
            min={0}
            max={12}
          />
          <SizeControl
            label="Active width"
            valueText={props.borderActiveWidthText}
            setValueText={props.setBorderActiveWidthText}
            min={0}
            max={12}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(["solid", "dashed", "dotted", "double", "none"] as const).map((s) => (
            <button
              key={s}
              type="button"
              disabled={ghost}
              onClick={() => props.setBorderStyle(s)}
              className="rounded-xl border px-3 py-2 text-sm font-semibold uf-clickable disabled:opacity-50"
              style={{
                borderColor: "var(--border)",
                background: props.borderStyle === s ? "var(--primary)" : "transparent",
                color: props.borderStyle === s ? "white" : "var(--text)",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <ColorControl
          title="Border color"
          palette={props.PALETTE}
          valueText={props.borderInput}
          setValueText={props.setBorderInput}
          normalizedHex={props.borderNorm.hex}
          normalizedRgb={props.borderNorm.rgb}
          ok={props.borderNorm.ok}
        />
      </div>
    </SectionCard>
  );
}
