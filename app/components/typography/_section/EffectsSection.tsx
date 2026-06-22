import React from "react";
import {
  type TypographyState,
  type TextTransform,
  type TypographyUpdater,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

const TRANSFORM_OPTIONS: { label: string; value: TextTransform }[] = [
  { label: "None", value: "none" },
  { label: "Uppercase", value: "uppercase" },
  { label: "Lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" },
];

export default function EffectsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Text Transform" subtitle="Case and emphasis behavior.">
        <ControlGroup label="Transform">
          <SelectControl
            value={state.textTransform}
            options={TRANSFORM_OPTIONS}
            onChange={(value) => update("textTransform", value as TextTransform)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
