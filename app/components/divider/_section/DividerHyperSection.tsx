"use client";
import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "../../buttons/action/_section/ColorControl";
import SizeControl from "../../buttons/action/_section/SizeControl";
import { norm } from "../../buttons/action/_utils/colorUtils";

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

export default function DividerHyperSection({ state, setKey, setFloat }: any) {
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-200">
                Data Beam Animation
              </label>
              <span className="text-xs text-slate-500">
                Animated pulse moving along the line
              </span>
            </div>
            <input
              type="checkbox"
              checked={animateBeam}
              onChange={(e) => setKey("animateBeam")(e.target.checked)}
              className="scale-125 accent-blue-600 cursor-pointer"
            />
          </div>
          {animateBeam && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4">
              <ColorControl
                title="Beam Color"
                palette={PRESET_HYPER_COLORS}
                valueText={beamColor}
                setValueText={setKey("beamColor")}
                normalizedHex={norm(beamColor).hex}
                normalizedRgb={norm(beamColor).rgb}
                ok={norm(beamColor).ok}
              />
              <SizeControl
                label="Duration (Speed s)"
                valueText={String(beamSpeed)}
                setValueText={setFloat("beamSpeed")}
                min={0.5}
                max={10}
                step={0.5}
              />
            </div>
          )}
        </div>

        {/* Shimmer */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-200">
                Metallic Shimmer
              </label>
              <span className="text-xs text-slate-500">
                Subtle brightness pulse
              </span>
            </div>
            <input
              type="checkbox"
              checked={shimmerEnabled}
              onChange={(e) => setKey("shimmerEnabled")(e.target.checked)}
              className="scale-125 accent-blue-600 cursor-pointer"
            />
          </div>
          {shimmerEnabled && (
            <div className="pl-4 border-l-2 border-slate-700/50">
              <SizeControl
                label="Shimmer Speed (s)"
                valueText={String(shimmerSpeed)}
                setValueText={setFloat("shimmerSpeed")}
                min={0.5}
                max={5}
                step={0.1}
              />
            </div>
          )}
        </div>

        {/* Neon */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-slate-200">
                Neon Glow
              </label>
              <span className="text-xs text-slate-500">
                Outer diffused glow effect
              </span>
            </div>
            <input
              type="checkbox"
              checked={neonGlow}
              onChange={(e) => setKey("neonGlow")(e.target.checked)}
              className="scale-125 accent-blue-600 cursor-pointer"
            />
          </div>
          {neonGlow && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4">
              <ColorControl
                title="Glow Color"
                palette={PRESET_HYPER_COLORS}
                valueText={glowColor}
                setValueText={setKey("glowColor")}
                normalizedHex={norm(glowColor).hex}
                normalizedRgb={norm(glowColor).rgb}
                ok={norm(glowColor).ok}
              />
              <SizeControl
                label="Blur Radius (px)"
                valueText={String(glowBlur)}
                setValueText={setFloat("glowBlur")}
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
