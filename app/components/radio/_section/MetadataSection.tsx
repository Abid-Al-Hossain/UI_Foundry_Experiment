"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import { type RadioState, type RadioSetter } from "../types";

export default function MetadataSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: RadioSetter;
}) {
  return (
    <SectionCard title="Metadata" subtitle="Native group attributes.">
      <div className="space-y-4">
        <LabeledField label="Group ID">
          <input
            value={state.id}
            onChange={(e) => setKey("id")(e.target.value)}
            placeholder="radio-group"
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <LabeledField label="Group Name">
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
            placeholder="Browser title / tooltip"
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
            onChange={(v) => setKey("dir")(v as RadioState["dir"])}
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
