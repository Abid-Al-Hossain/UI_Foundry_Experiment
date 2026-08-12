"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { type TextareaSetter, type TextareaState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

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
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Labels & Messages"
      subtitle="Label composition, supporting copy, validation, and counters."
    >
      <div className="space-y-4">
        <LabeledField label="Label Text">
          <Input
            value={state.labelText}
            onNativeChange={(e) => setKey("labelText")(e.target.value)}
           />
        </LabeledField>
        <LabeledField label="Position">
          <Segmented
            value={state.labelPosition}
            onChange={(v) =>
              setKey("labelPosition")(v as TextareaState["labelPosition"])
            }
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
            onChange={(v) =>
              setKey("labelFontWeight")(Number(v) as TextareaState["labelFontWeight"])
            }
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
        <Switch
          label={<>Show Required Indicator</>}
          id="ta-show-req"
          checked={state.showRequired}
          onChange={(checked) => setKey("showRequired")(checked)}
        />
        {state.showRequired && (
          <ColorControl
            label="Required Color"
            palette={PRESET_COLORS}
            value={state.requiredColor}
            onChange={setKey("requiredColor")}
          />
        )}
        <Switch
          label={<>Show Character Count</>}
          id="ta-char"
          checked={state.charCount}
          onChange={(checked) => setKey("charCount")(checked)}
        />
        {state.charCount && (
          <Select
            label="Character Count Position"
            value={state.characterCountPosition}
            options={["below", "above", "inside", "floating"]}
            onChange={(value) => setKey("characterCountPosition")(value as TextareaState["characterCountPosition"])}
          />
        )}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Messages
          </div>
          <LabeledField label="Helper Text">
            <Input
              value={state.helperText}
              onNativeChange={(e) => setKey("helperText")(e.target.value)}
             />
          </LabeledField>
          <ColorControl
            label="Helper Color"
            palette={PRESET_COLORS}
            value={state.helperColor}
            onChange={setKey("helperColor")}
          />
          <LabeledField label="Description Text">
            <Input
              value={state.descriptionText}
              onNativeChange={(e) => setKey("descriptionText")(e.target.value)}
             />
          </LabeledField>
          <ColorControl
            label="Description Color"
            palette={PRESET_COLORS}
            value={state.descriptionColor}
            onChange={setKey("descriptionColor")}
          />
          <LabeledField label="Error Text">
            <Input
              value={state.errorText}
              onNativeChange={(e) => setKey("errorText")(e.target.value)}
             />
          </LabeledField>
          <ColorControl
            label="Error Color"
            palette={PRESET_COLORS}
            value={state.errorColor}
            onChange={setKey("errorColor")}
          />
          <LabeledField label="Success Text">
            <Input
              value={state.successText}
              onNativeChange={(e) => setKey("successText")(e.target.value)}
             />
          </LabeledField>
          <ColorControl
            label="Success Color"
            palette={PRESET_COLORS}
            value={state.successColor}
            onChange={setKey("successColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
