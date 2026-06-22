import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function TrackSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Track" subtitle="Background rail treatment for supported variants.">
        <ControlGroup label="Track Color">
          <ColorControl
            label="Track"
            value={state.trackColor}
            onChange={(value) => update("trackColor", value)}
          />
        </ControlGroup>

        <ControlGroup label="Track Opacity">
          <SliderControl
            value={state.trackOpacity}
            min={0}
            max={1}
            step={0.1}
            onChange={(value) => update("trackOpacity", Number(value))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
