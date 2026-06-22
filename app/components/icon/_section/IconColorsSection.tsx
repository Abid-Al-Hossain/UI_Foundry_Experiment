"use client";

import React from "react";
import {
  type IconFloatSetter,
  type IconSetter,
  type IconState,
} from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

export default function IconColorsSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: IconSetter;
  setFloat: IconFloatSetter;
}) {
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
    const preset = presets.find((item) => item.id === id);
    if (!preset) return;
    setKey("gradientEnabled")(true);
    setFloat("gradientAngle")(preset.angle);
    setKey("gradientStart")(preset.stops[0]);
    setKey("gradientEnd")(preset.stops[preset.stops.length - 1]);
  };

  return (
    <div className="space-y-6">
      <SectionCard title="Colors" subtitle="Stroke, fill, and gradient treatments.">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <input
              id="icon-grad-toggle"
              type="checkbox"
              checked={state.gradientEnabled}
              onChange={(event) => setKey("gradientEnabled")(event.target.checked)}
              className="uf-clickable"
            />
            <label
              htmlFor="icon-grad-toggle"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Use Gradient Stroke
            </label>
          </div>

          {state.gradientEnabled ? (
            <>
              <div>
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Gradient presets
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset.id)}
                      className="rounded-xl border px-3 py-2 text-xs font-semibold uf-clickable"
                      style={{
                        borderColor: "var(--border)",
                        background:
                          "color-mix(in oklab, var(--surface) 70%, transparent)",
                        color: "var(--text)",
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <SegmentedControl
                value={state.gradientType}
                onChange={(v) => setKey("gradientType")(v)}
                items={[{ value: "linear", label: "Linear" }, { value: "radial", label: "Radial" }]}
              />
              <ColorControl
                label="Gradient start"
                value={state.gradientStart}
                onChange={setKey("gradientStart")}
              />
              {state.gradientType !== "radial" && (
                <SizeControl
                  label="Gradient Angle"
                  value={state.gradientAngle}
                  onChange={setFloat("gradientAngle")}
                  min={0}
                  max={360}
                  unit="deg"
                />
              )}
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

          <ColorControl
            label="Fill Color"
            value={state.fillColor}
            onChange={setKey("fillColor")}
          />
        </div>
      </SectionCard>
    </div>
  );
}
