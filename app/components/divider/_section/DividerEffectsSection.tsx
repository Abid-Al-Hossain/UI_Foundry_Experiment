"use client";
import React from "react";
import type { DividerState } from "../types";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

const PRESET_EFFECT_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

export default function DividerEffectsSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  const { neonGlow, glowColor, glowBlur } = state;

  return (
    <SectionCard
      title="Effects"
      subtitle="Glow treatments that stay native to separator styling."
    >
      <div className="space-y-6">
        <Switch
          label="Neon Glow"
          checked={neonGlow}
          onChange={(v) => setKey("neonGlow")(v)}
        />

        {neonGlow ? (
          <div className="space-y-4 border-l-2 border-slate-700/50 pl-4">
            <ColorControl
              label="Glow Color"
              palette={PRESET_EFFECT_COLORS}
              value={glowColor}
              onChange={setKey("glowColor")}
            />
            <SizeControl
              label="Glow Blur (px)"
              value={glowBlur}
              onChange={setKey("glowBlur")}
              min={0}
              max={100}
              step={1}
            />
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
