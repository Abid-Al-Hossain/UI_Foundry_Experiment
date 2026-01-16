"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "../../buttons/action/_section/ColorControl";
import SizeControl from "../../buttons/action/_section/SizeControl";
import { norm } from "../../buttons/action/_utils/colorUtils";

export default function DividerContentSection({
  state,
  setKey,
  setFloat,
}: any) {
  const {
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
  } = state;

  return (
    <SectionCard title="Content" subtitle="Embedded text or icons">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">
            Show Label
          </label>
          <input
            type="checkbox"
            checked={showLabel}
            onChange={(e) => setKey("showLabel")(e.target.checked)}
            className="accent-blue-500 scale-125"
          />
        </div>

        {showLabel && (
          <div className="space-y-4 pl-4 border-l-2 border-slate-700/50">
            <LabeledField label="Text">
              <input
                type="text"
                value={labelText}
                onChange={(e) => setKey("labelText")(e.target.value)}
                className="w-full h-9 px-3 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 outline-none focus:border-blue-500 transition-colors"
              />
            </LabeledField>

            <LabeledField label="Position">
              <Segmented
                value={labelPosition}
                onChange={setKey("labelPosition")}
                items={[
                  { label: "Left", value: "left" },
                  { label: "Center", value: "center" },
                  { label: "Right", value: "right" },
                ]}
              />
            </LabeledField>

            <ColorControl
              title="Text Color"
              palette={["#64748b", "#cbd5e1", "#ffffff", "#000000"]}
              valueText={labelColor}
              setValueText={setKey("labelColor")}
              normalizedHex={norm(labelColor).hex}
              normalizedRgb={norm(labelColor).rgb}
              ok={norm(labelColor).ok}
            />

            <ColorControl
              title="Background Color"
              palette={["transparent", "#ffffff", "#000000", "#1e293b"]}
              valueText={labelBackground}
              setValueText={setKey("labelBackground")}
              normalizedHex={norm(labelBackground).hex}
              normalizedRgb={norm(labelBackground).rgb}
              ok={norm(labelBackground).ok}
            />

            <SizeControl
              label="Padding (px)"
              valueText={String(labelPadding)}
              setValueText={setFloat("labelPadding")}
              min={0}
              max={40}
              step={2}
            />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
