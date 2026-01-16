"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "../../buttons/action/_section/ColorControl";
import SizeControl from "../../buttons/action/_section/SizeControl";
import { norm } from "../../buttons/action/_utils/colorUtils";

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
  // Helpers for ColorControl
  const handleColorChange = (setter: (v: string) => void) => (val: string) => {
    setter(val);
  };

  return (
    <SectionCard title="Appearance" subtitle="Shape, colors, and dimensions.">
      <div className="space-y-6">
        <LabeledField label="Variant">
          <select
            value={props.variant}
            onChange={(e) => props.setVariant(e.target.value)}
            className="w-full h-9 px-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 outline-none focus:border-blue-500 transition-colors"
          >
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="soft">Soft / Tint</option>
            <option value="ghost">Ghost</option>
            <option value="neumorphic">Neumorphic</option>
            <option value="glass">Glassmorphism</option>
          </select>
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
          title="Primary Color"
          palette={PRESET_COLORS}
          valueText={props.color}
          setValueText={handleColorChange(props.setColor)}
          normalizedHex={norm(props.color).hex}
          normalizedRgb={norm(props.color).rgb}
          ok={norm(props.color).ok}
        />

        <ColorControl
          title="Text Color"
          palette={PRESET_COLORS}
          valueText={props.textColor}
          setValueText={handleColorChange(props.setTextColor)}
          normalizedHex={norm(props.textColor).hex}
          normalizedRgb={norm(props.textColor).rgb}
          ok={norm(props.textColor).ok}
        />

        {/* Detailed Dimensions */}
        <div className="pt-4 border-t border-slate-700/50 space-y-4">
          <SizeControl
            label="Padding X"
            valueText={String(props.paddingX)}
            setValueText={(v) => props.setPaddingX(parseFloat(v) || 0)}
            min={0}
            max={60}
            step={1}
          />
          <SizeControl
            label="Padding Y"
            valueText={String(props.paddingY)}
            setValueText={(v) => props.setPaddingY(parseFloat(v) || 0)}
            min={0}
            max={30}
            step={1}
          />
          <SizeControl
            label="Font Size (px)"
            valueText={String(props.fontSize)}
            setValueText={(v) => props.setFontSize(parseFloat(v) || 0)}
            min={8}
            max={48}
            step={1}
          />

          {props.shape === "rounded" && (
            <SizeControl
              label="Border Radius"
              valueText={String(props.borderRadius)}
              setValueText={(v) => props.setBorderRadius(parseFloat(v) || 0)}
              min={0}
              max={30}
              step={1}
            />
          )}

          <SizeControl
            label="Border Width"
            valueText={String(props.borderWidth)}
            setValueText={(v) => props.setBorderWidth(parseFloat(v) || 0)}
            min={0}
            max={5}
            step={0.5}
          />
        </div>
      </div>
    </SectionCard>
  );
}
