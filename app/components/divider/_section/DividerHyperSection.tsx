"use client";
import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";

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

export default function DividerHyperSection({ state, setKey }: any) {
  const {
    animateBeam,
    beamColor,
    beamSpeed,
    shimmerEnabled,
    shimmerSpeed,
    neonGlow,
    glowColor,
    glowBlur,
  } = state;

  return (
    <SectionCard
      title="Hyper FX"
      subtitle="Advanced animations and glow effects."
    >
      <div className="space-y-8">
        {/* Beam Logic */}
        <div>
          <div className="mb-4">
            <Switch
              label="Data Beam Animation"
              checked={animateBeam}
              onChange={(v) => setKey("animateBeam")(v)}
            />
            <span className="text-xs text-slate-500 block mt-1">
              Animated pulse moving along the line
            </span>
          </div>
          {animateBeam && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4">
              <ColorControl
                label="Beam Color"
                palette={PRESET_HYPER_COLORS}
                value={beamColor}
                onChange={setKey("beamColor")}
              />
              <SizeControl
                label="Duration (Speed s)"
                value={beamSpeed}
                onChange={(v) => setKey("beamSpeed")(v)}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          )}
        </div>

        {/* Shimmer */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="mb-4">
            <Switch
              label="Metallic Shimmer"
              checked={shimmerEnabled}
              onChange={(v) => setKey("shimmerEnabled")(v)}
            />
            <span className="text-xs text-slate-500 block mt-1">
              Subtle brightness pulse
            </span>
          </div>
          {shimmerEnabled && (
            <div className="pl-4 border-l-2 border-slate-700/50">
              <SizeControl
                label="Shimmer Speed (s)"
                value={shimmerSpeed}
                onChange={(v) => setKey("shimmerSpeed")(v)}
                min={0.5}
                max={5}
                step={0.1}
              />
            </div>
          )}
        </div>

        {/* Neon */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="mb-4">
            <Switch
              label="Neon Glow"
              checked={neonGlow}
              onChange={(v) => setKey("neonGlow")(v)}
            />
            <span className="text-xs text-slate-500 block mt-1">
              Outer diffused glow effect
            </span>
          </div>
          {neonGlow && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4">
              <ColorControl
                label="Glow Color"
                palette={PRESET_HYPER_COLORS}
                value={glowColor}
                onChange={setKey("glowColor")}
              />
              <SizeControl
                label="Blur Radius (px)"
                value={glowBlur}
                onChange={(v) => setKey("glowBlur")(v)}
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
