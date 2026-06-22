import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function ParticlesSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Particles" subtitle="Dot count and quantum orbit density.">
        <ControlGroup label="Particle Count">
          <SliderControl
            value={state.particleCount}
            min={1}
            max={12}
            step={1}
            disabled={state.variant !== "dots" && state.variant !== "quantum"}
            onChange={(value) => update("particleCount", Number(value))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
