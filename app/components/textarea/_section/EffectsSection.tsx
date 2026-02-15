"use client";

import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import ShadowLayerControl from "@/app/components/controls/effects/ShadowLayerControl";
import { TextareaState } from "../types";

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
  state: TextareaState;
  setKey: (key: keyof TextareaState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Effects & Animation" subtitle="Shadow and transitions.">
      <div className="space-y-5">
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
      </div>
    </SectionCard>
  );
}
