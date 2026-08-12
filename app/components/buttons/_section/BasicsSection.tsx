"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";

import { ActionButtonState, ActionButtonFieldSetter } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

export type ButtonVariant = "solid" | "outline" | "ghost";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: ActionButtonState;
  setKey: ActionButtonFieldSetter;
}) {
  return (
    <SectionCard title="Basics" subtitle="Label, variant, and states.">
      <div className="space-y-4">
        <LabeledField label="Label">
          <Input
            value={state.label}
            onNativeChange={(e) => setKey("label")(e.target.value)}
           />
        </LabeledField>

        <LabeledField label="Variant">
          <Segmented
            value={state.variant}
            onChange={(v) => setKey("variant")(v)}
            items={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
              { value: "ghost", label: "Ghost" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <Switch
            label={<>Disabled</>}
            id="disabled-check"
            checked={state.disabled}
            onChange={(checked) => setKey("disabled")(checked)}
          />

          <Switch
            label={<>Loading</>}
            id="loading-check"
            checked={state.loading}
            onChange={(checked) => setKey("loading")(checked)}
          />
        </div>

      </div>
    </SectionCard>
  );
}
