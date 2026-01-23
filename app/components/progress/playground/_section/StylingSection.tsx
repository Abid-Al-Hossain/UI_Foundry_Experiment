import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import SelectControl from "@/app/components/controls/input/Select";
import ColorControl from "@/app/components/controls/color/ColorControl";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function StylingSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Dimensions">
        <ControlGroup
          label={state.orientation === "horizontal" ? "Width" : "Height"}
        >
          <SliderControl
            value={state.width}
            min={50}
            max={600}
            step={10}
            onChange={(v) => update("width", v)}
          />
        </ControlGroup>
        <ControlGroup label="Thickness">
          <SliderControl
            value={state.thickness}
            min={2}
            max={100}
            step={1}
            onChange={(v) => update("thickness", v)}
          />
        </ControlGroup>
        <ControlGroup label="Border Radius">
          <SliderControl
            value={state.radius}
            min={0}
            max={50}
            step={1}
            onChange={(v) => update("radius", v)}
            disabled={state.shape === "pill"}
          />
        </ControlGroup>
        <ControlGroup label="Shape">
          <SegmentedControl
            value={state.shape}
            items={[
              { label: "Square", value: "square" },
              { label: "Round", value: "round" },
              { label: "Pill", value: "pill" },
            ]}
            onChange={(v: any) => update("shape", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="Colors">
        <ControlGroup label="Color Mode">
          <SelectControl
            value={state.colorMode}
            options={[
              { label: "Solid", value: "solid" },
              { label: "Gradient", value: "gradient" },
              { label: "Duotone", value: "duotone" },
            ]}
            onChange={(v) => update("colorMode", v)}
          />
        </ControlGroup>

        {state.colorMode === "solid" && (
          <ControlGroup label="Primary Color">
            <ColorControl
              label="Primary"
              value={state.color1}
              onChange={(v) => update("color1", v)}
            />
          </ControlGroup>
        )}

        {state.colorMode === "gradient" && (
          <>
            <ControlGroup label="Start Color">
              <ColorControl
                label="Start"
                value={state.color1}
                onChange={(v) => update("color1", v)}
              />
            </ControlGroup>
            <ControlGroup label="End Color">
              <ColorControl
                label="End"
                value={state.color2}
                onChange={(v) => update("color2", v)}
              />
            </ControlGroup>
          </>
        )}

        <ControlGroup label="Track Color">
          <ColorControl
            label="Track"
            value={state.trackColor}
            onChange={(v) => update("trackColor", v)}
          />
        </ControlGroup>

        <ControlGroup label="Track Opacity">
          <SliderControl
            value={state.trackOpacity}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => update("trackOpacity", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
