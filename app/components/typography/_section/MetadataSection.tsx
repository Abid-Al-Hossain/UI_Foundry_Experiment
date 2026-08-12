import React from "react";
import { type TypographyState, type TypographyUpdater } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import Input from "@/app/components/controls/input/Input";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Metadata" subtitle="Optional accessibility naming for exported text systems.">
        <ControlGroup label="aria-label">
          <Input
            type="text"
            value={state.ariaLabel}
            onNativeChange={(e) => update("ariaLabel", e.target.value)}
            placeholder="Optional accessibility label..."
           />
        </ControlGroup>
      </Section>
    </div>
  );
}
