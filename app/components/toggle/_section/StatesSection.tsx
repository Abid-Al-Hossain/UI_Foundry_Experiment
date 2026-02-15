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

export default function StatesSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: (key: keyof ToggleState) => (val: any) => void;
}) {
  return (
    <SectionCard
      title="States & Animation"
      subtitle="Focus, hover, disabled, and transitions."
    >
      <div className="space-y-5">
        {/* Focus */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Focus Ring
          </div>
          <ColorControl
            label="Color"
            palette={PRESET_COLORS}
            value={state.focusRingColor}
            onChange={setKey("focusRingColor")}
          />
          <SizeControl
            label="Width (px)"
            value={state.focusRingWidth}
            onChange={(v) => setKey("focusRingWidth")(v)}
            min={0}
            max={8}
            step={1}
          />
        </div>

        {/* Hover */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Hover
          </div>
          <ColorControl
            label="Track Off BG"
            palette={PRESET_COLORS}
            value={state.hoverTrackOffBg}
            onChange={setKey("hoverTrackOffBg")}
          />
          <ColorControl
            label="Track On BG"
            palette={PRESET_COLORS}
            value={state.hoverTrackOnBg}
            onChange={setKey("hoverTrackOnBg")}
          />
          <SizeControl
            label="Thumb Scale"
            value={state.hoverThumbScale}
            onChange={(v) => setKey("hoverThumbScale")(v)}
            min={1}
            max={1.3}
            step={0.05}
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
              onChange={(v) => setKey("disabledCursor")(v)}
              items={[
                { value: "not-allowed", label: "Not Allowed" },
                { value: "default", label: "Default" },
              ]}
            />
          </LabeledField>
        </div>
      </div>
    </SectionCard>
  );
}
