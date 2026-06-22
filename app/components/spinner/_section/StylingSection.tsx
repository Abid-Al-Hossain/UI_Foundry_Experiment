import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function StylingSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      {(state.variant === "cube" ||
        state.variant === "pyramid" ||
        state.variant === "sphere" ||
        state.variant === "quantum") ? (
        <Section title="Surface" subtitle="Depth and perspective controls">
          <ControlGroup label="Depth (Z-Axis px)">
            <SliderControl
              value={state.depth}
              min={10}
              max={200}
              step={5}
              onChange={(v) => update("depth", Number(v))}
            />
          </ControlGroup>

          <ControlGroup label="Perspective (px)">
            <SliderControl
              value={state.perspective}
              min={200}
              max={2000}
              step={50}
              onChange={(v) => update("perspective", Number(v))}
            />
          </ControlGroup>
        </Section>
      ) : null}
    </div>
  );
}
