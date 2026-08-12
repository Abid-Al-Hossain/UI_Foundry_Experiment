"use client";

import React from "react";
import { SectionCard } from "./ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import GradientControl from "@/app/components/controls/effects/GradientControl";

import { ActionButtonState, ActionButtonFieldSetter } from "../types";
import { PALETTE } from "../_data/buttonConstants";
import Switch from "@/app/components/controls/input/Switch";

export default function ColorsSection({
  state,
  setKey,
}: {
  state: ActionButtonState;
  setKey: ActionButtonFieldSetter;
}) {
  const ghost = state.variant === "ghost";
  const outline = state.variant === "outline";

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
    setKey("useGradient")(true);
    setKey("gradAngleText")(String(preset.angle));
    setKey("gradStartInput")(preset.stops[0]);
    setKey("gradEndInput")(preset.stops[preset.stops.length - 1]);
    if (preset.stops.length >= 3) {
      setKey("gradMidEnabled")(true);
      setKey("gradMidInput")(preset.stops[1]);
    } else {
      setKey("gradMidEnabled")(false);
    }
  };

  return (
    <SectionCard title="Colors" subtitle="Background, text, and gradients.">
      <div className="space-y-5">
        {/* Gradient Toggle (Solid Only) */}
        {!ghost && !outline && (
          <Switch
            label={<>Use Gradient</>}
            id="grad-toggle"
            checked={state.useGradient}
            onChange={(checked) => setKey("useGradient")(checked)}
          />
        )}

        <div className="flex flex-col gap-5">
          {state.useGradient && !ghost && !outline ? (
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
          ) : null}

          {/* --- BACKGROUND LOGIC --- */}
          {state.useGradient && !ghost && !outline ? (
            <>
              {/* Gradient Controls */}
              <GradientControl
                label="Gradient"
                angle={Number(state.gradAngleText) || 0}
                setAngle={(v) => setKey("gradAngleText")(String(v))}
                startColor={state.gradStartInput}
                setStartColor={(v) => setKey("gradStartInput")(v)}
                endColor={state.gradEndInput}
                setEndColor={(v) => setKey("gradEndInput")(v)}
                midEnabled={state.gradMidEnabled}
                setMidEnabled={(v) => setKey("gradMidEnabled")(v)}
                midColor={state.gradMidInput}
                setMidColor={(v) => setKey("gradMidInput")(v)}
                palette={PALETTE}
              />
            </>
          ) : (
            // Flat Background Control
            <ColorControl
              label={
                outline || ghost ? "Background (Hover/Base)" : "Background"
              }
              palette={PALETTE}
              value={state.bgInput}
              onChange={(v) => setKey("bgInput")(v)}
            />
          )}

          {/* --- TEXT COLOR (Always Visible) --- */}
          <ColorControl
            label="Text"
            palette={PALETTE}
            value={state.textInput}
            onChange={(v) => setKey("textInput")(v)}
          />
        </div>
      </div>
    </SectionCard>
  );
}
