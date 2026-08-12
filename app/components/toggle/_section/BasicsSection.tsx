"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import { type ToggleState, type ToggleKeyUpdater } from "../types";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: ToggleKeyUpdater;
}) {
  return (
    <SectionCard title="Basics" subtitle="Core toggle properties.">
      <div className="space-y-4">
        <Switch label="On" checked={state.checked} onChange={setKey("checked")} />
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
            onChange={(v) =>
              setKey("labelPosition")(v as ToggleState["labelPosition"])
            }
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
