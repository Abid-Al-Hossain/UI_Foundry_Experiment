"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import { type ToggleState, type ToggleKeyUpdater } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: ToggleKeyUpdater;
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
        <LabeledField label="aria-describedby">
          <input
            value={state.ariaDescribedBy}
            onChange={(e) => setKey("ariaDescribedBy")(e.target.value)}
            placeholder="Associated helper text id(s)"
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
            id="toggle-aria-required"
            type="checkbox"
            checked={state.ariaRequired}
            onChange={(e) => setKey("ariaRequired")(e.target.checked)}
          />
          <label
            htmlFor="toggle-aria-required"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            aria-required
          </label>
        </div>
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
