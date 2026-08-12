"use client";

import React from "react";
import { SectionCard, LabeledField } from "@/app/components/controls/ui";
import { type TextareaSetter, type TextareaState } from "../types";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";

export default function AccessibilitySection({
  state,
  setKey,
}: {
  state: TextareaState;
  setKey: TextareaSetter;
}) {
  return (
    <SectionCard
      title="Accessibility"
      subtitle="ARIA wiring and semantic overrides."
    >
      <div className="space-y-4">
        <LabeledField label="aria-label">
          <Input
            value={state.ariaLabel}
            onNativeChange={(e) => setKey("ariaLabel")(e.target.value)}
            placeholder="Textarea label"
           />
        </LabeledField>
        <LabeledField label="aria-describedby">
          <Input
            value={state.ariaDescribedBy}
            onNativeChange={(e) => setKey("ariaDescribedBy")(e.target.value)}
           />
        </LabeledField>
        <Switch
          label={<>aria-invalid</>}
          id="ta-aria-inv"
          checked={state.ariaInvalid}
          onChange={(checked) => setKey("ariaInvalid")(checked)}
        />
        <LabeledField label="Role">
          <Input
            value={state.role}
            onNativeChange={(e) => setKey("role")(e.target.value)}
            placeholder="textbox"
           />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
