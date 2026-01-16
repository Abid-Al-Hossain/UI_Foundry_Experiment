"use client";

import React from "react";
import { type IconState } from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { norm } from "@/app/components/controls/color/colorUtils";

export default function IconBasicsSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
  setFloat: (key: keyof IconState) => (val: any) => void;
}) {
  // Gradient Presets (Copied from Action Buttons)
  const presets = [
    { id: "sunset", label: "Sunset", angle: 90, stops: ["#f59e0b", "#ef4444"] },
    { id: "ocean", label: "Ocean", angle: 120, stops: ["#0ea5e9", "#2563eb"] },
    { id: "lime", label: "Lime Pop", angle: 90, stops: ["#84cc16", "#22c55e"] },
    {
      id: "aurora",
      label: "Aurora",
      angle: 135,
      stops: ["#22c55e", "#14b8a6", "#3b82f6"],
    },
    {
      id: "candy",
      label: "Candy",
      angle: 45,
      stops: ["#f472b6", "#a855f7", "#06b6d4"],
    },
  ];

  const applyPreset = (id: string) => {
    const preset = presets.find((p) => p.id === id);
    if (!preset) return;
    setKey("gradientEnabled")(true);
    setKey("gradientAngle")(preset.angle);
    setKey("gradientStart")(preset.stops[0]);
    setKey("gradientEnd")(preset.stops[preset.stops.length - 1]);
    // Icon doesn't support 3-stop gradients yet in the basic implementation,
    // but the list has 3 stops. We'll pick first and last.
  };

  return (
    <div className="space-y-6">
      {/* 1. Colors Section (Exact Match to Buttons) */}
      <SectionCard title="Colors" subtitle="Stroke, fill, and gradients.">
        <div className="space-y-5">
          {/* Gradient Toggle */}
          <div className="flex items-center gap-2">
            <input
              id="grad-toggle"
              type="checkbox"
              checked={state.gradientEnabled}
              onChange={(e) => setKey("gradientEnabled")(e.target.checked)}
              className="uf-clickable"
            />
            <label
              htmlFor="grad-toggle"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Use Gradient (Stroke)
            </label>
          </div>

          <div className="flex flex-col gap-5">
            {state.gradientEnabled && (
              <div>
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Gradient presets
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p.id)}
                      className="rounded-xl border px-3 py-2 text-xs font-semibold uf-clickable"
                      style={{
                        borderColor: "var(--border)",
                        background:
                          "color-mix(in oklab, var(--surface) 70%, transparent)",
                        color: "var(--text)",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gradient vs Solid Controls */}
            {state.gradientEnabled ? (
              <>
                <SizeControl
                  label="Gradient Angle (deg)"
                  value={state.gradientAngle}
                  onChange={setFloat("gradientAngle")}
                  min={0}
                  max={360}
                  unit="deg"
                />
                <ColorControl
                  label="Gradient start"
                  value={state.gradientStart}
                  onChange={setKey("gradientStart")}
                />
                <ColorControl
                  label="Gradient end"
                  value={state.gradientEnd}
                  onChange={setKey("gradientEnd")}
                />
              </>
            ) : (
              <ColorControl
                label="Stroke Color"
                value={state.color}
                onChange={setKey("color")}
              />
            )}

            {/* Fill Color (Always Visible like Text in Buttons) */}
            <ColorControl
              label="Fill Color"
              value={state.fillColor}
              onChange={setKey("fillColor")}
            />
          </div>
        </div>
      </SectionCard>

      {/* 2. Sizing Section */}
      <SectionCard title="Sizing" subtitle="Dimensions and stroke weight.">
        <div className="grid grid-cols-2 gap-4">
          <SizeControl
            label="Size"
            value={state.size}
            onChange={setFloat("size")}
            min={12}
            max={256}
            unit="px"
          />
          <SizeControl
            label="Stroke Width"
            value={state.strokeWidth}
            onChange={setFloat("strokeWidth")}
            min={0.5}
            max={4}
            step={0.1}
            unit="px"
          />
        </div>
      </SectionCard>

      {/* 3. Opacity Section */}
      <SectionCard title="Opacity" subtitle="Transparency levels.">
        <div className="space-y-4">
          <SizeControl
            label="Fill Opacity"
            value={state.fillOpacity}
            onChange={setFloat("fillOpacity")}
            min={0}
            max={1}
            step={0.05}
          />
          <SizeControl
            label="Overall Opacity"
            value={state.opacity}
            onChange={setFloat("opacity")}
            min={0}
            max={1}
            step={0.05}
          />
        </div>
      </SectionCard>
    </div>
  );
}
