"use client";

import React from "react";
import { LabeledField } from "../layout/LabeledField";
import Select from "../input/Select";
import Switch from "../input/Switch";

export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

type TextDecorationControlProps = {
  italic?: boolean;
  setItalic?: (v: boolean) => void;

  underline?: boolean;
  setUnderline?: (v: boolean) => void;

  textTransform?: TextTransform;
  setTextTransform?: (v: TextTransform) => void;
};

export default function TextDecorationControl({
  italic,
  setItalic,
  underline,
  setUnderline,
  textTransform,
  setTextTransform,
}: TextDecorationControlProps) {
  const showItalic = italic !== undefined && setItalic !== undefined;
  const showUnderline = underline !== undefined && setUnderline !== undefined;
  const showTransform =
    textTransform !== undefined && setTextTransform !== undefined;

  return (
    <div className="space-y-4">
      {showItalic || showUnderline ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {showItalic ? (
            <Switch label="Italic" checked={italic} onChange={setItalic} />
          ) : null}
          {showUnderline ? (
            <Switch
              label="Underline"
              checked={underline}
              onChange={setUnderline}
            />
          ) : null}
        </div>
      ) : null}

      {showTransform ? (
        <LabeledField label="Text transform">
          <Select
            value={textTransform}
            onChange={setTextTransform}
            options={[
              { value: "none", label: "None" },
              { value: "uppercase", label: "Uppercase" },
              { value: "lowercase", label: "Lowercase" },
              { value: "capitalize", label: "Capitalize" },
            ]}
          />
        </LabeledField>
      ) : null}
    </div>
  );
}
