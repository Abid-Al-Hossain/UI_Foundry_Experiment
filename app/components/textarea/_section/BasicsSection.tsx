"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import { type TextareaSetter, type TextareaState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Textarea from "@/app/components/controls/input/Textarea";
import Switch from "@/app/components/controls/input/Switch";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Basics"
      subtitle="Content, default value, and core field state."
    >
      <div className="space-y-4">
        <LabeledField label="Placeholder">
          <Input
            value={state.placeholder}
            onNativeChange={(e) => setKey("placeholder")(e.target.value)}
           />
        </LabeledField>

        <LabeledField label="Default Value">
          <Textarea
            value={state.defaultValue}
            onNativeChange={(e) => setKey("defaultValue")(e.target.value)}
            rows={2}
           />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <Switch
            label={<>Required</>}
            id="ta-req"
            checked={state.required}
            onChange={(checked) => setKey("required")(checked)}
          />
          <Switch
            label={<>Disabled</>}
            id="ta-disabled"
            checked={state.disabled}
            onChange={(checked) => setKey("disabled")(checked)}
          />
          <Switch
            label={<>Read Only</>}
            id="ta-readonly"
            checked={state.readOnly}
            onChange={(checked) => setKey("readOnly")(checked)}
          />
        </div>
      </div>
    </SectionCard>
  );
}
