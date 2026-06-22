import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import {
  type SpinnerUpdate,
  type SpinnerState,
  type SpinnerVariant,
} from "../types";

const VARIANT_OPTIONS: { label: string; value: SpinnerVariant }[] = [
  { label: "Circular", value: "circular" },
  { label: "Dots", value: "dots" },
  { label: "Bars", value: "bars" },
  { label: "Infinity", value: "infinity" },
  { label: "Cube (3D)", value: "cube" },
  { label: "Pyramid (3D)", value: "pyramid" },
  { label: "Sphere (3D)", value: "sphere" },
  { label: "Liquid", value: "liquid" },
  { label: "Glitch", value: "glitch" },
  { label: "Quantum", value: "quantum" },
];

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function BasicsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Definition" subtitle="Core spinner type">
        <ControlGroup label="Variant">
          <SelectControl
            value={state.variant}
            options={VARIANT_OPTIONS}
            onChange={(v) => update("variant", v as SpinnerState["variant"])}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
