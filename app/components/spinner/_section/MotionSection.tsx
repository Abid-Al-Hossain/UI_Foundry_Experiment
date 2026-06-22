import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function MotionSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Motion" subtitle="Timing and easing behavior">
        <ControlGroup label="Speed (Duration ms)">
          <SliderControl
            value={state.speed}
            min={100}
            max={5000}
            step={100}
            onChange={(v) => update("speed", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Easing">
          <SelectControl
            value={state.easing}
            options={[
              { label: "Linear", value: "linear" },
              { label: "Ease", value: "ease" },
              { label: "Ease In", value: "ease-in" },
              { label: "Ease Out", value: "ease-out" },
              { label: "Ease In Out", value: "ease-in-out" },
            ]}
            onChange={(v) => update("easing", v as SpinnerState["easing"])}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
