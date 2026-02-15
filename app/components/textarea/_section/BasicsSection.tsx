"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { TextareaState } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: (key: keyof TextareaState) => (val: any) => void;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Content, rows, wrap, and constraints."
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
          <div className="inline-flex items-center gap-2">
            <input
              id="ta-spell"
              type="checkbox"
              checked={state.spellcheck}
              onChange={(e) => setKey("spellcheck")(e.target.checked)}
            />
            <label
              htmlFor="ta-spell"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Spellcheck
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Rows"
            value={state.rows}
            onChange={(v) => setKey("rows")(v)}
            min={1}
            max={20}
            step={1}
          />
          <SizeControl
            label="Cols"
            value={state.cols}
            onChange={(v) => setKey("cols")(v)}
            min={10}
            max={100}
            step={5}
          />
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

        <LabeledField label="Wrap">
          <Segmented
            value={state.wrap}
            onChange={(v) => setKey("wrap")(v)}
            items={[
              { value: "soft", label: "Soft" },
              { value: "hard", label: "Hard" },
              { value: "off", label: "Off" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Resize">
          <Select
            value={state.resize}
            onChange={(v) => setKey("resize")(v)}
            options={[
              { value: "none", label: "None" },
              { value: "both", label: "Both" },
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
