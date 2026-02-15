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
import { RadioState } from "../types";

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

import BorderControl from "@/app/components/controls/layout/BorderControl";

export default function StylingSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: (key: keyof RadioState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Appearance" subtitle="Radio circle and dot indicator.">
      <div className="space-y-5">
        {/* Outer Circle */}
        <div className="space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Outer Circle
          </div>
          <SizeControl
            label="Size (px)"
            value={state.outerSize}
            onChange={(v) => setKey("outerSize")(v)}
            min={14}
            max={40}
            step={1}
          />

          <BorderControl
            width={state.outerBorderWidth}
            setWidth={(v) => setKey("outerBorderWidth")(v)}
            style={state.outerBorderStyle}
            setStyle={(v) => setKey("outerBorderStyle")(v)}
            color={state.outerBorderColor}
            setColor={setKey("outerBorderColor")}
            palette={PRESET_COLORS}
          />

          <ColorControl
            label="Background"
            palette={PRESET_COLORS}
            value={state.outerBgColor}
            onChange={setKey("outerBgColor")}
          />
        </div>

        {/* Selected State */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Selected State
          </div>
          <ColorControl
            label="Border Color"
            palette={PRESET_COLORS}
            value={state.selectedOuterBorderColor}
            onChange={setKey("selectedOuterBorderColor")}
          />
          <SizeControl
            label="Dot Size (px)"
            value={state.dotSize}
            onChange={(v) => setKey("dotSize")(v)}
            min={4}
            max={30}
            step={1}
          />
          <ColorControl
            label="Dot Color"
            palette={PRESET_COLORS}
            value={state.dotColor}
            onChange={setKey("dotColor")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
