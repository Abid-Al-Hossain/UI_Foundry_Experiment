"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { type TextareaSetter, type TextareaState } from "../types";

export default function FieldAttributesSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Field Attributes"
      subtitle="Platform attributes, multiline sizing, wrap, and resize behavior."
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
              onChange={(v) => setKey("dir")(v as TextareaState["dir"])}
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
              setKey("autocomplete")(v as TextareaState["autocomplete"])
            }
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Input Mode">
            <Select
              value={state.inputMode}
              onChange={(v) =>
                setKey("inputMode")(v as TextareaState["inputMode"])
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
                setKey("enterKeyHint")(v as TextareaState["enterKeyHint"])
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
                setKey("autoCapitalize")(v as TextareaState["autoCapitalize"])
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
                setKey("autoCorrect")(v as TextareaState["autoCorrect"])
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
            id="textarea-spellcheck-field"
            type="checkbox"
            checked={state.spellcheck}
            onChange={(e) => setKey("spellcheck")(e.target.checked)}
          />
          <label
            htmlFor="textarea-spellcheck-field"
            className="text-sm uf-clickable"
            style={{ color: "var(--text)" }}
          >
            Spellcheck
          </label>
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
            label="Min Rows"
            value={state.minRows}
            onChange={(v) => setKey("minRows")(v)}
            min={1}
            max={24}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label="Max Rows"
            value={state.maxRows}
            onChange={(v) => setKey("maxRows")(v)}
            min={state.minRows}
            max={30}
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
            onChange={(v) => setKey("wrap")(v as TextareaState["wrap"])}
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
            onChange={(v) => setKey("resize")(v as TextareaState["resize"])}
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
