import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function DistortionSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Distortion" subtitle="Variant-specific glitch and gooey modulation.">
        <ControlGroup label="Glitch Frequency (0-100)">
          <SliderControl
            value={state.glitchFrequency}
            min={0}
            max={100}
            step={1}
            disabled={state.variant !== "glitch"}
            onChange={(value) => update("glitchFrequency", Number(value))}
          />
        </ControlGroup>

        <ControlGroup label="Gooey Intensity">
          <SliderControl
            value={state.gooeyIntensity}
            min={0}
            max={20}
            step={1}
            disabled={state.variant !== "liquid" && state.variant !== "dots"}
            onChange={(value) => update("gooeyIntensity", Number(value))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
