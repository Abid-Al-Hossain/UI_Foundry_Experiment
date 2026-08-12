"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";

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
          <Switch
            label={<>Gradient Fill</>}
            checked={props.gradientEnabled}
            onChange={(checked) => props.setGradientEnabled(checked)}
          />
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
          <Switch
            label={<>Drop Shadow</>}
            checked={props.dropShadow}
            onChange={(checked) => props.setDropShadow(checked)}
          />
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
