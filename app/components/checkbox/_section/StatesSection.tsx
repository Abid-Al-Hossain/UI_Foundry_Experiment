"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type CheckboxState, type CheckboxSetter } from "../types";

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
  state: CheckboxState;
  setKey: CheckboxSetter;
}) {
  return (
    <SectionCard title="States" subtitle="Hover and disabled behavior.">
      <div className="space-y-5">
        <div className="space-y-3">
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
            value={state.hoverBgColor}
            onChange={setKey("hoverBgColor")}
          />
          <ColorControl
            label="Checked Hover BG"
            palette={PRESET_COLORS}
            value={state.hoverCheckedBgColor}
            onChange={setKey("hoverCheckedBgColor")}
          />
          <ColorControl
            label="Checked Hover Border"
            palette={PRESET_COLORS}
            value={state.hoverCheckedBorderColor}
            onChange={setKey("hoverCheckedBorderColor")}
          />
        </div>

        {/* Disabled */}
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
              onChange={(v) => setKey("disabledCursor")(v as CheckboxState["disabledCursor"])}
              items={[
                { value: "not-allowed", label: "Not Allowed" },
                { value: "default", label: "Default" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Use Custom Colors">
            <Segmented
              value={state.disabledUseCustomColors ? "true" : "false"}
              onChange={(v) => setKey("disabledUseCustomColors")(v === "true")}
              items={[
                { value: "false", label: "Off" },
                { value: "true", label: "On" },
              ]}
            />
          </LabeledField>
          <ColorControl
            label="Disabled Background"
            palette={PRESET_COLORS}
            value={state.disabledBgColor}
            onChange={setKey("disabledBgColor")}
          />
          <ColorControl
            label="Disabled Text"
            palette={PRESET_COLORS}
            value={state.disabledTextColor}
            onChange={setKey("disabledTextColor")}
          />
          <ColorControl
            label="Disabled Border"
            palette={PRESET_COLORS}
            value={state.disabledBorderColor}
            onChange={setKey("disabledBorderColor")}
          />
        </div>

        {/* Error */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Validation
          </div>
          <LabeledField label="Invalid (aria-invalid)">
            <Segmented
              value={state.ariaInvalid ? "true" : "false"}
              onChange={(v) => setKey("ariaInvalid")(v === "true")}
              items={[
                { value: "false", label: "No" },
                { value: "true", label: "Yes" },
              ]}
            />
          </LabeledField>
          <ColorControl
            label="Error Border"
            palette={PRESET_COLORS}
            value={state.errorBorderColor}
            onChange={setKey("errorBorderColor")}
          />
          <ColorControl
            label="Error Background"
            palette={PRESET_COLORS}
            value={state.errorBgColor}
            onChange={setKey("errorBgColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
