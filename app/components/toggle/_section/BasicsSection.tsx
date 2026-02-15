"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import { ToggleState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: (key: keyof ToggleState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Basics" subtitle="Core toggle properties.">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            id="tg-checked"
            type="checkbox"
            checked={state.checked}
            onChange={(e) => setKey("checked")(e.target.checked)}
          />
          <label
            htmlFor="tg-checked"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            On
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="tg-disabled"
            type="checkbox"
            checked={state.disabled}
            onChange={(e) => setKey("disabled")(e.target.checked)}
          />
          <label
            htmlFor="tg-disabled"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Disabled
          </label>
        </div>
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
      </div>
    </SectionCard>
  );
}
