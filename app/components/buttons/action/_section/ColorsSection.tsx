"use client";

import React from "react";
import { SectionCard } from "./ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import GradientControl from "@/app/components/controls/effects/GradientControl";

type ButtonVariant = "solid" | "outline" | "ghost";

export default function ColorsSection(props: {
  PALETTE: readonly string[];

  variant: ButtonVariant;
  // setVariant removed from props as it wasn't used

  useGradient: boolean;
  setUseGradient: (v: boolean) => void;

  gradAngleText: string;
  setGradAngleText: (v: string) => void;

  gradStartInput: string;
  setGradStartInput: (v: string) => void;
  gradStartNorm: { ok: boolean; hex: string; rgb: string };

  gradMidEnabled: boolean;
  setGradMidEnabled: (v: boolean) => void;

  gradMidInput: string;
  setGradMidInput: (v: string) => void;
  gradMidNorm: { ok: boolean; hex: string; rgb: string };

  gradEndInput: string;
  setGradEndInput: (v: string) => void;
  gradEndNorm: { ok: boolean; hex: string; rgb: string };

  bgInput: string;
  setBgInput: (v: string) => void;
  bgNorm: { ok: boolean; hex: string; rgb: string };

  textInput: string;
  setTextInput: (v: string) => void;
  textNorm: { ok: boolean; hex: string; rgb: string };
}) {
  const ghost = props.variant === "ghost";
  const outline = props.variant === "outline";
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
    props.setUseGradient(true);
    props.setGradAngleText(String(preset.angle));
    props.setGradStartInput(preset.stops[0]);
    props.setGradEndInput(preset.stops[preset.stops.length - 1]);
    if (preset.stops.length >= 3) {
      props.setGradMidEnabled(true);
      props.setGradMidInput(preset.stops[1]);
    } else {
      props.setGradMidEnabled(false);
    }
  };

  return (
    <SectionCard title="Colors" subtitle="Background, text, and gradients.">
      <div className="space-y-5">
        {/* Gradient Toggle (Solid Only) */}
        {!ghost && !outline && (
          <div className="flex items-center gap-2">
            <input
              id="grad-toggle"
              type="checkbox"
              checked={props.useGradient}
              onChange={(e) => props.setUseGradient(e.target.checked)}
              className="uf-clickable"
            />
            <label
              htmlFor="grad-toggle"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Use Gradient
            </label>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {props.useGradient && !ghost && !outline ? (
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
          {props.useGradient && !ghost && !outline ? (
            <>
              {/* Gradient Controls */}
              <GradientControl
                label="Gradient"
                angle={Number(props.gradAngleText) || 0}
                setAngle={(v) => props.setGradAngleText(String(v))}
                startColor={props.gradStartInput}
                setStartColor={props.setGradStartInput}
                endColor={props.gradEndInput}
                setEndColor={props.setGradEndInput}
                midEnabled={props.gradMidEnabled}
                setMidEnabled={props.setGradMidEnabled}
                midColor={props.gradMidInput}
                setMidColor={props.setGradMidInput}
                palette={props.PALETTE}
              />
            </>
          ) : (
            // Flat Background Control
            <ColorControl
              label={
                outline || ghost ? "Background (Hover/Base)" : "Background"
              }
              palette={props.PALETTE}
              value={props.bgInput}
              onChange={props.setBgInput}
            />
          )}

          {/* --- TEXT COLOR (Always Visible) --- */}
          {/* Moved outside the ternary operator so it doesn't vanish */}
          <ColorControl
            label="Text"
            palette={props.PALETTE}
            value={props.textInput}
            onChange={props.setTextInput}
          />
        </div>
      </div>
    </SectionCard>
  );
}
