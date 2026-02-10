"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import Input from "@/app/components/controls/input/Input";
import SizeControl from "@/app/components/controls/input/SizeControl";

export default function ContentSection({
  state,
  setKey,
  setFloat,
}: {
  state: any;
  setKey: (key: string) => (val: any) => void;
  setFloat?: (key: string) => (val: any) => void;
}) {
  return (
    <SectionCard title="Content" subtitle="Text, numbers, and icons.">
      <div className="space-y-4">
        <LabeledField label="Label">
          <Input
            value={state.label}
            onChange={(e) => setKey("label")(e.target.value)}
          />
        </LabeledField>

        <LabeledField label="Count / Value">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 5, 99+, New"
              value={state.count}
              onChange={(e) => setKey("count")(e.target.value)}
            />
          </div>
        </LabeledField>

        <hr className="border-slate-800" />

        <Switch
          label="Show Icon"
          checked={state.showIcon}
          onChange={setKey("showIcon")}
        />

        {state.showIcon && (
          <>
            <LabeledField label="Icon Name">
              <Select
                value={state.iconName}
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
            <LabeledField label="Position">
              <Segmented
                value={state.iconPosition}
                onChange={setKey("iconPosition")}
                items={[
                  { label: "Left", value: "left" },
                  { label: "Right", value: "right" },
                ]}
              />
            </LabeledField>

            <div className="grid grid-cols-2 gap-4">
              <SizeControl
                label="Icon Size (%)"
                value={state.iconSize}
                onChange={setKey("iconSize")}
                min={50}
                max={150}
                step={5}
              />
              <SizeControl
                label="Icon Gap (px)"
                value={state.iconGap}
                onChange={setKey("iconGap")}
                min={0}
                max={20}
                step={1}
              />
            </div>
          </>
        )}
      </div>
    </SectionCard>
  );
}
