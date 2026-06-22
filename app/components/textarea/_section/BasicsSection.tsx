"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import { type TextareaSetter, type TextareaState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Content, default value, and core field state."
    >
      <div className="space-y-4">
        <LabeledField label="Placeholder">
          <input
            value={state.placeholder}
            onChange={(e) => setKey("placeholder")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>

        <LabeledField label="Default Value">
          <textarea
            value={state.defaultValue}
            onChange={(e) => setKey("defaultValue")(e.target.value)}
            rows={2}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
              resize: "vertical",
            }}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <div className="inline-flex items-center gap-2">
            <input
              id="ta-req"
              type="checkbox"
              checked={state.required}
              onChange={(e) => setKey("required")(e.target.checked)}
            />
            <label
              htmlFor="ta-req"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Required
            </label>
          </div>
          <div className="inline-flex items-center gap-2">
            <input
              id="ta-disabled"
              type="checkbox"
              checked={state.disabled}
              onChange={(e) => setKey("disabled")(e.target.checked)}
            />
            <label
              htmlFor="ta-disabled"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Disabled
            </label>
          </div>
          <div className="inline-flex items-center gap-2">
            <input
              id="ta-readonly"
              type="checkbox"
              checked={state.readOnly}
              onChange={(e) => setKey("readOnly")(e.target.checked)}
            />
            <label
              htmlFor="ta-readonly"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Read Only
            </label>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
