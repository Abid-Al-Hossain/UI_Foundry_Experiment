import React from "react";
import { type ProgressState, SIZE_PRESET_MAP } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import SelectControl from "@/app/components/controls/input/Select";
import SwitchControl from "@/app/components/controls/input/Switch";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

export default function BasicsSection({ state, update }: Props) {
  // Handle size preset change
  const handleSizePresetChange = (preset: string) => {
    update("sizePreset", preset);
    if (preset !== "custom") {
      update(
        "thickness",
        SIZE_PRESET_MAP[preset as keyof typeof SIZE_PRESET_MAP],
      );
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Dimensions" subtitle="Size and shape">
        <ControlGroup label="Size Preset">
          <SelectControl
            value={state.sizePreset}
            options={[
              { label: "Extra Small (4px)", value: "xs" },
              { label: "Small (8px)", value: "sm" },
              { label: "Medium (16px)", value: "md" },
              { label: "Large (24px)", value: "lg" },
              { label: "Extra Large (32px)", value: "xl" },
              { label: "Custom", value: "custom" },
            ]}
            onChange={handleSizePresetChange}
          />
        </ControlGroup>
        <ControlGroup label="Width (px)">
          <SliderControl
            value={state.width}
            min={50}
            max={800}
            step={10}
            onChange={(v) => update("width", Number(v))}
          />
        </ControlGroup>
        {state.sizePreset === "custom" && (
          <ControlGroup label="Thickness (px)">
            <SliderControl
              value={state.thickness}
              min={4}
              max={100}
              step={2}
              onChange={(v) => update("thickness", Number(v))}
            />
          </ControlGroup>
        )}
        <ControlGroup label="Corner Radius">
          <SliderControl
            value={state.radius}
            min={0}
            max={50}
            step={1}
            disabled={state.shape === "pill"}
            onChange={(v) => update("radius", Number(v))}
          />
        </ControlGroup>
        <ControlGroup label="Shape">
          <SelectControl
            value={state.shape}
            options={[
              { label: "Pill (Fully Rounded)", value: "pill" },
              { label: "Rounded Configurable", value: "round" },
              { label: "Square", value: "square" },
            ]}
            onChange={(v) => update("shape", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="Values" subtitle="Core progress values">
        <ControlGroup label="Progress Value">
          <SliderControl
            value={state.value}
            min={state.min}
            max={state.max}
            step={1}
            onChange={(v) => update("value", Number(v))}
          />
        </ControlGroup>

        {state.mode === "buffer" && (
          <ControlGroup label="Buffer Value">
            <SliderControl
              value={state.bufferValue}
              min={state.min}
              max={state.max}
              step={1}
              onChange={(v) => update("bufferValue", Number(v))}
            />
          </ControlGroup>
        )}

        {state.mode === "determinate" && (
          <ControlGroup label="Success Percent (0 = off)">
            <SliderControl
              value={state.successPercent}
              min={0}
              max={state.value}
              step={1}
              onChange={(v) => update("successPercent", Number(v))}
            />
          </ControlGroup>
        )}
      </Section>

      <Section title="Mode & Layout" subtitle="Behavior and orientation">
        <ControlGroup label="Mode">
          <SelectControl
            value={state.mode}
            options={[
              { label: "Determinate", value: "determinate" },
              { label: "Indeterminate (Loading)", value: "indeterminate" },
              { label: "Buffer (Streaming)", value: "buffer" },
              { label: "Steps (Segmented)", value: "steps" },
              { label: "Timer (Countdown)", value: "timer" },
            ]}
            onChange={(v) => update("mode", v)}
          />
        </ControlGroup>

        <ControlGroup label="Orientation">
          <SelectControl
            value={state.orientation}
            options={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
            onChange={(v) => update("orientation", v)}
          />
        </ControlGroup>

        <ControlGroup label="Direction">
          <SelectControl
            value={state.direction}
            options={[
              { label: "Left to Right", value: "ltr" },
              { label: "Right to Left (RTL)", value: "rtl" },
            ]}
            onChange={(v) => update("direction", v)}
          />
        </ControlGroup>

        {state.mode === "steps" && (
          <ControlGroup label="Step Count">
            <SliderControl
              value={state.stepCount}
              min={2}
              max={20}
              step={1}
              onChange={(v) => update("stepCount", Number(v))}
            />
          </ControlGroup>
        )}

        {state.mode === "timer" && (
          <ControlGroup label="Timer Duration (sec)">
            <SliderControl
              value={state.timerDuration}
              min={1}
              max={60}
              step={1}
              onChange={(v) => update("timerDuration", Number(v))}
            />
          </ControlGroup>
        )}
      </Section>

      <Section title="Status" subtitle="Visual state indicators">
        <ControlGroup label="Status">
          <SelectControl
            value={state.status}
            options={[
              { label: "Normal", value: "normal" },
              { label: "Active (Pulsing)", value: "active" },
              { label: "Success (Green)", value: "success" },
              { label: "Error (Red)", value: "error" },
              { label: "Warning (Amber)", value: "warning" },
            ]}
            onChange={(v) => update("status", v)}
          />
        </ControlGroup>

        <ControlGroup label="Show Status Icon">
          <SwitchControl
            checked={state.showStatusIcon}
            onChange={(v) => update("showStatusIcon", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
