"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";
import Input from "@/app/components/controls/input/Input";

export default function DividerContentSection({ state, setKey }: any) {
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
        <Switch
          label="Show Label"
          checked={showLabel}
          onChange={(v) => setKey("showLabel")(v)}
        />

        {showLabel && (
          <div className="space-y-4 pl-4 border-l-2 border-slate-700/50">
            <LabeledField label="Text">
              <Input
                value={labelText}
                onChange={(e) => setKey("labelText")(e.target.value)}
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
              label="Text Color"
              palette={["#64748b", "#cbd5e1", "#ffffff", "#000000"]}
              value={labelColor}
              onChange={setKey("labelColor")}
            />

            <ColorControl
              label="Background Color"
              palette={["transparent", "#ffffff", "#000000", "#1e293b"]}
              value={labelBackground}
              onChange={setKey("labelBackground")}
            />

            <SizeControl
              label="Padding (px)"
              value={labelPadding}
              onChange={(v) => setKey("labelPadding")(v)}
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
