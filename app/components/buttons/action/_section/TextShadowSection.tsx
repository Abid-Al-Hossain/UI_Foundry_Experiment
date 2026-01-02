"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

export default function TextShadowSection(props: {
  PALETTE: readonly string[];

  textShadowEnabled: boolean;
  setTextShadowEnabled: (v: boolean) => void;

  tsXText: string;
  setTsXText: (v: string) => void;

  tsYText: string;
  setTsYText: (v: string) => void;

  tsBlurText: string;
  setTsBlurText: (v: string) => void;

  tsOpacityText: string;
  setTsOpacityText: (v: string) => void;

  tsColorInput: string;
  setTsColorInput: (v: string) => void;

  tsColorOk: boolean;
  tsColorHex: string;
  tsColorRgb: string;
}) {
  return (
    <SectionCard title="Text shadow" subtitle="Add a shadow to the label for depth/contrast.">
      <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
        <input
          type="checkbox"
          checked={props.textShadowEnabled}
          onChange={(e) => props.setTextShadowEnabled(e.target.checked)}
          className="uf-clickable"
        />
        Enable text shadow
      </label>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SizeControl label="X offset (px)" valueText={props.tsXText} setValueText={props.setTsXText} min={-20} max={20} step={1} />
        <SizeControl label="Y offset (px)" valueText={props.tsYText} setValueText={props.setTsYText} min={-20} max={20} step={1} />
        <SizeControl label="Blur (px)" valueText={props.tsBlurText} setValueText={props.setTsBlurText} min={0} max={60} step={1} />
        <SizeControl label="Opacity (0–1)" valueText={props.tsOpacityText} setValueText={props.setTsOpacityText} min={0} max={1} step={0.01} />
      </div>

      <div className="mt-4">
        <ColorControl
          title="Shadow color"
          palette={props.PALETTE}
          valueText={props.tsColorInput}
          setValueText={props.setTsColorInput}
          normalizedHex={props.tsColorHex}
          normalizedRgb={props.tsColorRgb}
          ok={props.tsColorOk}
        />
      </div>
    </SectionCard>
  );
}
