"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { type CheckboxState, type CheckboxSetter } from "../types";

const PRESET_COLORS = [
  "#334155",
  "#64748b",
  "#94a3b8",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#000000",
  "#ffffff",
];

export default function MessagesSection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: CheckboxSetter;
}) {
  return (
    <SectionCard
      title="Messages"
      subtitle="Description, helper, error, and success states."
    >
      <div className="space-y-4">
        <LabeledField label="Description Text">
          <input
            value={state.descriptionText}
            onChange={(e) => setKey("descriptionText")(e.target.value)}
            placeholder="Short supporting copy"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <ColorControl
          label="Description Color"
          palette={PRESET_COLORS}
          value={state.descriptionColor}
          onChange={setKey("descriptionColor")}
        />
        <LabeledField label="Helper Text">
          <input
            value={state.helperText}
            onChange={(e) => setKey("helperText")(e.target.value)}
            placeholder="Optional guidance for the user"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <ColorControl
          label="Helper Color"
          palette={PRESET_COLORS}
          value={state.helperColor}
          onChange={setKey("helperColor")}
        />
        <LabeledField label="Error Text">
          <input
            value={state.errorText}
            onChange={(e) => setKey("errorText")(e.target.value)}
            placeholder="Validation feedback"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <ColorControl
          label="Error Color"
          palette={PRESET_COLORS}
          value={state.errorColor}
          onChange={setKey("errorColor")}
        />
        <LabeledField label="Success Text">
          <input
            value={state.successText}
            onChange={(e) => setKey("successText")(e.target.value)}
            placeholder="Positive confirmation"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <ColorControl
          label="Success Color"
          palette={PRESET_COLORS}
          value={state.successColor}
          onChange={setKey("successColor")}
        />
      </div>
    </SectionCard>
  );
}
