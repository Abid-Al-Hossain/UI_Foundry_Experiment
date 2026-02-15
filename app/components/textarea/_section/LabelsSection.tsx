"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { TextareaState } from "../types";

const PRESET_COLORS = [
  "#334155",
  "#64748b",
  "#94a3b8",
  "#ef4444",
  "#3b82f6",
  "#000000",
  "#ffffff",
];

export default function LabelsSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: (key: keyof TextareaState) => (val: any) => void;
}) {
  return (
    <SectionCard
      title="Labels & Messages"
      subtitle="Label, helper, error, and char count."
    >
      <div className="space-y-4">
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
        <LabeledField label="Position">
          <Segmented
            value={state.labelPosition}
            onChange={(v) => setKey("labelPosition")(v)}
            items={[
              { value: "top", label: "Top" },
              { value: "left", label: "Left" },
              { value: "floating", label: "Float" },
              { value: "hidden", label: "Hidden" },
            ]}
          />
        </LabeledField>
        <ColorControl
          label="Label Color"
          palette={PRESET_COLORS}
          value={state.labelColor}
          onChange={setKey("labelColor")}
        />
        <SizeControl
          label="Font Size (px)"
          value={state.labelFontSize}
          onChange={(v) => setKey("labelFontSize")(v)}
          min={10}
          max={24}
          step={1}
        />
        <LabeledField label="Font Weight">
          <Select
            value={String(state.labelFontWeight)}
            onChange={(v) => setKey("labelFontWeight")(Number(v))}
            options={[
              { value: "400", label: "Regular" },
              { value: "500", label: "Medium" },
              { value: "600", label: "Semi Bold" },
              { value: "700", label: "Bold" },
            ]}
          />
        </LabeledField>
        <SizeControl
          label="Gap (px)"
          value={state.labelGap}
          onChange={(v) => setKey("labelGap")(v)}
          min={0}
          max={16}
          step={1}
        />
        <div className="flex items-center gap-2">
          <input
            id="ta-show-req"
            type="checkbox"
            checked={state.showRequired}
            onChange={(e) => setKey("showRequired")(e.target.checked)}
          />
          <label
            htmlFor="ta-show-req"
            className="text-xs uf-clickable"
            style={{ color: "var(--muted)" }}
          >
            Show Required Indicator
          </label>
        </div>
        {state.showRequired && (
          <ColorControl
            label="Required Color"
            palette={PRESET_COLORS}
            value={state.requiredColor}
            onChange={setKey("requiredColor")}
          />
        )}
        <div className="flex items-center gap-2">
          <input
            id="ta-char"
            type="checkbox"
            checked={state.charCount}
            onChange={(e) => setKey("charCount")(e.target.checked)}
          />
          <label
            htmlFor="ta-char"
            className="text-xs uf-clickable"
            style={{ color: "var(--muted)" }}
          >
            Show Character Count
          </label>
        </div>
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Messages
          </div>
          <LabeledField label="Helper Text">
            <input
              value={state.helperText}
              onChange={(e) => setKey("helperText")(e.target.value)}
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
            label="Helper Color"
            palette={PRESET_COLORS}
            value={state.helperColor}
            onChange={setKey("helperColor")}
          />
          <LabeledField label="Error Text">
            <input
              value={state.errorText}
              onChange={(e) => setKey("errorText")(e.target.value)}
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
            label="Error Color"
            palette={PRESET_COLORS}
            value={state.errorColor}
            onChange={setKey("errorColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
