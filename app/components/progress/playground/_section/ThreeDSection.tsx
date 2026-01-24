import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SwitchControl from "@/app/components/controls/input/Switch";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state?: ProgressState;
  update?: (key: keyof ProgressState, value: any) => void;
};

export default function ThreeDSection({ state, update }: Props) {
  if (!state || !update) return null;

  return (
    <div className="space-y-6">
      <Section title="3D Transform" subtitle="Perspective and depth settings">
        <ControlGroup label="Enable 3D Mode">
          <SwitchControl
            checked={state.enable3D}
            onChange={(v) => update("enable3D", v)}
          />
        </ControlGroup>

        {state.enable3D && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ControlGroup label="Depth (Thickness)">
              <SliderControl
                value={state.depth}
                min={0}
                max={100}
                step={1}
                onChange={(v) => update("depth", v)}
              />
            </ControlGroup>

            <ControlGroup label="Rotate X (Tilt)">
              <SliderControl
                value={state.rotateX}
                min={-180}
                max={180}
                step={1}
                onChange={(v) => update("rotateX", v)}
              />
            </ControlGroup>

            <ControlGroup label="Rotate Y (Turn)">
              <SliderControl
                value={state.rotateY}
                min={-180}
                max={180}
                step={1}
                onChange={(v) => update("rotateY", v)}
              />
            </ControlGroup>

            <ControlGroup label="Rotate Z (Spin)">
              <SliderControl
                value={state.rotateZ}
                min={-180}
                max={180}
                step={1}
                onChange={(v) => update("rotateZ", v)}
              />
            </ControlGroup>
          </div>
        )}
      </Section>
    </div>
  );
}
