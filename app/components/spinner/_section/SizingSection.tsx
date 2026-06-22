import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";
import {
  type SpinnerState,
  type SpinnerUpdate,
  SIZE_PRESET_MAP,
} from "../types";

type Props = {
  state: SpinnerState;
  update: SpinnerUpdate;
};

export default function SizingSection({ state, update }: Props) {
  const handleSizePresetChange = (preset: SpinnerState["sizePreset"]) => {
    update("sizePreset", preset);
    if (preset !== "custom") {
      update("size", SIZE_PRESET_MAP[preset as keyof typeof SIZE_PRESET_MAP]);
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Sizing" subtitle="Overall scale and spacing">
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
            onChange={(v) =>
              handleSizePresetChange(v as SpinnerState["sizePreset"])
            }
          />
        </ControlGroup>

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
    </div>
  );
}
