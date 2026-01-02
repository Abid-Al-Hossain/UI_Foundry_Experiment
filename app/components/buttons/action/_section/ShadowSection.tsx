"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export default function ShadowSection(props: {
  PALETTE: readonly string[];

  shadowEnabled: boolean;
  setShadowEnabled: (v: boolean) => void;

  shXText: string;
  setShXText: (v: string) => void;

  shYText: string;
  setShYText: (v: string) => void;

  shBlurText: string;
  setShBlurText: (v: string) => void;

  shSpreadText: string;
  setShSpreadText: (v: string) => void;

  shOpacityText: string;
  setShOpacityText: (v: string) => void;

  shColorInput: string;
  setShColorInput: (v: string) => void;

  shColorOk: boolean;
  shColorHex: string;
  shColorRgb: string;
}) {
  return (
    <SectionCard title="Shadow" subtitle="Control the button’s box shadow.">
      <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
        <input
          type="checkbox"
          checked={props.shadowEnabled}
          onChange={(e) => props.setShadowEnabled(e.target.checked)}
          className="uf-clickable"
        />
        Enable shadow
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SizeControl label="X offset (px)" valueText={props.shXText} setValueText={props.setShXText} min={-50} max={50} step={1} />
        <SizeControl label="Y offset (px)" valueText={props.shYText} setValueText={props.setShYText} min={-50} max={50} step={1} />
        <SizeControl label="Blur (px)" valueText={props.shBlurText} setValueText={props.setShBlurText} min={0} max={120} step={1} />
        <SizeControl label="Spread (px)" valueText={props.shSpreadText} setValueText={props.setShSpreadText} min={-40} max={40} step={1} />
        <SizeControl label="Opacity (0–1)" valueText={props.shOpacityText} setValueText={props.setShOpacityText} min={0} max={1} step={0.01} />
      </div>

      <div className="mt-4">
        <ColorControl
          title="Shadow color"
          palette={props.PALETTE}
          valueText={props.shColorInput}
          setValueText={props.setShColorInput}
          normalizedHex={props.shColorHex}
          normalizedRgb={props.shColorRgb}
          ok={props.shColorOk}
        />
      </div>
    </SectionCard>
  );
}
