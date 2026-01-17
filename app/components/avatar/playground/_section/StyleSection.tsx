"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import ColorControl from "@/app/components/controls/color/ColorControl";

export default function StyleSection(props: {
  borderWidth: number;
  setBorderWidth: (v: number) => void;
  borderColor: string;
  setBorderColor: (v: string) => void;
  borderStyle: "solid" | "dashed" | "dotted";
  setBorderStyle: (v: "solid" | "dashed" | "dotted") => void;
  initialsBg: string;
  setInitialsBg: (v: string) => void;
  initialsColor: string;
  setInitialsColor: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Border" subtitle="Outline styling for the avatar.">
        <div className="space-y-4">
          <SizeControl
            label="Width (px)"
            value={props.borderWidth}
            onChange={(v) => props.setBorderWidth(v)}
            min={0}
            max={20}
            step={1}
          />

          <ColorControl
            label="Color"
            value={props.borderColor}
            onChange={props.setBorderColor}
          />

          <LabeledField label="Style">
            <Segmented
              value={props.borderStyle}
              onChange={(v) => props.setBorderStyle(v as any)}
              items={[
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Fallback / Initials"
        subtitle="Colors when image is missing."
      >
        <div className="space-y-4">
          <ColorControl
            label="Background Color"
            value={props.initialsBg}
            onChange={props.setInitialsBg}
          />
          <ColorControl
            label="Text Color"
            value={props.initialsColor}
            onChange={props.setInitialsColor}
          />
        </div>
      </SectionCard>
    </div>
  );
}
