"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import { type CheckboxState, type CheckboxSetter } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: CheckboxSetter;
}) {
  return (
    <SectionCard title="Basics" subtitle="Core checkbox properties.">
      <div className="space-y-4">
        <Switch label="Checked" checked={state.checked} onChange={setKey("checked")} />
        <Switch label="Indeterminate" checked={state.indeterminate} onChange={setKey("indeterminate")} />
        <Switch label="Disabled" checked={state.disabled} onChange={setKey("disabled")} />
        <LabeledField label="Label Text">
          <Input
            value={state.labelText}
            onChange={setKey("labelText")}
          />
        </LabeledField>
        <LabeledField label="Label Position">
          <Segmented
            value={state.labelPosition}
            onChange={(v) => setKey("labelPosition")(v as CheckboxState["labelPosition"])}
            items={[
              { value: "right", label: "Right" },
              { value: "left", label: "Left" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
