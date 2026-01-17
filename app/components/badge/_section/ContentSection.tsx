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

export default function ContentSection(props: {
  label: string;
  setLabel: (v: string) => void;
  count: string;
  setCount: (v: string) => void;
  showIcon: boolean;
  setShowIcon: (v: boolean) => void;
  iconName: string;
  setIconName: (v: string) => void;
  iconPosition: string;
  setIconPosition: (v: string) => void;
  dismissible: boolean;
  setDismissible: (v: boolean) => void;
}) {
  return (
    <SectionCard title="Content" subtitle="Text, numbers, and icons.">
      <div className="space-y-4">
        <LabeledField label="Label">
          <Input
            value={props.label}
            onChange={(e) => props.setLabel(e.target.value)}
          />
        </LabeledField>

        <LabeledField label="Count / Value">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 5, 99+, New"
              value={props.count}
              onChange={(e) => props.setCount(e.target.value)}
            />
          </div>
        </LabeledField>

        <hr className="border-slate-800" />

        <Switch
          label="Show Icon"
          checked={props.showIcon}
          onChange={props.setShowIcon}
        />

        {props.showIcon && (
          <>
            <LabeledField label="Icon Name">
              <Select
                value={props.iconName}
                onChange={props.setIconName}
                options={[
                  { value: "star", label: "Star" },
                  { value: "check", label: "Check" },
                  { value: "alert", label: "Alert" },
                  { value: "notification", label: "Bell" },
                ]}
              />
            </LabeledField>
            <LabeledField label="Position">
              <Segmented
                value={props.iconPosition}
                onChange={props.setIconPosition}
                items={[
                  { label: "Left", value: "left" },
                  { label: "Right", value: "right" },
                ]}
              />
            </LabeledField>
          </>
        )}
      </div>
    </SectionCard>
  );
}
