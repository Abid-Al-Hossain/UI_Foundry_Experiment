"use client";

import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import { TextInputState } from "../types";

const PRESET_COLORS = [
  "#cbd5e1",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#000000",
  "#ffffff",
];

export default function EffectsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: (key: keyof TextInputState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Effects & Animation" subtitle="Shadow and transitions.">
      <div className="space-y-5">
        import ShadowLayerControl from
        "@/app/components/controls/effects/ShadowLayerControl"; // ... inside
        component ...
        {/* Shadow */}
        <div className="space-y-3">
          <ShadowLayerControl
            label="Box Shadow"
            enabled={state.shadowEnabled}
            setEnabled={setKey("shadowEnabled")}
            x={state.shadowX}
            setX={(v) => setKey("shadowX")(v)}
            y={state.shadowY}
            setY={(v) => setKey("shadowY")(v)}
            blur={state.shadowBlur}
            setBlur={(v) => setKey("shadowBlur")(v)}
            spread={state.shadowSpread}
            setSpread={(v) => setKey("shadowSpread")(v)}
            opacity={state.shadowOpacity}
            setOpacity={(v) => setKey("shadowOpacity")(v)}
            color={state.shadowColor}
            setColor={setKey("shadowColor")}
          />
        </div>
        {/* Transition */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Transition
          </div>
          <SizeControl
            label="Duration (ms)"
            value={state.transitionDuration}
            onChange={(v) => setKey("transitionDuration")(v)}
            min={0}
            max={1000}
            step={50}
          />
          <LabeledField label="Easing">
            <Select
              value={state.transitionEasing}
              onChange={(v) => setKey("transitionEasing")(v)}
              options={[
                { value: "ease", label: "Ease" },
                { value: "ease-in", label: "Ease In" },
                { value: "ease-out", label: "Ease Out" },
                { value: "ease-in-out", label: "Ease In Out" },
                { value: "linear", label: "Linear" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Property">
            <input
              value={state.transitionProperty}
              onChange={(e) => setKey("transitionProperty")(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none font-mono"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
        {/* Icon */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div className="flex items-center gap-2">
            <input
              id="icon-on"
              type="checkbox"
              checked={state.iconEnabled}
              onChange={(e) => setKey("iconEnabled")(e.target.checked)}
            />
            <label
              htmlFor="icon-on"
              className="text-xs font-semibold uppercase tracking-wider uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              Icon / Adornment
            </label>
          </div>
          {state.iconEnabled && (
            <>
              <LabeledField label="Position">
                <Select
                  value={state.iconPosition}
                  onChange={(v) => setKey("iconPosition")(v)}
                  options={[
                    { value: "left", label: "Left" },
                    { value: "right", label: "Right" },
                  ]}
                />
              </LabeledField>
              <SizeControl
                label="Size (px)"
                value={state.iconSize}
                onChange={(v) => setKey("iconSize")(v)}
                min={12}
                max={32}
                step={1}
              />
              <ColorControl
                label="Color"
                palette={PRESET_COLORS}
                value={state.iconColor}
                onChange={setKey("iconColor")}
              />
              <LabeledField label="SVG">
                <textarea
                  value={state.iconSvg}
                  onChange={(e) => setKey("iconSvg")(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border px-3 py-2 text-xs outline-none font-mono"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in oklab, var(--surface) 70%, transparent)",
                    color: "var(--text)",
                  }}
                />
              </LabeledField>
            </>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
