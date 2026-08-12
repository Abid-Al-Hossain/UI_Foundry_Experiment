"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import { type TextInputSetter, type TextInputState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextInputState;
  setKey: TextInputSetter;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Type, content, and core field state."
    >
      <div className="space-y-4">
        <LabeledField label="Input Type">
          <Select
            value={state.inputType}
            onChange={(v) => setKey("inputType")(v as TextInputState["inputType"])}
            options={[
              { value: "text", label: "Text" },
              { value: "password", label: "Password" },
              { value: "email", label: "Email" },
              { value: "number", label: "Number" },
              { value: "tel", label: "Telephone" },
              { value: "url", label: "URL" },
              { value: "search", label: "Search" },
              { value: "date", label: "Date" },
              { value: "time", label: "Time" },
              { value: "datetime-local", label: "Date & Time" },
              { value: "month", label: "Month" },
              { value: "week", label: "Week" },
              { value: "color", label: "Color" },
              { value: "range", label: "Range" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Placeholder">
          <Input
            value={state.placeholder}
            onNativeChange={(e) => setKey("placeholder")(e.target.value)}
           />
        </LabeledField>

        <LabeledField label="Default Value">
          <Input
            value={state.defaultValue}
            onNativeChange={(e) => setKey("defaultValue")(e.target.value)}
           />
        </LabeledField>

        <div className="grid grid-cols-3 gap-3">
          <Switch
            label={<>Required</>}
            id="input-required"
            checked={state.required}
            onChange={(checked) => setKey("required")(checked)}
          />
          <Switch
            label={<>Disabled</>}
            id="input-disabled"
            checked={state.disabled}
            onChange={(checked) => setKey("disabled")(checked)}
          />
          <Switch
            label={<>Read Only</>}
            id="input-readonly"
            checked={state.readOnly}
            onChange={(checked) => setKey("readOnly")(checked)}
          />
        </div>

      </div>
    </SectionCard>
  );
}
