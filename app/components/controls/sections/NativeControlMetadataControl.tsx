"use client";

import React from "react";
import Input from "../input/Input";
import { SegmentedControl } from "../input/SegmentedControl";
import { LabeledField } from "../layout/LabeledField";

export interface NativeControlMetadataControlProps {
  id: string;
  onIdChange: (value: string) => void;
  name: string;
  onNameChange: (value: string) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  title: string;
  onTitleChange: (value: string) => void;
  tabIndex: number;
  onTabIndexChange: (value: number) => void;
  dir: "ltr" | "rtl";
  onDirChange: (value: "ltr" | "rtl") => void;
  lang: string;
  onLangChange: (value: string) => void;
  idLabel?: string;
  idPlaceholder?: string;
  nameLabel?: string;
}

export default function NativeControlMetadataControl({
  id,
  onIdChange,
  name,
  onNameChange,
  value,
  onValueChange,
  title,
  onTitleChange,
  tabIndex,
  onTabIndexChange,
  dir,
  onDirChange,
  lang,
  onLangChange,
  idLabel = "Control ID",
  idPlaceholder,
  nameLabel = "Name",
}: NativeControlMetadataControlProps) {
  return (
    <div className="space-y-4">
      <LabeledField label={idLabel}>
        <Input value={id} onChange={onIdChange} placeholder={idPlaceholder} />
      </LabeledField>
      <LabeledField label={nameLabel}>
        <Input value={name} onChange={onNameChange} />
      </LabeledField>
      {value !== undefined && onValueChange ? (
        <LabeledField label="Value">
          <Input value={value} onChange={onValueChange} />
        </LabeledField>
      ) : null}
      <LabeledField label="Title">
        <Input
          value={title}
          onChange={onTitleChange}
          placeholder="Browser title / tooltip"
        />
      </LabeledField>
      <LabeledField label="Tab Index">
        <Input
          type="number"
          value={tabIndex}
          onChange={(nextValue) => onTabIndexChange(Number(nextValue) || 0)}
        />
      </LabeledField>
      <LabeledField label="Direction">
        <SegmentedControl
          value={dir}
          onChange={(nextValue) => onDirChange(nextValue as "ltr" | "rtl")}
          items={[
            { value: "ltr", label: "LTR" },
            { value: "rtl", label: "RTL" },
          ]}
        />
      </LabeledField>
      <LabeledField label="Language">
        <Input value={lang} onChange={onLangChange} placeholder="en" />
      </LabeledField>
    </div>
  );
}
