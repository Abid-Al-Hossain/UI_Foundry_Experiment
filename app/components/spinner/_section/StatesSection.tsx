import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function StatesSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Focus Ring" subtitle="Keyboard focus indicator on the spinner container.">
        <ControlGroup label="Enabled">
          <SegmentedControl
            value={state.focusRingEnabled ? "true" : "false"}
            onChange={(v) => update("focusRingEnabled", v === "true")}
            items={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]}
          />
        </ControlGroup>
        <ControlGroup label="Ring Color">
          <ColorControl label="Ring Color" value={state.focusRingColor} onChange={(v) => update("focusRingColor", v)} />
        </ControlGroup>
      </Section>

      <Section title="Transitions" subtitle="Fade timing for show/hide and disabled changes.">
        <ControlGroup label="Easing">
          <SegmentedControl
            value={state.transitionEasing}
            onChange={(v) => update("transitionEasing", v as SpinnerState["transitionEasing"])}
            items={[
              { value: "ease", label: "Ease" },
              { value: "ease-in", label: "In" },
              { value: "ease-out", label: "Out" },
              { value: "ease-in-out", label: "In-Out" },
              { value: "linear", label: "Linear" },
            ]}
          />
        </ControlGroup>
      </Section>

      <Section title="Disabled State" subtitle="Greyed-out, non-interactive spinner (e.g. cancelled action).">
        <ControlGroup label="Disabled">
          <SegmentedControl
            value={state.disabled ? "true" : "false"}
            onChange={(v) => update("disabled", v === "true")}
            items={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
