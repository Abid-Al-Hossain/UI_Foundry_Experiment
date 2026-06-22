"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type ToggleKeyUpdater, type ToggleState } from "../types";

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

export default function FocusSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: ToggleKeyUpdater;
}) {
  return (
    <SectionCard title="Focus" subtitle="Keyboard focus ring treatment.">
      <div className="space-y-3">
        <LabeledField label="Enabled">
          <Segmented
            value={state.focusRingEnabled ? "true" : "false"}
            onChange={(v) => setKey("focusRingEnabled")(v === "true")}
            items={[
              { value: "false", label: "Off" },
              { value: "true", label: "On" },
            ]}
          />
        </LabeledField>
        <ColorControl
          label="Ring Color"
          palette={PRESET_COLORS}
          value={state.focusRingColor}
          onChange={setKey("focusRingColor")}
        />
        <SizeControl
          label="Ring Width (px)"
          value={state.focusRingWidth}
          onChange={(v) => setKey("focusRingWidth")(v)}
          min={0}
          max={8}
          step={1}
        />
        <SizeControl
          label="Ring Offset (px)"
          value={state.focusRingOffset}
          onChange={(v) => setKey("focusRingOffset")(v)}
          min={0}
          max={8}
          step={1}
        />
      </div>
    </SectionCard>
  );
}
