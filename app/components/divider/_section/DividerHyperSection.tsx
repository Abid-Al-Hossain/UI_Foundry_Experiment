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

const PRESET_HYPER_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

export default function DividerHyperSection({
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
    neonGlow,
    glowColor,
    glowBlur,
    interactiveResize,
  } = state;

  return (
    <SectionCard
      title="Effects"
      subtitle="Animation, shimmer, and glow treatments."
    >
      <div className="space-y-8">
        <div>
          <div className="mb-4">
            <Switch
              label="Data Beam Animation"
              checked={animateBeam}
              onChange={(v) => setKey("animateBeam")(v)}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Animated pulse moving along the line
            </span>
          </div>
          {animateBeam && (
            <div className="space-y-4 border-l-2 border-slate-700/50 pl-4">
              <ColorControl
                label="Beam Color"
                palette={PRESET_HYPER_COLORS}
                value={beamColor}
                onChange={setKey("beamColor")}
              />
              <SizeControl
                label="Duration (Speed s)"
                value={beamSpeed}
                onChange={setKey("beamSpeed")}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          )}
        </div>

        <div className="border-t border-slate-700/50 pt-4">
          <div className="mb-4">
            <Switch
              label="Metallic Shimmer"
              checked={shimmerEnabled}
              onChange={(v) => setKey("shimmerEnabled")(v)}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Subtle brightness pulse
            </span>
          </div>
          {shimmerEnabled && (
            <div className="border-l-2 border-slate-700/50 pl-4">
              <SizeControl
                label="Shimmer Speed (s)"
                value={shimmerSpeed}
                onChange={setKey("shimmerSpeed")}
                min={0.5}
                max={5}
                step={0.1}
              />
            </div>
          )}
        </div>

        <div className="border-t border-slate-700/50 pt-4">
          <div className="mb-4">
            <Switch
              label="Interactive Resize"
              checked={interactiveResize}
              onChange={(v) => setKey("interactiveResize")(v)}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Allow the divider preview card to be resized in the canvas.
            </span>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-4">
          <div className="mb-4">
            <Switch
              label="Neon Glow"
              checked={neonGlow}
              onChange={(v) => setKey("neonGlow")(v)}
            />
            <span className="mt-1 block text-xs text-slate-500">
              Outer diffused glow effect
            </span>
          </div>
          {neonGlow && (
            <div className="space-y-4 border-l-2 border-slate-700/50 pl-4">
              <ColorControl
                label="Glow Color"
                palette={PRESET_HYPER_COLORS}
                value={glowColor}
                onChange={setKey("glowColor")}
              />
              <SizeControl
                label="Blur Radius (px)"
                value={glowBlur}
                onChange={setKey("glowBlur")}
                min={0}
                max={100}
                step={1}
              />
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
