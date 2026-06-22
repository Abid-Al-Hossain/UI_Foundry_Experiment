"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";

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

export default function EffectsSection(props: {
  gradientEnabled: boolean;
  setGradientEnabled: (v: boolean) => void;
  gradientStart: string;
  setGradientStart: (v: string) => void;
  gradientEnd: string;
  setGradientEnd: (v: string) => void;
  gradientAngle: number;
  setGradientAngle: (v: number) => void;
  dropShadow: boolean;
  setDropShadow: (v: boolean) => void;
  shadowColor: string;
  setShadowColor: (v: string) => void;
  shadowBlur: number;
  setShadowBlur: (v: number) => void;
}) {
  return (
    <SectionCard
      title="Effects"
      subtitle="Gradients and badge-native surface effects."
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
              checked={props.gradientEnabled}
              onChange={(e) => props.setGradientEnabled(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
          {props.gradientEnabled && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
              <ColorControl
                label="Start Color"
                palette={PRESET_COLORS}
                value={props.gradientStart}
                onChange={props.setGradientStart}
              />
              <ColorControl
                label="End Color"
                palette={PRESET_COLORS}
                value={props.gradientEnd}
                onChange={props.setGradientEnd}
              />
              <SizeControl
                label="Angle (deg)"
                value={props.gradientAngle}
                onChange={props.setGradientAngle}
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
              checked={props.dropShadow}
              onChange={(e) => props.setDropShadow(e.target.checked)}
              className="accent-blue-500"
            />
          </div>
          {props.dropShadow && (
            <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
              <ColorControl
                label="Shadow Color"
                palette={[
                  ...PRESET_COLORS,
                  "rgba(0,0,0,0.5)",
                  "rgba(0,0,0,0.2)",
                ]}
                value={props.shadowColor}
                onChange={props.setShadowColor}
              />
              <SizeControl
                label="Blur Radius (px)"
                value={props.shadowBlur}
                onChange={props.setShadowBlur}
                min={0}
                max={50}
                step={1}
              />
            </div>
          )}
        </div>

      </div>
    </SectionCard>
  );
}
