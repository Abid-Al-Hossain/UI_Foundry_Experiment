import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SwitchControl from "@/app/components/controls/input/Switch";
import SelectControl from "@/app/components/controls/input/Select";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function ContentSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Labels">
        <ControlGroup label="Show Label">
          <SwitchControl
            checked={state.showLabel}
            onChange={(v) => update("showLabel", v)}
          />
        </ControlGroup>

        {state.showLabel && (
          <>
            <ControlGroup label="Position">
              <SelectControl
                value={state.labelPosition}
                options={[
                  { label: "Top (Outside)", value: "top" },
                  { label: "Bottom (Outside)", value: "bottom" },
                  { label: "Center (Inside)", value: "center" },
                  { label: "Floating (Smart)", value: "floating" },
                ]}
                onChange={(v) => update("labelPosition", v)}
              />
            </ControlGroup>

            <ControlGroup label="Format">
              <SelectControl
                value={state.labelFormat}
                options={[
                  { label: "Percent (%)", value: "percent" },
                  { label: "Fraction (Val/Max)", value: "fraction" },
                  { label: "Raw Value", value: "value" },
                  { label: "Custom Text", value: "custom" },
                ]}
                onChange={(v) => update("labelFormat", v)}
              />
            </ControlGroup>

            {state.labelFormat === "custom" && (
              <ControlGroup label="Custom Text">
                <InputControl
                  value={state.customLabel}
                  onChange={(v) => update("customLabel", v)}
                  placeholder="e.g. Loading..."
                />
              </ControlGroup>
            )}
          </>
        )}
      </Section>

      <Section title="Interaction">
        <ControlGroup label="Interactive (Draggable)">
          <SwitchControl
            checked={state.interactive}
            onChange={(v) => update("interactive", v)}
          />
        </ControlGroup>

        {state.interactive && (
          <ControlGroup label="Scrub Mode">
            <SelectControl
              value={state.scrubMode}
              options={[
                { label: "Simple (Linear)", value: "simple" },
                { label: "Magnetic (Snap)", value: "magnetic" },
              ]}
              onChange={(v) => update("scrubMode", v)}
            />
          </ControlGroup>
        )}
      </Section>
    </div>
  );
}
