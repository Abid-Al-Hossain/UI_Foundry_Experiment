"use client";
import React from "react";
import type { DividerState } from "../types";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Switch from "@/app/components/controls/input/Switch";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

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

export default function DividerColorsSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  const { color, gradientEnabled, gradientStart, gradientEnd } = state;

  return (
    <SectionCard title="Colors" subtitle="Base fill, gradients, and opacity.">
      <div className="space-y-6">
        <ColorControl
          label="Base Color"
          palette={PRESET_COLORS}
          value={color}
          onChange={setKey("color")}
        />

        <Switch
          label="Gradient Fill"
          checked={gradientEnabled}
          onChange={(v) => setKey("gradientEnabled")(v)}
        />

        {gradientEnabled && (
          <div className="space-y-4 border-l-2 border-slate-700/50 pl-4">
            <ColorControl
              label="Start Color"
              palette={PRESET_COLORS}
              value={gradientStart}
              onChange={setKey("gradientStart")}
            />
            <ColorControl
              label="End Color"
              palette={PRESET_COLORS}
              value={gradientEnd}
              onChange={setKey("gradientEnd")}
            />
          </div>
        )}

      </div>
    </SectionCard>
  );
}
