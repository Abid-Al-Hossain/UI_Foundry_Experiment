import React from "react";
import {
  type SpinnerState,
  SIZE_PRESET_MAP,
  type SpinnerVariant,
} from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: SpinnerState;
  update: (key: keyof SpinnerState, value: any) => void;
};

const VARIANT_OPTIONS: { label: string; value: SpinnerVariant }[] = [
  { label: "🟢 Circular", value: "circular" },
  { label: "🔵 Dots", value: "dots" },
  { label: "📊 Bars", value: "bars" },
  { label: "♾️ Infinity", value: "infinity" },
  { label: "🧊 Cube (3D)", value: "cube" },
  { label: "📐 Pyramid (3D)", value: "pyramid" },
  { label: "🌐 Sphere (3D)", value: "sphere" },
  { label: "💧 Liquid", value: "liquid" },
  { label: "👾 Glitch", value: "glitch" },
  { label: "⚛️ Quantum", value: "quantum" },
];

export default function BasicsSection({ state, update }: Props) {
  const handleSizePresetChange = (preset: string) => {
    update("sizePreset", preset);
    if (preset !== "custom") {
      update("size", SIZE_PRESET_MAP[preset as keyof typeof SIZE_PRESET_MAP]);
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Definition" subtitle="Core spinner type">
        <ControlGroup label="Variant">
          <SelectControl
            value={state.variant}
            options={VARIANT_OPTIONS}
            onChange={(v) => update("variant", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="Dimensions" subtitle="Size and specific properties">
        <ControlGroup label="Size Preset">
          <SelectControl
            value={state.sizePreset}
            options={[
              { label: "Extra Small (16px)", value: "xs" },
              { label: "Small (24px)", value: "sm" },
              { label: "Medium (40px)", value: "md" },
              { label: "Large (64px)", value: "lg" },
              { label: "Extra Large (96px)", value: "xl" },
              { label: "Custom", value: "custom" },
            ]}
            onChange={handleSizePresetChange}
          />
        </ControlGroup>

        <div className="h-2" />

        <ControlGroup label="Total Size (px)">
          <SliderControl
            value={state.size}
            min={16}
            max={200}
            step={2}
            onChange={(v) => update("size", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Thickness (px)">
          <SliderControl
            value={state.thickness}
            min={1}
            max={20}
            step={0.5}
            onChange={(v) => update("thickness", Number(v))}
          />
        </ControlGroup>

        {(state.variant === "dots" || state.variant === "bars") && (
          <ControlGroup label="Gap (px)">
            <SliderControl
              value={state.gap}
              min={0}
              max={20}
              step={1}
              onChange={(v) => update("gap", Number(v))}
            />
          </ControlGroup>
        )}
      </Section>

      <Section title="Animation" subtitle="Timing and speed">
        <ControlGroup label="Speed (Duration ms)">
          <SliderControl
            value={state.speed}
            min={100}
            max={5000}
            step={100}
            onChange={(v) => update("speed", Number(v))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
