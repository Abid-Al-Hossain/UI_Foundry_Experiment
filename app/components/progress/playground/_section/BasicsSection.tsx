import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import SelectControl from "@/app/components/controls/input/Select";
import SwitchControl from "@/app/components/controls/input/Switch";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function BasicsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Values" subtitle="Core progress values">
        <ControlGroup label="Progress Value">
          <SliderControl
            value={state.value}
            min={state.min}
            max={state.max}
            step={1}
            onChange={(v) => update("value", v)}
          />
        </ControlGroup>

        {state.mode === "buffer" && (
          <ControlGroup label="Buffer Value">
            <SliderControl
              value={state.bufferValue}
              min={state.min}
              max={state.max}
              step={1}
              onChange={(v) => update("bufferValue", v)}
            />
          </ControlGroup>
        )}
      </Section>

      <Section title="Mode & Layout" subtitle="Behavior and orientation">
        <ControlGroup label="Mode">
          <SelectControl
            value={state.mode}
            options={[
              { label: "Determinate", value: "determinate" },
              { label: "Indeterminate (Loading)", value: "indeterminate" },
              { label: "Buffer (Streaming)", value: "buffer" },
              { label: "Steps (Segmented)", value: "steps" },
              { label: "Timer (Countdown)", value: "timer" },
            ]}
            onChange={(v) => update("mode", v)}
          />
        </ControlGroup>

        <ControlGroup label="Orientation">
          <SelectControl
            value={state.orientation}
            options={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
            onChange={(v) => update("orientation", v)}
          />
        </ControlGroup>

        {state.mode === "steps" && (
          <ControlGroup label="Step Count">
            <SliderControl
              value={state.stepCount}
              min={2}
              max={20}
              step={1}
              onChange={(v) => update("stepCount", v)}
            />
          </ControlGroup>
        )}
      </Section>
    </div>
  );
}
