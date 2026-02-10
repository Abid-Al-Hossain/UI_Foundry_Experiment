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
import Select from "@/app/components/controls/input/Select";

export default function DividerContentSection({ state, setKey }: any) {
  const {
    showLabel,
    labelText,
    labelPosition,
    labelBackground,
    labelColor,
    labelPadding,
    contentType,
    iconName,
    iconSize,
    fontSize,
    fontWeight,
    labelTransform,
    letterSpacing,
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
            <LabeledField label="Content Type">
              <Segmented
                value={contentType}
                onChange={setKey("contentType")}
                items={[
                  { label: "Text", value: "text" },
                  { label: "Icon", value: "icon" },
                ]}
              />
            </LabeledField>

            {contentType === "text" ? (
              <>
                <LabeledField label="Text">
                  <Input
                    value={labelText}
                    onChange={(e) => setKey("labelText")(e.target.value)}
                  />
                </LabeledField>

                <div className="grid grid-cols-2 gap-4">
                  <SizeControl
                    label="Font Size"
                    value={fontSize}
                    onChange={setKey("fontSize")}
                    min={10}
                    max={32}
                    step={1}
                  />
                  <SizeControl
                    label="Spacing"
                    value={letterSpacing}
                    onChange={setKey("letterSpacing")}
                    min={-2}
                    max={10}
                    step={0.5}
                  />
                </div>

                <LabeledField label="Transform">
                  <Segmented
                    value={labelTransform}
                    onChange={setKey("labelTransform")}
                    items={[
                      { label: "None", value: "none" },
                      { label: "ABC", value: "uppercase" },
                      { label: "abc", value: "lowercase" },
                    ]}
                  />
                </LabeledField>
              </>
            ) : (
              <>
                <LabeledField label="Icon">
                  <Select
                    value={iconName}
                    onChange={setKey("iconName")}
                    options={[
                      { value: "star", label: "Star" },
                      { value: "check", label: "Check" },
                      { value: "heart", label: "Heart" },
                      { value: "shield", label: "Shield" },
                      { value: "zap", label: "Bolt" },
                      { value: "bell", label: "Bell" },
                      { value: "alert", label: "Alert" },
                    ]}
                  />
                </LabeledField>
                <SizeControl
                  label="Icon Size"
                  value={iconSize}
                  onChange={setKey("iconSize")}
                  min={12}
                  max={48}
                  step={2}
                />
              </>
            )}

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
