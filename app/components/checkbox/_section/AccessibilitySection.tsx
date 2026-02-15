"use client";

import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
import { CheckboxState } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: (key: keyof CheckboxState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA attributes.">
      <div className="space-y-4">
        <LabeledField label="aria-label">
          <input
            value={state.ariaLabel}
            onChange={(e) => setKey("ariaLabel")(e.target.value)}
            placeholder="Accessible label"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Role" hint="default: checkbox">
          <input
            value={state.role}
            onChange={(e) => setKey("role")(e.target.value)}
            placeholder="checkbox"
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
