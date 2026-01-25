import React from "react";
import { type SpinnerState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: SpinnerState;
  update: (key: keyof SpinnerState, value: any) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Labels & Aria" subtitle="Screen reader settings">
        <ControlGroup label="Aria Label (Invisible)">
          <InputControl
            value={state.label}
            onChange={(e) => update("label", e.target.value)}
            placeholder="e.g. Loading..."
          />
        </ControlGroup>

        <p className="text-xs text-slate-500 mt-2">
          This label will also be used as the <code>aria-label</code> for the
          spinner role.
        </p>
      </Section>
    </div>
  );
}
