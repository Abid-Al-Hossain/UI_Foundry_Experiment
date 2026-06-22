import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Metadata"
        subtitle="Assistive loading name for the spinner itself."
      >
        <ControlGroup label="ARIA Label">
          <InputControl
            value={state.label}
            onChange={(e) => update("label", e.target.value)}
            placeholder="e.g. Loading dashboard data"
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
