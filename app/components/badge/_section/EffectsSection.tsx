"use client";
import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
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

export default function EffectsSection({ state, setKey, setFloat }: any) {
  const {
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientAngle,
    dropShadow,
    shadowColor,
    shadowBlur,
    interactive,
    hoverScale,
    clickRipple,
  } = state;

  return (
    <SectionCard
      title="Visual Effects"
      subtitle="Gradients, Shadows, and Micro-interactions."
    >
      <div className="space-y-6">
        {/* Gradient */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">
              Gradient Fill
            </label>
            <input
              type="checkbox"
              checked={gradientEnabled}
              onChange={(e) => setKey("gradientEnabled")(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
          {gradientEnabled && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
              <ColorControl
                title="Start Color"
                palette={PRESET_COLORS}
                valueText={gradientStart}
                setValueText={setKey("gradientStart")}
                normalizedHex={norm(gradientStart).hex}
                normalizedRgb={norm(gradientStart).rgb}
                ok={norm(gradientStart).ok}
              />
              <ColorControl
                title="End Color"
                palette={PRESET_COLORS}
                valueText={gradientEnd}
                setValueText={setKey("gradientEnd")}
                normalizedHex={norm(gradientEnd).hex}
                normalizedRgb={norm(gradientEnd).rgb}
                ok={norm(gradientEnd).ok}
              />
              <SizeControl
                label="Angle (deg)"
                valueText={String(gradientAngle)}
                setValueText={setFloat("gradientAngle")}
                min={0}
                max={360}
                step={15}
              />
            </div>
          )}
        </div>

        {/* Shadow */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">
              Drop Shadow
            </label>
            <input
              type="checkbox"
              checked={dropShadow}
              onChange={(e) => setKey("dropShadow")(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
          {dropShadow && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
              <ColorControl
                title="Shadow Color"
                palette={[
                  ...PRESET_COLORS,
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,0.2)",
                ]}
                valueText={shadowColor}
                setValueText={setKey("shadowColor")}
                normalizedHex={norm(shadowColor).hex}
                normalizedRgb={norm(shadowColor).rgb}
                ok={norm(shadowColor).ok}
              />
              <SizeControl
                label="Blur Radius (px)"
                valueText={String(shadowBlur)}
                setValueText={setFloat("shadowBlur")}
                min={0}
                max={50}
                step={1}
              />
            </div>
          )}
        </div>

        {/* Interactive */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Interactivity
          </h3>

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Hover Scale</label>
            <input
              type="checkbox"
              checked={interactive}
              onChange={(e) => setKey("interactive")(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
          {interactive && (
            <div className="pl-4">
              <SizeControl
                label="Scale Factor"
                valueText={String(hoverScale)}
                setValueText={setFloat("hoverScale")}
                min={0.8}
                max={1.5}
                step={0.05}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-300">Click Ripple</label>
            <input
              type="checkbox"
              checked={clickRipple}
              onChange={(e) => setKey("clickRipple")(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
