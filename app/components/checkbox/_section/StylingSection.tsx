"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import BorderControl from "@/app/components/controls/layout/BorderControl";
import { CheckboxState } from "../types";

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

export default function StylingSection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: (key: keyof CheckboxState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Appearance" subtitle="Box styling and checkmark.">
      <div className="space-y-5">
        {/* Box */}
        <div className="space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Box
          </div>
          <SizeControl
            label="Box Size (px)"
            value={state.boxSize}
            onChange={(v) => setKey("boxSize")(v)}
            min={12}
            max={48}
            step={1}
          />
          <SizeControl
            label="Border Radius (px)"
            value={state.boxBorderRadius}
            onChange={(v) => setKey("boxBorderRadius")(v)}
            min={0}
            max={24}
            step={1}
          />

          <BorderControl
            width={state.boxBorderWidth}
            setWidth={(v) => setKey("boxBorderWidth")(v)}
            style={state.boxBorderStyle}
            setStyle={(v) => setKey("boxBorderStyle")(v)}
            color={state.boxBorderColor}
            setColor={setKey("boxBorderColor")}
            palette={PRESET_COLORS}
          />

          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.boxBgColor}
            onChange={setKey("boxBgColor")}
          />
        </div>

        {/* Checked */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Checked State
          </div>
          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.checkedBgColor}
            onChange={setKey("checkedBgColor")}
          />
          <ColorControl
            label="Border Color"
            palette={PRESET_COLORS}
            value={state.checkedBorderColor}
            onChange={setKey("checkedBorderColor")}
          />
          <ColorControl
            label="Checkmark Color"
            palette={PRESET_COLORS}
            value={state.checkmarkColor}
            onChange={setKey("checkmarkColor")}
          />
          <LabeledField label="Checkmark Style">
            <Segmented
              value={state.checkmarkStyle}
              onChange={(v) => setKey("checkmarkStyle")(v)}
              items={[
                { value: "check", label: "✓" },
                { value: "cross", label: "✕" },
                { value: "dash", label: "—" },
                { value: "custom", label: "SVG" },
              ]}
            />
          </LabeledField>
          <SizeControl
            label="Checkmark Size (px)"
            value={state.checkmarkSize}
            onChange={(v) => setKey("checkmarkSize")(v)}
            min={8}
            max={36}
            step={1}
          />
          <SizeControl
            label="Stroke Width"
            value={state.checkmarkStrokeWidth}
            onChange={(v) => setKey("checkmarkStrokeWidth")(v)}
            min={1}
            max={6}
            step={0.5}
          />
        </div>
      </div>
    </SectionCard>
  );
}
