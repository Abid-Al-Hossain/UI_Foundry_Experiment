"use client";

import React from "react";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import { LabeledField, SectionCard } from "@/app/components/controls/ui";
import { type CheckboxState, type CheckboxSetter } from "../types";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: CheckboxState;
  setKey: CheckboxSetter;
}) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA attributes.">
      <div className="space-y-4">
        <LabeledField label="aria-label">
          <Input
            value={state.ariaLabel}
            onChange={setKey("ariaLabel")}
            placeholder="Accessible label"
          />
        </LabeledField>
        <LabeledField label="aria-describedby">
          <Input
            value={state.ariaDescribedBy}
            onChange={setKey("ariaDescribedBy")}
            placeholder="Associated helper text id(s)"
          />
        </LabeledField>
        <Switch
          label="aria-required"
          checked={state.ariaRequired}
          onChange={setKey("ariaRequired")}
        />
        <LabeledField label="Role" hint="default: checkbox">
          <Input
            value={state.role}
            onChange={setKey("role")}
            placeholder="checkbox"
          />
        </LabeledField>
        <LabeledField
          label="aria-checked"
          hint='defaults to "mixed", "true", or "false" from state'
        >
          <Input
            value={state.ariaChecked}
            onChange={setKey("ariaChecked")}
            placeholder="mixed"
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
