"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import Select from "@/app/components/controls/input/Select";
import { TextInputState } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: (key: keyof TextInputState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA and input modes.">
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
        <LabeledField label="Autocomplete">
          <Select
            value={state.autocomplete}
            onChange={(v) => setKey("autocomplete")(v)}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
              { value: "name", label: "Name" },
              { value: "email", label: "Email" },
              { value: "tel", label: "Tel" },
              { value: "url", label: "URL" },
              { value: "current-password", label: "Current Password" },
              { value: "new-password", label: "New Password" },
              { value: "one-time-code", label: "One-Time Code" },
            ]}
          />
        </LabeledField>
        <LabeledField label="Input Mode">
          <Select
            value={state.inputmode}
            onChange={(v) => setKey("inputmode")(v)}
            options={[
              { value: "text", label: "Text" },
              { value: "decimal", label: "Decimal" },
              { value: "numeric", label: "Numeric" },
              { value: "tel", label: "Tel" },
              { value: "search", label: "Search" },
              { value: "email", label: "Email" },
              { value: "url", label: "URL" },
              { value: "none", label: "None" },
            ]}
          />
        </LabeledField>
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
