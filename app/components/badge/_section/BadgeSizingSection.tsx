"use client";
import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import type { BadgeState } from "../types";

export default function BadgeSizingSection(props: {
  shape: BadgeState["shape"];
  paddingX: number;
  setPaddingX: (v: number) => void;
  paddingY: number;
  setPaddingY: (v: number) => void;
  borderRadius: number;
  setBorderRadius: (v: number) => void;
  borderWidth: number;
  setBorderWidth: (v: number) => void;
}) {
  return (
    <SectionCard title="Sizing" subtitle="Padding, overall scale, and border size.">
      <div className="space-y-4">
        <SizeControl
          label="Padding X"
          value={props.paddingX}
          onChange={props.setPaddingX}
          min={0}
          max={60}
          step={1}
        />
        <SizeControl
          label="Padding Y"
          value={props.paddingY}
          onChange={props.setPaddingY}
          min={0}
          max={30}
          step={1}
        />
        {props.shape === "rounded" && (
          <SizeControl
            label="Border Radius"
            value={props.borderRadius}
            onChange={props.setBorderRadius}
            min={0}
            max={30}
            step={1}
          />
        )}
        <SizeControl
          label="Border Width"
          value={props.borderWidth}
          onChange={props.setBorderWidth}
          min={0}
          max={5}
          step={0.5}
        />
      </div>
    </SectionCard>
  );
}
