import React from "react";
import { type TypographyState, type TypographyUpdater } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Colors" subtitle="Exported type color defaults for the system.">
        <ControlGroup label="Default Text Color">
          <ColorControl
            label="Text Color"
            value={state.defaultTextColor}
            onChange={(v: string) => update("defaultTextColor", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
