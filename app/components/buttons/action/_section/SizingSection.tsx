"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";

export default function SizingSection(props: {
  subtitle: string;

  widthText: string;
  setWidthText: (v: string) => void;
  effectiveWidthPx: number;

  heightText: string;
  setHeightText: (v: string) => void;
  effectiveHeightPx: number;

  paddingXText: string;
  setPaddingXText: (v: string) => void;

  paddingYText: string;
  setPaddingYText: (v: string) => void;
}) {
  return (
    <SectionCard title="Sizing" subtitle={props.subtitle}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Width (px)"
            valueText={props.widthText}
            setValueText={props.setWidthText}
            min={40}
            max={720}
            computedValue={props.effectiveWidthPx}
          />
          <SizeControl
            label="Height (px)"
            valueText={props.heightText}
            setValueText={props.setHeightText}
            min={24}
            max={240}
            computedValue={props.effectiveHeightPx}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl label="Padding X (px)" valueText={props.paddingXText} setValueText={props.setPaddingXText} min={0} max={80} />
          <SizeControl label="Padding Y (px)" valueText={props.paddingYText} setValueText={props.setPaddingYText} min={0} max={40} />
        </div>
      </div>
    </SectionCard>
  );
}
