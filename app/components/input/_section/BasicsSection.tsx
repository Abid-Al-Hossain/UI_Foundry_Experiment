"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import { type TextInputSetter, type TextInputState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Type, content, and core field state."
    >
      <div className="space-y-4">
        <LabeledField label="Input Type">
          <Select
            value={state.inputType}
            onChange={(v) => setKey("inputType")(v as TextInputState["inputType"])}
            options={[
              { value: "text", label: "Text" },
              { value: "password", label: "Password" },
              { value: "email", label: "Email" },
              { value: "number", label: "Number" },
              { value: "tel", label: "Telephone" },
              { value: "url", label: "URL" },
              { value: "search", label: "Search" },
              { value: "date", label: "Date" },
              { value: "time", label: "Time" },
              { value: "datetime-local", label: "Date & Time" },
              { value: "month", label: "Month" },
              { value: "week", label: "Week" },
              { value: "color", label: "Color" },
              { value: "range", label: "Range" },
            ]}
          />
        </LabeledField>

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
          <input
            value={state.defaultValue}
            onChange={(e) => setKey("defaultValue")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>

        <div className="grid grid-cols-3 gap-3">
          <div className="inline-flex items-center gap-2">
            <input
              id="input-required"
              type="checkbox"
              checked={state.required}
              onChange={(e) => setKey("required")(e.target.checked)}
            />
            <label
              htmlFor="input-required"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Required
            </label>
          </div>
          <div className="inline-flex items-center gap-2">
            <input
              id="input-disabled"
              type="checkbox"
              checked={state.disabled}
              onChange={(e) => setKey("disabled")(e.target.checked)}
            />
            <label
              htmlFor="input-disabled"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Disabled
            </label>
          </div>
          <div className="inline-flex items-center gap-2">
            <input
              id="input-readonly"
              type="checkbox"
              checked={state.readOnly}
              onChange={(e) => setKey("readOnly")(e.target.checked)}
            />
            <label
              htmlFor="input-readonly"
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
