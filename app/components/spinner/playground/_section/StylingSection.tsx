import React from "react";
import { type SpinnerState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";
import ColorControl from "@/app/components/controls/color/ColorControl";
import InputControl from "@/app/components/controls/input/Input";

type Props = {
  state: SpinnerState;
  update: (key: keyof SpinnerState, value: any) => void;
};

export default function StylingSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Appearance" subtitle="Colors and shape styles">
        <ControlGroup label="Color Mode">
          <SelectControl
            value={state.colorMode}
            options={[
              { label: "Solid", value: "solid" },
              { label: "Gradient", value: "gradient" },
              { label: "Rainbow (Animated)", value: "rainbow" },
              { label: "Neon (Pulsing)", value: "neon" },
            ]}
            onChange={(v) => update("colorMode", v)}
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

        <div className="h-px bg-slate-800 my-4" />

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
            step={0.1}
            onChange={(v) => update("trackOpacity", Number(v))}
          />
        </ControlGroup>
      </Section>

      <Section title="Stroke" subtitle="Line properties">
        <ControlGroup label="Line Cap">
          <SelectControl
            value={state.linecap}
            options={[
              { label: "Round", value: "round" },
              { label: "Square", value: "square" },
              { label: "Butt (Flat)", value: "butt" },
            ]}
            onChange={(v) => update("linecap", v)}
          />
        </ControlGroup>
      </Section>

      {(state.variant === "cube" ||
        state.variant === "pyramid" ||
        state.variant === "sphere" ||
        state.variant === "quantum") && (
        <Section title="3D Settings" subtitle="Perspective and depth">
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
      )}
    </div>
  );
}
