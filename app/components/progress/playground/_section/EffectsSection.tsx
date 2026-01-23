import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import SelectControl from "@/app/components/controls/input/Select";
import SwitchControl from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function EffectsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Main Effect" subtitle="Visual overlay effects">
        <ControlGroup label="Effect Type">
          <SelectControl
            value={state.effect}
            options={[
              { label: "None", value: "none" },
              { label: "Stripes (Animated)", value: "stripes" },
              { label: "Neon Glow", value: "glow" },
              { label: "Liquid (Gooey)", value: "liquid" },
              { label: "Glitch (Cyber)", value: "glitch" },
              { label: "Retro (Pixel)", value: "retro" },
              { label: "Pulse", value: "pulse" },
              { label: "Magnetic (Scrub)", value: "magnetic" },
            ]}
            onChange={(v) => update("effect", v)}
          />
        </ControlGroup>

        {state.effect === "stripes" && (
          <>
            <ControlGroup label="Stripe Color">
              <ColorControl
                label="Stripe"
                value={state.stripeColor}
                onChange={(v) => update("stripeColor", v)}
              />
            </ControlGroup>
            <ControlGroup label="Speed">
              <SliderControl
                value={state.stripeSpeed}
                min={0}
                max={10}
                step={0.1}
                onChange={(v) => update("stripeSpeed", v)}
              />
            </ControlGroup>
          </>
        )}

        {state.effect === "glow" && (
          <ControlGroup label="Blur Radius">
            <SliderControl
              value={state.glowBlur}
              min={0}
              max={50}
              step={1}
              onChange={(v) => update("glowBlur", v)}
            />
          </ControlGroup>
        )}

        {state.effect === "glitch" && (
          <ControlGroup label="Intensity">
            <SliderControl
              value={state.glitchIntensity}
              min={0}
              max={100}
              step={1}
              onChange={(v) => update("glitchIntensity", v)}
            />
          </ControlGroup>
        )}

        {state.effect === "liquid" && (
          <ControlGroup label="Viscosity">
            <SliderControl
              value={state.liquidViscosity}
              min={1}
              max={20}
              step={1}
              onChange={(v) => update("liquidViscosity", v)}
            />
          </ControlGroup>
        )}
      </Section>

      <Section title="Particles" subtitle="Confetti and sparks">
        <ControlGroup label="Enable Particles">
          <SwitchControl
            checked={state.hasParticles}
            onChange={(v) => update("hasParticles", v)}
          />
        </ControlGroup>

        {state.hasParticles && (
          <ControlGroup label="Particle Type">
            <SelectControl
              value={state.particleType}
              options={[
                { label: "Sparks", value: "sparks" },
                { label: "Confetti", value: "confetti" },
                { label: "Fire", value: "fire" },
              ]}
              onChange={(v) => update("particleType", v)}
            />
          </ControlGroup>
        )}
      </Section>
    </div>
  );
}
