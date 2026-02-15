"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import { CheckboxState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: (key: keyof CheckboxState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Basics" subtitle="Core checkbox properties.">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            id="cb-checked"
            type="checkbox"
            checked={state.checked}
            onChange={(e) => setKey("checked")(e.target.checked)}
          />
          <label
            htmlFor="cb-checked"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Checked
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="cb-indet"
            type="checkbox"
            checked={state.indeterminate}
            onChange={(e) => setKey("indeterminate")(e.target.checked)}
          />
          <label
            htmlFor="cb-indet"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Indeterminate
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="cb-disabled"
            type="checkbox"
            checked={state.disabled}
            onChange={(e) => setKey("disabled")(e.target.checked)}
          />
          <label
            htmlFor="cb-disabled"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Disabled
          </label>
        </div>
        <LabeledField label="Value">
          <input
            value={state.value}
            onChange={(e) => setKey("value")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Name">
          <input
            value={state.name}
            onChange={(e) => setKey("name")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Label Text">
          <input
            value={state.labelText}
            onChange={(e) => setKey("labelText")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Label Position">
          <Segmented
            value={state.labelPosition}
            onChange={(v) => setKey("labelPosition")(v)}
            items={[
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
