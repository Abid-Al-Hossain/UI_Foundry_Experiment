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
  "#cbd5e1",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#000000",
  "#ffffff",
];

export default function DividerBasicsSection({ state, setKey, setFloat }: any) {
  const { orientation, width, thickness, gap, color, variant, borderRadius } =
    state;

  return (
    <SectionCard title="Basics" subtitle="Shape, style, and dimensions.">
      <div className="space-y-6">
        <LabeledField label="Orientation">
          <Segmented
            value={orientation}
            onChange={setKey("orientation")}
            items={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Width / Height">
          <input
            type="text"
            value={width}
            onChange={(e) => setKey("width")(e.target.value)}
            className="w-full h-9 px-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. 100%, 300px"
          />
        </LabeledField>

        {/* Replaced raw color input with ColorControl */}
        <ColorControl
          title="Color"
          palette={PRESET_COLORS}
          valueText={color}
          setValueText={setKey("color")}
          normalizedHex={norm(color).hex}
          normalizedRgb={norm(color).rgb}
          ok={norm(color).ok}
        />

        <LabeledField label="Variant">
          <Segmented
            value={variant}
            onChange={setKey("variant")}
            items={[
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
              { label: "Dotted", value: "dotted" },
              { label: "Double", value: "double" },
            ]}
          />
        </LabeledField>

        <div className="pt-4 border-t border-slate-700/50 space-y-4">
          <SizeControl
            label="Thickness (px)"
            valueText={String(thickness)}
            setValueText={setFloat("thickness")}
            min={1}
            max={40}
            step={1}
          />

          <SizeControl
            label="Gap / Spacing (px)"
            valueText={String(gap)}
            setValueText={setFloat("gap")}
            min={0}
            max={100}
            step={4}
          />

          <SizeControl
            label="Border Radius (px)"
            valueText={String(borderRadius)}
            setValueText={setFloat("borderRadius")}
            min={0}
            max={50}
            step={1}
          />
        </div>
      </div>
    </SectionCard>
  );
}
