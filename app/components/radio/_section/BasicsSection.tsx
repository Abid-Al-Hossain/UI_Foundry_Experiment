"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { RadioState, RadioOption } from "../types";

export default function BasicsSection({
  state,
  setKey,
  updateState,
}: {
  state: RadioState;
  setKey: (key: keyof RadioState) => (val: any) => void;
  updateState?: (fn: (prev: RadioState) => RadioState) => void;
}) {
  const addOption = () => {
    if (!updateState) return;
    updateState((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        {
          value: `option-${prev.options.length + 1}`,
          label: `Option ${prev.options.length + 1}`,
        },
      ],
    }));
  };
  const removeOption = (idx: number) => {
    if (!updateState) return;
    updateState((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== idx),
    }));
  };
  const updateOption = (idx: number, key: keyof RadioOption, val: any) => {
    if (!updateState) return;
    updateState((prev) => ({
      ...prev,
      options: prev.options.map((o, i) =>
        i === idx ? { ...o, [key]: val } : o,
      ),
    }));
  };

  return (
    <SectionCard title="Basics" subtitle="Group configuration and options.">
      <div className="space-y-4">
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
        <LabeledField label="Orientation">
          <Segmented
            value={state.orientation}
            onChange={(v) => setKey("orientation")(v)}
            items={[
              { value: "vertical", label: "Vertical" },
              { value: "horizontal", label: "Horizontal" },
            ]}
          />
        </LabeledField>
        <SizeControl
          label="Gap (px)"
          value={state.gap}
          onChange={(v) => setKey("gap")(v)}
          min={0}
          max={48}
          step={2}
        />
        <LabeledField label="Label Position">
          <Segmented
            value={state.labelPosition}
            onChange={(v) => setKey("labelPosition")(v)}
            items={[
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
          />
        </LabeledField>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Options
            </div>
            <button
              type="button"
              onClick={addOption}
              className="rounded-lg px-3 py-1 text-xs font-semibold uf-clickable"
              style={{ background: "var(--primary)", color: "white" }}
            >
              + Add
            </button>
          </div>
          {state.options.map((opt, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-xl border px-3 py-2"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
              }}
            >
              <input
                type="radio"
                name="opts-preview"
                checked={state.selectedValue === opt.value}
                onChange={() => setKey("selectedValue")(opt.value)}
              />
              <input
                value={opt.value}
                onChange={(e) => updateOption(idx, "value", e.target.value)}
                className="w-24 rounded border px-2 py-1 text-xs outline-none font-mono"
                style={{
                  borderColor: "var(--border)",
                  background: "transparent",
                  color: "var(--text)",
                }}
                placeholder="value"
              />
              <input
                value={opt.label}
                onChange={(e) => updateOption(idx, "label", e.target.value)}
                className="flex-1 rounded border px-2 py-1 text-xs outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "transparent",
                  color: "var(--text)",
                }}
                placeholder="label"
              />
              <label
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--muted)" }}
              >
                <input
                  type="checkbox"
                  checked={!!opt.disabled}
                  onChange={(e) =>
                    updateOption(idx, "disabled", e.target.checked)
                  }
                />{" "}
                off
              </label>
              {state.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(idx)}
                  className="text-xs uf-clickable"
                  style={{ color: "var(--muted)" }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
