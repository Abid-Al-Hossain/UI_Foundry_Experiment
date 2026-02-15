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
  "#cbd5e1",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#6366f1",
  "#ec4899",
  "#000000",
  "#ffffff",
];

export default function StatesSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: (key: keyof TextareaState) => (val: any) => void;
}) {
  return (
    <SectionCard title="States" subtitle="Focus, hover, and disabled states.">
      <div className="space-y-5">
        <div className="space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Focus
          </div>
          <ColorControl
            label="Border Color"
            palette={PRESET_COLORS}
            value={state.focusBorderColor}
            onChange={setKey("focusBorderColor")}
          />
          <SizeControl
            label="Border Width (px)"
            value={state.focusBorderWidth}
            onChange={(v) => setKey("focusBorderWidth")(v)}
            min={0}
            max={6}
            step={1}
          />
          <SizeControl
            label="Box Shadow Spread (px)"
            value={state.focusBoxShadowSpread}
            onChange={(v) => setKey("focusBoxShadowSpread")(v)}
            min={0}
            max={12}
            step={1}
          />
          <ColorControl
            label="Box Shadow Color"
            palette={PRESET_COLORS}
            value={state.focusBoxShadowColor}
            onChange={setKey("focusBoxShadowColor")}
          />
          <LabeledField label="Outline Style">
            <Select
              value={state.focusOutlineStyle}
              onChange={(v) => setKey("focusOutlineStyle")(v)}
              options={[
                { value: "none", label: "None" },
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]}
            />
          </LabeledField>
          {state.focusOutlineStyle !== "none" && (
            <>
              <SizeControl
                label="Outline Width (px)"
                value={state.focusOutlineWidth}
                onChange={(v) => setKey("focusOutlineWidth")(v)}
                min={0}
                max={6}
                step={1}
              />
              <ColorControl
                label="Outline Color"
                palette={PRESET_COLORS}
                value={state.focusOutlineColor}
                onChange={setKey("focusOutlineColor")}
              />
              <SizeControl
                label="Outline Offset (px)"
                value={state.focusOutlineOffset}
                onChange={(v) => setKey("focusOutlineOffset")(v)}
                min={0}
                max={8}
                step={1}
              />
            </>
          )}
          <ColorControl
            label="BG Color"
            palette={PRESET_COLORS}
            value={state.focusBackgroundColor}
            onChange={setKey("focusBackgroundColor")}
          />
        </div>
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Hover
          </div>
          <ColorControl
            label="Border Color"
            palette={PRESET_COLORS}
            value={state.hoverBorderColor}
            onChange={setKey("hoverBorderColor")}
          />
          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.hoverBackgroundColor}
            onChange={setKey("hoverBackgroundColor")}
          />
          <SizeControl
            label="Border Width (px)"
            value={state.hoverBorderWidth}
            onChange={(v) => setKey("hoverBorderWidth")(v)}
            min={0}
            max={6}
            step={1}
          />
        </div>
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Disabled
          </div>
          <SizeControl
            label="Opacity"
            value={state.disabledOpacity}
            onChange={(v) => setKey("disabledOpacity")(v)}
            min={0}
            max={1}
            step={0.05}
          />
          <LabeledField label="Cursor">
            <Segmented
              value={state.disabledCursor}
              onChange={(v) => setKey("disabledCursor")(v)}
              items={[
                { value: "not-allowed", label: "Not Allowed" },
                { value: "default", label: "Default" },
              ]}
            />
          </LabeledField>
          <div className="flex items-center gap-2">
            <input
              id="ta-dis-cust"
              type="checkbox"
              checked={state.disabledUseCustomColors}
              onChange={(e) =>
                setKey("disabledUseCustomColors")(e.target.checked)
              }
            />
            <label
              htmlFor="ta-dis-cust"
              className="text-xs uf-clickable"
              style={{ color: "var(--muted)" }}
            >
              Custom Disabled Colors
            </label>
          </div>
          {state.disabledUseCustomColors && (
            <>
              <ColorControl
                label="Background"
                palette={PRESET_COLORS}
                value={state.disabledBackgroundColor}
                onChange={setKey("disabledBackgroundColor")}
              />
              <ColorControl
                label="Text"
                palette={PRESET_COLORS}
                value={state.disabledTextColor}
                onChange={setKey("disabledTextColor")}
              />
              <ColorControl
                label="Border"
                palette={PRESET_COLORS}
                value={state.disabledBorderColor}
                onChange={setKey("disabledBorderColor")}
              />
            </>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
