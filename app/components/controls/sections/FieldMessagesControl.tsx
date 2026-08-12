"use client";

import React from "react";
import ColorControl from "../color/ColorControl";
import Input from "../input/Input";
import { LabeledField } from "../layout/LabeledField";

export interface FieldMessageValue {
  text: string;
  color: string;
}

export interface FieldMessagesControlProps {
  description: FieldMessageValue;
  helper: FieldMessageValue;
  error: FieldMessageValue;
  success: FieldMessageValue;
  onDescriptionTextChange: (value: string) => void;
  onDescriptionColorChange: (value: string) => void;
  onHelperTextChange: (value: string) => void;
  onHelperColorChange: (value: string) => void;
  onErrorTextChange: (value: string) => void;
  onErrorColorChange: (value: string) => void;
  onSuccessTextChange: (value: string) => void;
  onSuccessColorChange: (value: string) => void;
  helperPlaceholder?: string;
  palette?: readonly string[];
}

const DEFAULT_PALETTE = [
  "#334155",
  "#64748b",
  "#94a3b8",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#000000",
  "#ffffff",
] as const;

export default function FieldMessagesControl({
  description,
  helper,
  error,
  success,
  onDescriptionTextChange,
  onDescriptionColorChange,
  onHelperTextChange,
  onHelperColorChange,
  onErrorTextChange,
  onErrorColorChange,
  onSuccessTextChange,
  onSuccessColorChange,
  helperPlaceholder = "Optional guidance for the user",
  palette = DEFAULT_PALETTE,
}: FieldMessagesControlProps) {
  return (
    <div className="space-y-4">
      <LabeledField label="Description Text">
        <Input
          value={description.text}
          onChange={onDescriptionTextChange}
          placeholder="Short supporting copy"
        />
      </LabeledField>
      <ColorControl
        label="Description Color"
        palette={palette}
        value={description.color}
        onChange={onDescriptionColorChange}
      />
      <LabeledField label="Helper Text">
        <Input
          value={helper.text}
          onChange={onHelperTextChange}
          placeholder={helperPlaceholder}
        />
      </LabeledField>
      <ColorControl
        label="Helper Color"
        palette={palette}
        value={helper.color}
        onChange={onHelperColorChange}
      />
      <LabeledField label="Error Text">
        <Input
          value={error.text}
          onChange={onErrorTextChange}
          placeholder="Validation feedback"
        />
      </LabeledField>
      <ColorControl
        label="Error Color"
        palette={palette}
        value={error.color}
        onChange={onErrorColorChange}
      />
      <LabeledField label="Success Text">
        <Input
          value={success.text}
          onChange={onSuccessTextChange}
          placeholder="Positive confirmation"
        />
      </LabeledField>
      <ColorControl
        label="Success Color"
        palette={palette}
        value={success.color}
        onChange={onSuccessColorChange}
      />
    </div>
  );
}
