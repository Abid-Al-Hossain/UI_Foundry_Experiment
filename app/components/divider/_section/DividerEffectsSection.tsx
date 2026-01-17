"use client";
import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";

const PRESET_GRADIENTS = [
  "#3b82f6",
  "#9333ea",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#ffffff",
];

export default function DividerEffectsSection({ state, setKey }: any) {
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
              label="Start Color"
              palette={PRESET_GRADIENTS}
              value={gradientStart}
              onChange={setKey("gradientStart")}
            />
            <ColorControl
              label="End Color"
              palette={PRESET_GRADIENTS}
              value={gradientEnd}
              onChange={setKey("gradientEnd")}
            />
          </div>
        )}

        <div className="pt-4 border-t border-slate-700/50">
          <SizeControl
            label="Opacity"
            value={opacity}
            onChange={(v) => setKey("opacity")(v)}
            min={0}
            max={1}
            step={0.05}
          />
        </div>
      </div>
    </SectionCard>
  );
}
