import React from "react";
import { type SpinnerState, type SpinnerUpdate } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Colors" subtitle="Primary accent treatment for the spinner.">
        <ControlGroup label="Color Mode">
          <SelectControl
            value={state.colorMode}
            options={[
              { label: "Solid", value: "solid" },
              { label: "Gradient", value: "gradient" },
              { label: "Rainbow (Animated)", value: "rainbow" },
              { label: "Neon (Pulsing)", value: "neon" },
            ]}
            onChange={(v) =>
              update("colorMode", v as SpinnerState["colorMode"])
            }
          />
        </ControlGroup>

        <ControlGroup label="Primary Color">
          <ColorControl
            label="Primary"
            value={state.color1}
            onChange={(v) => update("color1", v)}
          />
        </ControlGroup>

        {(state.colorMode === "gradient" || state.colorMode === "neon") && (
          <ControlGroup label="Secondary Color">
            <ColorControl
              label="Secondary"
              value={state.color2}
              onChange={(v) => update("color2", v)}
            />
          </ControlGroup>
        )}
      </Section>
    </div>
  );
}
