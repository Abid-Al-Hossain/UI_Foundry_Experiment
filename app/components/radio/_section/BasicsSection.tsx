"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import { RadioState, RadioOption, RadioSetter } from "../types";

export default function BasicsSection({
  state,
  setKey,
  updateState,
}: {
  state: RadioState;
  setKey: RadioSetter;
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
      selectedValue: (() => {
        const removedValue = prev.options[idx]?.value;
        if (prev.selectedValue !== removedValue) return prev.selectedValue;

        const fallback =
          prev.options[idx + 1]?.value ??
          prev.options[idx - 1]?.value ??
          prev.options.filter((_, i) => i !== idx)[0]?.value ??
          "";
        return fallback;
      })(),
    }));
  };
  const updateOption = <K extends keyof RadioOption>(
    idx: number,
    key: K,
    val: RadioOption[K],
  ) => {
    if (!updateState) return;
    updateState((prev) => {
      const options = prev.options.map((o, i) =>
        i === idx ? { ...o, [key]: val } : o,
      );
      let selectedValue = prev.selectedValue;
      if (key === "value" && prev.selectedValue === prev.options[idx]?.value) {
        selectedValue = String(val);
      }
      return {
        ...prev,
        options,
        selectedValue,
      };
    });
  };

  return (
    <SectionCard title="Basics" subtitle="Group configuration and options.">
      <div className="space-y-4">
        <LabeledField label="Orientation">
          <Segmented
            value={state.orientation}
            onChange={(v) =>
              setKey("orientation")(v as RadioState["orientation"])
            }
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
            onChange={(v) =>
              setKey("labelPosition")(v as RadioState["labelPosition"])
            }
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
                data-native-anatomy="radio-option-selector"
                name="opts-preview"
                checked={state.selectedValue === opt.value}
                onChange={() => setKey("selectedValue")(opt.value)}
              />
              <Input
                value={opt.value}
                onChange={(value) => updateOption(idx, "value", value)}
                className="w-24 rounded border px-2 py-1 text-xs outline-none font-mono"
                placeholder="value"
              />
              <Input
                value={opt.label}
                onChange={(value) => updateOption(idx, "label", value)}
                className="flex-1 rounded border px-2 py-1 text-xs outline-none"
                placeholder="label"
              />
              <Switch
                aria-label={`Disable ${opt.label || `option ${idx + 1}`}`}
                checked={!!opt.disabled}
                onChange={(checked) => updateOption(idx, "disabled", checked)}
              />
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
