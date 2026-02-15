"use client";

import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
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

export default function TrackSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: (key: keyof ToggleState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Track" subtitle="Track dimensions and colors.">
      <div className="space-y-4">
        <SizeControl
          label="Width (px)"
          value={state.trackWidth}
          onChange={(v) => setKey("trackWidth")(v)}
          min={32}
          max={80}
          step={2}
        />
        <SizeControl
          label="Height (px)"
          value={state.trackHeight}
          onChange={(v) => setKey("trackHeight")(v)}
          min={16}
          max={44}
          step={2}
        />
        <SizeControl
          label="Border Radius (px)"
          value={state.trackBorderRadius}
          onChange={(v) => setKey("trackBorderRadius")(v)}
          min={0}
          max={999}
          step={1}
        />
        <SizeControl
          label="Border Width (px)"
          value={state.trackBorderWidth}
          onChange={(v) => setKey("trackBorderWidth")(v)}
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
            value={state.trackOffBg}
            onChange={setKey("trackOffBg")}
          />
          <ColorControl
            label="Border"
            palette={PRESET_COLORS}
            value={state.trackOffBorder}
            onChange={setKey("trackOffBorder")}
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
            value={state.trackOnBg}
            onChange={setKey("trackOnBg")}
          />
          <ColorControl
            label="Border"
            palette={PRESET_COLORS}
            value={state.trackOnBorder}
            onChange={setKey("trackOnBorder")}
          />
        </div>
      </div>
    </SectionCard>
  );
}
