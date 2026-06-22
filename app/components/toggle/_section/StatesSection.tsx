"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { type ToggleState, type ToggleKeyUpdater } from "../types";

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
  setKey: ToggleKeyUpdater;
}) {
  return (
    <SectionCard
      title="States"
      subtitle="Hover and disabled behavior."
    >
      <div className="space-y-5">
        <div className="space-y-3">
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
              onChange={(v) =>
                setKey("disabledCursor")(v as ToggleState["disabledCursor"])
              }
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
            label="Disabled Track"
            palette={PRESET_COLORS}
            value={state.disabledTrackBg}
            onChange={setKey("disabledTrackBg")}
          />
          <ColorControl
            label="Disabled Thumb"
            palette={PRESET_COLORS}
            value={state.disabledThumbBg}
            onChange={setKey("disabledThumbBg")}
          />
          <ColorControl
            label="Disabled Text"
            palette={PRESET_COLORS}
            value={state.disabledTextColor}
            onChange={setKey("disabledTextColor")}
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
          <ColorControl
            label="Error Track"
            palette={PRESET_COLORS}
            value={state.errorTrackBg}
            onChange={setKey("errorTrackBg")}
          />
          <ColorControl
            label="Error Thumb"
            palette={PRESET_COLORS}
            value={state.errorThumbBg}
            onChange={setKey("errorThumbBg")}
          />
        </div>

        {/* Loading */}
        <div className="pt-4 border-t border-slate-700/50 space-y-3">
          <div
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            Loading
          </div>
          <LabeledField label="Enabled">
            <Segmented
              value={state.loadingEnabled ? "true" : "false"}
              onChange={(v) => setKey("loadingEnabled")(v === "true")}
              items={[
                { value: "false", label: "Off" },
                { value: "true", label: "On" },
              ]}
            />
          </LabeledField>
          <LabeledField label="Animation">
            <Segmented
              value={state.loadingAnimation}
              onChange={(v) => setKey("loadingAnimation")(v as ToggleState["loadingAnimation"])}
              items={[
                { value: "spin", label: "Spin" },
                { value: "pulse", label: "Pulse" },
                { value: "none", label: "None" },
              ]}
            />
          </LabeledField>
        </div>
      </div>
    </SectionCard>
  );
}
