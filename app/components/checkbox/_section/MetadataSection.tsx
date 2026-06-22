"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import { type CheckboxSetter, type CheckboxState } from "../types";

export default function MetadataSection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: CheckboxSetter;
}) {
  return (
    <SectionCard title="Metadata" subtitle="Native control attributes.">
      <div className="space-y-4">
        <LabeledField label="Control ID">
          <input
            value={state.id}
            onChange={(e) => setKey("id")(e.target.value)}
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
        <LabeledField label="Title">
          <input
            value={state.title}
            onChange={(e) => setKey("title")(e.target.value)}
            placeholder="Tooltip / browser title"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Tab Index">
          <input
            type="number"
            value={state.tabIndex}
            onChange={(e) => setKey("tabIndex")(Number(e.target.value) || 0)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Direction">
          <Segmented
            value={state.dir}
            onChange={(v) => setKey("dir")(v as CheckboxState["dir"])}
            items={[
              { value: "ltr", label: "LTR" },
              { value: "rtl", label: "RTL" },
            ]}
          />
        </LabeledField>
        <LabeledField label="Language">
          <input
            value={state.lang}
            onChange={(e) => setKey("lang")(e.target.value)}
            placeholder="en"
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
