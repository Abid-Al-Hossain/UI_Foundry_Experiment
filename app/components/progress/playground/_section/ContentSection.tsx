import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function ContentSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Values" subtitle="Progress bar values">
        <ControlGroup label="Current Value">
          <InputControl
            type="number"
            value={state.value}
            onChange={(v) => update("value", Number(v))}
            min={state.min}
            max={state.max}
          />
        </ControlGroup>

        <ControlGroup label="Min / Max">
          <div className="flex gap-2">
            <InputControl
              type="number"
              value={state.min}
              onChange={(v) => update("min", Number(v))}
              placeholder="Min"
            />
            <InputControl
              type="number"
              value={state.max}
              onChange={(v) => update("max", Number(v))}
              placeholder="Max"
            />
          </div>
        </ControlGroup>
      </Section>
    </div>
  );
}
