import React from "react";
import { type SpinnerState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: (key: keyof SpinnerState, value: any) => void;
};

export default function EffectsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Light & Shadow" subtitle="Glow effects">
        <ControlGroup label="Glow Intensity (Blur px)">
          <SliderControl
            value={state.glowIntensity}
            min={0}
            max={50}
            step={1}
            onChange={(v) => update("glowIntensity", Number(v))}
          />
        </ControlGroup>
      </Section>

      <Section title="Distortion" subtitle="Special visual modifiers">
        <ControlGroup label="Glitch Frequency (0-100)">
          <SliderControl
            value={state.glitchFrequency}
            min={0}
            max={100}
            step={1}
            disabled={state.variant !== "glitch"}
            onChange={(v) => update("glitchFrequency", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Gooey Intensity">
          <SliderControl
            value={state.gooeyIntensity}
            min={0}
            max={20}
            step={1}
            disabled={state.variant !== "liquid" && state.variant !== "dots"} // Allow gooey on dots too for fusion effect
            onChange={(v) => update("gooeyIntensity", Number(v))}
          />
        </ControlGroup>
      </Section>

      <Section title="Particles" subtitle="Quantum/Dot settings">
        <ControlGroup label="Particle Count">
          <SliderControl
            value={state.particleCount}
            min={1}
            max={12}
            step={1}
            disabled={state.variant !== "dots" && state.variant !== "quantum"}
            onChange={(v) => update("particleCount", Number(v))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
