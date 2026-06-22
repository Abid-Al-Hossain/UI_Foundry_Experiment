"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import SpacingControl from "@/app/components/controls/layout/SpacingControl";

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
            label={`Width (px, ${props.effectiveWidthPx})`}
            value={Number(props.widthText) || 40}
            onChange={(v) => props.setWidthText(String(v))}
            min={40}
            max={720}
            step={1}
          />
          <SizeControl
            label={`Height (px, ${props.effectiveHeightPx})`}
            value={Number(props.heightText) || 24}
            onChange={(v) => props.setHeightText(String(v))}
            min={24}
            max={240}
            step={1}
          />
        </div>

        <SpacingControl
          label="Padding"
          x={Number(props.paddingXText) || 0}
          setX={(v) => props.setPaddingXText(String(v))}
          y={Number(props.paddingYText) || 0}
          setY={(v) => props.setPaddingYText(String(v))}
          min={0}
          max={80}
        />
      </div>
    </SectionCard>
  );
}
