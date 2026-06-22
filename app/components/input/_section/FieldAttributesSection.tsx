"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import { type TextInputSetter, type TextInputState } from "../types";

export default function FieldAttributesSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Field Attributes"
      subtitle="Platform attributes, keyboard hints, and numeric constraints."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="ID Attribute">
            <input
              value={state.id}
              onChange={(e) => setKey("id")(e.target.value)}
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
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Title">
            <input
              value={state.title}
              onChange={(e) => setKey("title")(e.target.value)}
              placeholder="Helpful browser tooltip"
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
              onChange={(e) => setKey("tabIndex")(Number(e.target.value))}
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

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Direction">
            <Select
              value={state.dir}
              onChange={(v) => setKey("dir")(v as TextInputState["dir"])}
              options={[
                { value: "auto", label: "Auto" },
                { value: "ltr", label: "LTR" },
                { value: "rtl", label: "RTL" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Language">
            <input
              value={state.lang}
              onChange={(e) => setKey("lang")(e.target.value)}
              placeholder="en-US"
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

        <LabeledField label="Autocomplete">
          <Select
            value={state.autocomplete}
            onChange={(v) =>
              setKey("autocomplete")(v as TextInputState["autocomplete"])
            }
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

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Input Mode">
            <Select
              value={state.inputmode}
              onChange={(v) =>
                setKey("inputmode")(v as TextInputState["inputmode"])
              }
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
          <LabeledField label="Enter Key Hint">
            <Select
              value={state.enterKeyHint}
              onChange={(v) =>
                setKey("enterKeyHint")(v as TextInputState["enterKeyHint"])
              }
              options={[
                { value: "enter", label: "Enter" },
                { value: "done", label: "Done" },
                { value: "go", label: "Go" },
                { value: "next", label: "Next" },
                { value: "previous", label: "Previous" },
                { value: "search", label: "Search" },
                { value: "send", label: "Send" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Auto Capitalize">
            <Select
              value={state.autoCapitalize}
              onChange={(v) =>
                setKey("autoCapitalize")(v as TextInputState["autoCapitalize"])
              }
              options={[
                { value: "sentences", label: "Sentences" },
                { value: "words", label: "Words" },
                { value: "characters", label: "Characters" },
                { value: "none", label: "None" },
                { value: "off", label: "Off" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Auto Correct">
            <Select
              value={state.autoCorrect}
              onChange={(v) =>
                setKey("autoCorrect")(v as TextInputState["autoCorrect"])
              }
              options={[
                { value: "off", label: "Off" },
                { value: "on", label: "On" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="input-spellcheck"
            type="checkbox"
            checked={state.spellCheck}
            onChange={(e) => setKey("spellCheck")(e.target.checked)}
          />
          <label
            htmlFor="input-spellcheck"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Spellcheck
          </label>
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

        {state.inputType === "number" && (
          <div className="grid grid-cols-3 gap-3">
            <LabeledField label="Min">
              <input
                value={state.minValue}
                onChange={(e) => setKey("minValue")(e.target.value)}
                placeholder="0"
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>
            <LabeledField label="Max">
              <input
                value={state.maxValue}
                onChange={(e) => setKey("maxValue")(e.target.value)}
                placeholder="100"
                className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </LabeledField>
            <LabeledField label="Step">
              <input
                value={state.stepValue}
                onChange={(e) => setKey("stepValue")(e.target.value)}
                placeholder="1"
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
        )}
      </div>
    </SectionCard>
  );
}
