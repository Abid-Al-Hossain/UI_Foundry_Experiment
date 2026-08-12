"use client";
import React from "react";
import type { DividerState } from "../types";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerContentSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
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
          <div className="space-y-4 border-l-2 border-slate-700/50 pl-4">
            <LabeledField label="Content Type">
              <Segmented
                value={contentType}
                onChange={(v) =>
                  setKey("contentType")(v as DividerState["contentType"])
                }
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
                    onChange={(e) => setKey("labelText")(e)}
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
                onChange={(v) =>
                  setKey("labelPosition")(v as DividerState["labelPosition"])
                }
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
              onChange={setKey("labelPadding")}
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
