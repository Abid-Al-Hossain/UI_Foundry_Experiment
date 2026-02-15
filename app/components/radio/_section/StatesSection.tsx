"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
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

export default function StatesSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: (key: keyof RadioState) => (val: any) => void;
}) {
  return (
    <SectionCard title="States" subtitle="Focus, hover, and disabled.">
      <div className="space-y-5">
        {/* Focus */}
        <div className="space-y-3">
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
