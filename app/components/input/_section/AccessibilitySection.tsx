"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import { type TextInputSetter, type TextInputState } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Accessibility"
      subtitle="ARIA wiring and semantic overrides."
    >
      <div className="space-y-4">
        <LabeledField label="aria-label">
          <input
            value={state.ariaLabel}
            onChange={(e) => setKey("ariaLabel")(e.target.value)}
            placeholder="Input label"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="aria-describedby">
          <input
            value={state.ariaDescribedBy}
            onChange={(e) => setKey("ariaDescribedBy")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <div className="flex items-center gap-2">
          <input
            id="aria-inv"
            type="checkbox"
            checked={state.ariaInvalid}
            onChange={(e) => setKey("ariaInvalid")(e.target.checked)}
          />
          <label
            htmlFor="aria-inv"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            aria-invalid
          </label>
        </div>
        <LabeledField label="Role">
          <input
            value={state.role}
            onChange={(e) => setKey("role")(e.target.value)}
            placeholder="textbox"
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
