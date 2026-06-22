"use client";
import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";

const PRESET_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#64748b",
  "#000000",
  "#ffffff",
];

export default function BadgeColorsSection(props: {
  color: string;
  setColor: (v: string) => void;
  textColor: string;
  setTextColor: (v: string) => void;
}) {
  return (
    <SectionCard title="Colors" subtitle="Primary and text color system.">
      <div className="space-y-4">
        <ColorControl
          label="Primary Color"
          palette={PRESET_COLORS}
          value={props.color}
          onChange={props.setColor}
        />

        <ColorControl
          label="Text Color"
          palette={PRESET_COLORS}
          value={props.textColor}
          onChange={props.setTextColor}
        />
      </div>
    </SectionCard>
  );
}
