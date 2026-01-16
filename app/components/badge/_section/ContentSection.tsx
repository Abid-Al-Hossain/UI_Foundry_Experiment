"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "../../buttons/action/_section/ui";

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
          <input
            type="text"
            value={props.label}
            onChange={(e) => props.setLabel(e.target.value)}
            className="w-full h-8 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300"
          />
        </LabeledField>

        <LabeledField label="Count / Value">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 5, 99+, New"
              value={props.count}
              onChange={(e) => props.setCount(e.target.value)}
              className="w-full h-8 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300"
            />
          </div>
        </LabeledField>

        <hr className="border-slate-800" />

        <div className="flex items-center justify-between">
          <label className="text-xs text-slate-400">Show Icon</label>
          <input
            type="checkbox"
            checked={props.showIcon}
            onChange={(e) => props.setShowIcon(e.target.checked)}
          />
        </div>

        {props.showIcon && (
          <>
            <LabeledField label="Icon Name">
              <select
                value={props.iconName}
                onChange={(e) => props.setIconName(e.target.value)}
                className="w-full h-8 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300"
              >
                <option value="star">Star</option>
                <option value="check">Check</option>
                <option value="alert">Alert</option>
                <option value="notification">Bell</option>
              </select>
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
