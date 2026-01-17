"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import Select from "@/app/components/controls/input/Select";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";

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

export default function AppearanceSection(props: {
  variant: string;
  setVariant: (v: string) => void;
  shape: string;
  setShape: (v: string) => void;
  size: string;
  setSize: (v: string) => void;
  color: string;
  setColor: (v: string) => void;
  textColor: string;
  setTextColor: (v: string) => void;
  paddingX: number;
  setPaddingX: (v: number) => void;
  paddingY: number;
  setPaddingY: (v: number) => void;
  fontSize: number;
  setFontSize: (v: number) => void;
  borderRadius: number;
  setBorderRadius: (v: number) => void;
  borderWidth: number;
  setBorderWidth: (v: number) => void;
}) {
  return (
    <SectionCard title="Appearance" subtitle="Shape, colors, and dimensions.">
      <div className="space-y-6">
        <LabeledField label="Variant">
          <Select
            value={props.variant}
            onChange={props.setVariant}
            options={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
              { value: "soft", label: "Soft / Tint" },
              { value: "ghost", label: "Ghost" },
              { value: "neumorphic", label: "Neumorphic" },
              { value: "glass", label: "Glassmorphism" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Shape">
          <Segmented
            value={props.shape}
            onChange={props.setShape}
            items={[
              { label: "Pill", value: "pill" },
              { label: "Rounded", value: "rounded" },
              { label: "Square", value: "square" },
              { label: "Circle", value: "circle" },
            ]}
          />
        </LabeledField>

        {/* Colors */}
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

        {/* Detailed Dimensions */}
        <div className="pt-4 border-t border-slate-700/50 space-y-4">
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
          <SizeControl
            label="Font Size (px)"
            value={props.fontSize}
            onChange={props.setFontSize}
            min={8}
            max={48}
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
      </div>
    </SectionCard>
  );
}
