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

const PRESET_MOTION_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

export default function DividerMotionSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  const {
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
    interactiveResize,
  } = state;

  return (
    <SectionCard
      title="Motion"
      subtitle="Animated beam and shimmer treatments for live separator states."
    >
      <div className="space-y-8">
        <div>
          <Switch
            label="Data Beam"
            checked={animateBeam}
            onChange={(v) => setKey("animateBeam")(v)}
          />
          {animateBeam ? (
            <div className="mt-4 space-y-4 border-l-2 border-slate-700/50 pl-4">
              <ColorControl
                label="Beam Color"
                palette={PRESET_MOTION_COLORS}
                value={beamColor}
                onChange={setKey("beamColor")}
              />
              <SizeControl
                label="Beam Speed (s)"
                value={beamSpeed}
                onChange={setKey("beamSpeed")}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-700/50 pt-6">
          <Switch
            label="Metallic Shimmer"
            checked={shimmerEnabled}
            onChange={(v) => setKey("shimmerEnabled")(v)}
          />
          {shimmerEnabled ? (
            <div className="mt-4 border-l-2 border-slate-700/50 pl-4">
              <SizeControl
                label="Shimmer Speed (s)"
                value={shimmerSpeed}
                onChange={setKey("shimmerSpeed")}
                min={0.5}
                max={5}
                step={0.1}
              />
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-700/50 pt-6">
          <Switch
            label="Interactive Resize Preview"
            checked={interactiveResize}
            onChange={(v) => setKey("interactiveResize")(v)}
          />
        </div>
      </div>
    </SectionCard>
  );
}
