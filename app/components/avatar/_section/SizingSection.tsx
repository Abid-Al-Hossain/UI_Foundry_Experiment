"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "./SizeControl";

export default function SizingSection(props: {
  size: string;
  setSize: (v: string) => void;
  radiusMode: "circle" | "rounded" | "square" | "custom";
  setRadiusMode: (v: "circle" | "rounded" | "square" | "custom") => void;
  radiusValue: number;
  setRadiusValue: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Dimensions" subtitle="Size of the avatar component.">
        <SizeControl
          label="Size (px)"
          valueText={props.size.replace("px", "")}
          setValueText={(v) => props.setSize(v + "px")}
          min={16}
          max={256}
        />
      </SectionCard>

      <SectionCard title="Shape" subtitle="Corner radius configuration.">
        <div className="space-y-4">
          <Segmented
            value={props.radiusMode}
            onChange={(v) => props.setRadiusMode(v as any)}
            items={[
              { value: "circle", label: "Circle" },
              { value: "rounded", label: "Rounded" },
              { value: "square", label: "Square" },
              { value: "custom", label: "Custom" },
            ]}
          />

          {props.radiusMode === "custom" && (
            <SizeControl
              label="Radius (px)"
              valueText={String(props.radiusValue)}
              setValueText={(v) => props.setRadiusValue(Number(v))}
              min={0}
              max={128}
            />
          )}
        </div>
      </SectionCard>
    </div>
  );
}
