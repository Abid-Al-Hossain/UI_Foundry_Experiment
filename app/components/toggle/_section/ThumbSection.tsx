"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { ToggleState } from "../types";

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

export default function ThumbSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: (key: keyof ToggleState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Thumb" subtitle="Thumb knob styling.">
      <div className="space-y-4">
        <SizeControl
          label="Size (px)"
          value={state.thumbSize}
          onChange={(v) => setKey("thumbSize")(v)}
          min={12}
          max={40}
          step={1}
        />
        <SizeControl
          label="Border Radius (%)"
          value={state.thumbBorderRadius}
          onChange={(v) => setKey("thumbBorderRadius")(v)}
          min={0}
          max={50}
          step={1}
        />
        <SizeControl
          label="Border Width (px)"
          value={state.thumbBorderWidth}
          onChange={(v) => setKey("thumbBorderWidth")(v)}
          min={0}
          max={4}
          step={1}
        />

        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Off State
          </div>
          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.thumbOffBg}
            onChange={setKey("thumbOffBg")}
          />
          <ColorControl
            label="Border"
            palette={PRESET_COLORS}
            value={state.thumbOffBorder}
            onChange={setKey("thumbOffBorder")}
          />
        </div>

        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            On State
          </div>
          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.thumbOnBg}
            onChange={setKey("thumbOnBg")}
          />
          <ColorControl
            label="Border"
            palette={PRESET_COLORS}
            value={state.thumbOnBorder}
            onChange={setKey("thumbOnBorder")}
          />
        </div>

        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Icon
          </div>
          <LabeledField label="Icon">
            <Segmented
              value={state.thumbIcon}
              onChange={(v) => setKey("thumbIcon")(v)}
              items={[
                { value: "none", label: "None" },
                { value: "check", label: "✓" },
                { value: "cross", label: "✕" },
                { value: "both", label: "Both" },
              ]}
            />
          </LabeledField>
          {state.thumbIcon !== "none" && (
            <>
              <ColorControl
                label="Icon Color"
                palette={PRESET_COLORS}
                value={state.thumbIconColor}
                onChange={setKey("thumbIconColor")}
              />
              <SizeControl
                label="Icon Size (px)"
                value={state.thumbIconSize}
                onChange={(v) => setKey("thumbIconSize")(v)}
                min={8}
                max={24}
                step={1}
              />
            </>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
