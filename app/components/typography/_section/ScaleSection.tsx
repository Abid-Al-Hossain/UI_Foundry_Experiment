import React from "react";
import {
  type TypographyState,
  type ScaleRatio,
  type TypographyUpdater,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

const SCALE_OPTIONS: { label: string; value: ScaleRatio }[] = [
  { label: "Minor Second (1.067)", value: "minor-second" },
  { label: "Major Second (1.125)", value: "major-second" },
  { label: "Minor Third (1.200)", value: "minor-third" },
  { label: "Major Third (1.250)", value: "major-third" },
  { label: "Perfect Fourth (1.333)", value: "perfect-fourth" },
  { label: "Augmented Fourth (1.414)", value: "augmented-fourth" },
  { label: "Perfect Fifth (1.500)", value: "perfect-fifth" },
  { label: "Golden Ratio (1.618)", value: "golden-ratio" },
  { label: "Custom", value: "custom" },
];

export default function ScaleSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Type Scale" subtitle="Define your modular ratio">
        <ControlGroup label="Scale Ratio">
          <SelectControl
            value={state.scaleRatio}
            options={SCALE_OPTIONS}
            onChange={(v) => update("scaleRatio", v as ScaleRatio)}
          />
        </ControlGroup>

        {state.scaleRatio === "custom" && (
          <ControlGroup label="Custom Ratio">
            <SliderControl
              value={state.customRatio}
              min={1}
              max={2}
              step={0.01}
              onChange={(v) => update("customRatio", Number(v))}
            />
          </ControlGroup>
        )}

        <ControlGroup label="Base Size">
          <SliderControl
            value={state.baseSize}
            min={0.5}
            max={2}
            step={0.0625}
            onChange={(v) => update("baseSize", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Base Unit">
          <SelectControl
            value={state.baseSizeUnit}
            options={[
              { label: "rem", value: "rem" },
              { label: "px", value: "px" },
            ]}
            onChange={(v) => update("baseSizeUnit", v as "px" | "rem")}
          />
        </ControlGroup>
      </Section>

      <Section
        title="Fluid Typography"
        subtitle="Responsive sizing with clamp()"
      >
        <ControlGroup label="Enable Fluid Mode">
          <Switch
            checked={state.fluidMode}
            onChange={(v: boolean) => update("fluidMode", v)}
          />
        </ControlGroup>

        {state.fluidMode && (
          <>
            <ControlGroup label="Min Viewport (px)">
              <SliderControl
                value={state.minViewport}
                min={280}
                max={600}
                step={10}
                onChange={(v) => update("minViewport", Number(v))}
              />
            </ControlGroup>

            <ControlGroup label="Max Viewport (px)">
              <SliderControl
                value={state.maxViewport}
                min={800}
                max={2560}
                step={10}
                onChange={(v) => update("maxViewport", Number(v))}
              />
            </ControlGroup>
          </>
        )}
      </Section>
    </div>
  );
}
