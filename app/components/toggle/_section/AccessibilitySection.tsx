"use client";

import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
import { ToggleState } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: (key: keyof ToggleState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA attributes.">
      <div className="space-y-4">
        <LabeledField label="aria-label">
          <input
            value={state.ariaLabel}
            onChange={(e) => setKey("ariaLabel")(e.target.value)}
            placeholder="Toggle label"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Role" hint="default: switch">
          <input
            value={state.role}
            onChange={(e) => setKey("role")(e.target.value)}
            placeholder="switch"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
