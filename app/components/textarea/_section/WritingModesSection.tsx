"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type TextareaSetter, type TextareaState } from "../types";

const PRESET_COLORS = [
  "#334155",
  "#64748b",
  "#94a3b8",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#ffffff",
];

type VariantConfig = Partial<TextareaState>;

const VARIANT_CONFIG: Record<
  TextareaState["variantMode"],
  VariantConfig
> = {
  default: {
    rows: 4,
    minRows: 2,
    maxRows: 12,
    resize: "vertical",
    wrap: "soft",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "normal",
    tabSize: 4,
    charCount: false,
  },
  "comment-reply": {
    rows: 3,
    minRows: 2,
    maxRows: 8,
    resize: "vertical",
    wrap: "soft",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "normal",
    helperText: "Short, conversational replies work best here.",
    charCount: true,
  },
  "message-composer": {
    rows: 5,
    minRows: 3,
    maxRows: 14,
    resize: "vertical",
    wrap: "soft",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "normal",
    helperText: "Ideal for support replies and direct messages.",
    charCount: true,
  },
  "editorial-note": {
    rows: 7,
    minRows: 4,
    maxRows: 20,
    resize: "vertical",
    wrap: "soft",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    wordBreak: "normal",
    lineHeight: 1.75,
    helperText: "Use this for long-form editorial notes and comments.",
    descriptionText: "Readable spacing and wrapping for longer writing.",
    charCount: true,
  },
  "code-editor": {
    rows: 10,
    minRows: 6,
    maxRows: 22,
    resize: "both",
    wrap: "off",
    whiteSpace: "pre",
    overflowWrap: "normal",
    wordBreak: "normal",
    tabSize: 2,
    spellcheck: false,
    helperText: "Monospace-friendly behavior for code or logs.",
    descriptionText: "Preserves whitespace and horizontal overflow.",
    charCount: true,
  },
};

export default function WritingModesSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  const applyVariant = (variant: TextareaState["variantMode"]) => {
    const config = VARIANT_CONFIG[variant];
    setKey("variantMode")(variant);
    (Object.entries(config) as [keyof TextareaState, TextareaState[keyof TextareaState]][]).forEach(
      ([key, value]) => {
        setKey(key)(value);
      },
    );
  };

  return (
    <SectionCard
      title="Writing Modes"
      subtitle="Long-form behavior, wrapping, and purpose-built writing variants."
    >
      <div className="space-y-4">
        <LabeledField label="Variant">
          <Segmented
            value={state.variantMode}
            onChange={(v) =>
              applyVariant(v as TextareaState["variantMode"])
            }
            items={[
              { value: "default", label: "Default" },
              { value: "comment-reply", label: "Reply" },
              { value: "message-composer", label: "Message" },
              { value: "editorial-note", label: "Editorial" },
              { value: "code-editor", label: "Code" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="White Space">
            <Select
              value={state.whiteSpace}
              onChange={(v) =>
                setKey("whiteSpace")(v as TextareaState["whiteSpace"])
              }
              options={[
                { value: "normal", label: "Normal" },
                { value: "pre", label: "Pre" },
                { value: "pre-wrap", label: "Pre Wrap" },
                { value: "pre-line", label: "Pre Line" },
                { value: "nowrap", label: "No Wrap" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Overflow Wrap">
            <Select
              value={state.overflowWrap}
              onChange={(v) =>
                setKey("overflowWrap")(v as TextareaState["overflowWrap"])
              }
              options={[
                { value: "normal", label: "Normal" },
                { value: "break-word", label: "Break Word" },
                { value: "anywhere", label: "Anywhere" },
              ]}
            />
          </LabeledField>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <LabeledField label="Word Break">
            <Select
              value={state.wordBreak}
              onChange={(v) =>
                setKey("wordBreak")(v as TextareaState["wordBreak"])
              }
              options={[
                { value: "normal", label: "Normal" },
                { value: "break-all", label: "Break All" },
                { value: "keep-all", label: "Keep All" },
                { value: "break-word", label: "Break Word" },
              ]}
            />
          </LabeledField>
          <SizeControl
            label="Tab Size"
            value={state.tabSize}
            onChange={(v) => setKey("tabSize")(v)}
            min={1}
            max={8}
            step={1}
          />
        </div>

        <LabeledField label="Description Text">
          <input
            value={state.descriptionText}
            onChange={(e) => setKey("descriptionText")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
        <ColorControl
          label="Description Color"
          palette={PRESET_COLORS}
          value={state.descriptionColor}
          onChange={setKey("descriptionColor")}
        />
      </div>
    </SectionCard>
  );
}
