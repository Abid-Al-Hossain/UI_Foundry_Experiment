"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";
import ColorControl from "./ColorControl";

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
    { id: "aurora", label: "Aurora", angle: 135, stops: ["#22c55e", "#14b8a6", "#3b82f6"] },
    { id: "candy", label: "Candy", angle: 45, stops: ["#f472b6", "#a855f7", "#06b6d4"] },
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
            <label htmlFor="grad-toggle" className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
              Use Gradient
            </label>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {props.useGradient && !ghost && !outline ? (
            <div>
              <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
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
                      background: "color-mix(in oklab, var(--surface) 70%, transparent)",
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
              <SizeControl
                label="Gradient Angle (deg)"
                valueText={props.gradAngleText}
                setValueText={props.setGradAngleText}
                min={0}
                max={360}
              />

              <ColorControl
                title="Gradient start"
                palette={props.PALETTE}
                valueText={props.gradStartInput}
                setValueText={props.setGradStartInput}
                normalizedHex={props.gradStartNorm.hex}
                normalizedRgb={props.gradStartNorm.rgb}
                ok={props.gradStartNorm.ok}
              />

              <div className="flex items-center gap-2">
                <input
                  id="grad-mid-toggle"
                  type="checkbox"
                  checked={props.gradMidEnabled}
                  onChange={(e) => props.setGradMidEnabled(e.target.checked)}
                  className="uf-clickable"
                />
                <label htmlFor="grad-mid-toggle" className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
                  Use middle stop
                </label>
              </div>

              {props.gradMidEnabled ? (
                <ColorControl
                  title="Gradient middle"
                  palette={props.PALETTE}
                  valueText={props.gradMidInput}
                  setValueText={props.setGradMidInput}
                  normalizedHex={props.gradMidNorm.hex}
                  normalizedRgb={props.gradMidNorm.rgb}
                  ok={props.gradMidNorm.ok}
                />
              ) : null}

              <ColorControl
                title="Gradient end"
                palette={props.PALETTE}
                valueText={props.gradEndInput}
                setValueText={props.setGradEndInput}
                normalizedHex={props.gradEndNorm.hex}
                normalizedRgb={props.gradEndNorm.rgb}
                ok={props.gradEndNorm.ok}
              />
            </>
          ) : (
            // Flat Background Control
            <ColorControl
              title={outline || ghost ? "Background (Hover/Base)" : "Background"}
              palette={props.PALETTE}
              valueText={props.bgInput}
              setValueText={props.setBgInput}
              normalizedHex={props.bgNorm.hex}
              normalizedRgb={props.bgNorm.rgb}
              ok={props.bgNorm.ok}
            />
          )}

          {/* --- TEXT COLOR (Always Visible) --- */}
          {/* Moved outside the ternary operator so it doesn't vanish */}
          <ColorControl
            title="Text"
            palette={props.PALETTE}
            valueText={props.textInput}
            setValueText={props.setTextInput}
            normalizedHex={props.textNorm.hex}
            normalizedRgb={props.textNorm.rgb}
            ok={props.textNorm.ok}
          />
        </div>
      </div>
    </SectionCard>
  );
}
