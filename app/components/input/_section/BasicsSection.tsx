"use client";

import React from "react";
import { SectionCard, LabeledField } from "../../buttons/action/_section/ui";
import Select from "@/app/components/controls/input/Select";
import { TextInputState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: (key: keyof TextInputState) => (val: any) => void;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Type, placeholder, value, and constraints."
    >
      <div className="space-y-4">
        <LabeledField label="Input Type">
          <Select
            value={state.inputType}
            onChange={(v) => setKey("inputType")(v)}
            options={[
              { value: "text", label: "Text" },
              { value: "password", label: "Password" },
              { value: "email", label: "Email" },
              { value: "number", label: "Number" },
              { value: "tel", label: "Telephone" },
              { value: "url", label: "URL" },
              { value: "search", label: "Search" },
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

        <LabeledField label="Name Attribute">
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

        <div className="grid grid-cols-2 gap-3">
          <LabeledField
            label="Max Length"
            hint={state.maxLength === 0 ? "off" : `${state.maxLength}`}
          >
            <input
              type="number"
              min={0}
              value={state.maxLength}
              onChange={(e) => setKey("maxLength")(Number(e.target.value))}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
          <LabeledField
            label="Min Length"
            hint={state.minLength === 0 ? "off" : `${state.minLength}`}
          >
            <input
              type="number"
              min={0}
              value={state.minLength}
              onChange={(e) => setKey("minLength")(Number(e.target.value))}
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

        <LabeledField label="Pattern (regex)" hint="e.g. [A-Za-z]+">
          <input
            value={state.pattern}
            onChange={(e) => setKey("pattern")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none font-mono"
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
