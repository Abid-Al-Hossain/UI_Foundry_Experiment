"use client";
import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "../../buttons/action/_section/ColorControl";
import SizeControl from "../../buttons/action/_section/SizeControl";
import { norm } from "../../buttons/action/_utils/colorUtils";

const PRESET_GRADIENTS = [
  "#3b82f6",
  "#9333ea",
  "#ec4899",
  "#f59e0b",
  "#10b981",
];

export default function DividerEffectsSection({
  state,
  setKey,
  setFloat,
}: any) {
  const { gradientEnabled, gradientStart, gradientEnd, opacity } = state;

  return (
    <SectionCard title="Visual Effects" subtitle="Gradients and transparency">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">
            Gradient Flow
          </label>
          <input
            type="checkbox"
            checked={gradientEnabled}
            onChange={(e) => setKey("gradientEnabled")(e.target.checked)}
            className="accent-blue-500 scale-125"
          />
        </div>

        {gradientEnabled && (
          <div className="pl-4 border-l-2 border-slate-700/50 space-y-4">
            <ColorControl
              title="Start Color"
              palette={PRESET_GRADIENTS}
              valueText={gradientStart}
              setValueText={setKey("gradientStart")}
              normalizedHex={norm(gradientStart).hex}
              normalizedRgb={norm(gradientStart).rgb}
              ok={norm(gradientStart).ok}
            />
            <ColorControl
              title="End Color"
              palette={PRESET_GRADIENTS}
              valueText={gradientEnd}
              setValueText={setKey("gradientEnd")}
              normalizedHex={norm(gradientEnd).hex}
              normalizedRgb={norm(gradientEnd).rgb}
              ok={norm(gradientEnd).ok}
            />
          </div>
        )}

        <div className="pt-4 border-t border-slate-700/50">
          <SizeControl
            label="Opacity"
            valueText={String(opacity)}
            setValueText={setFloat("opacity")}
            min={0}
            max={1}
            step={0.05}
          />
        </div>
      </div>
    </SectionCard>
  );
}
