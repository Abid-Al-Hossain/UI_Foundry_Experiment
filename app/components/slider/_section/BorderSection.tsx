"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { SliderState } from "../types";

type Props = { state: SliderState; update: <K extends keyof SliderState>(key: K, value: SliderState[K]) => void };

const BORDER_STYLE_OPTIONS = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
  { value: "none", label: "None" },
];

export default function BorderSection({ state, update }: Props) {
  return (
    <SectionCard title="Border" subtitle="Width, style, and color.">
      <div className="space-y-4">
        <LabeledField label={`Width: ${state.borderWidth}px`}>
          <Slider value={state.borderWidth} min={0} max={10} step={1} onChange={(v) => update("borderWidth", v)} />
        </LabeledField>
        <LabeledField label="Style">
          <Select
            value={state.borderStyle}
            onChange={(v) => update("borderStyle", v as SliderState["borderStyle"])}
            options={BORDER_STYLE_OPTIONS}
          />
        </LabeledField>
        {state.borderWidth > 0 && (
          <ColorControl label="Color" value={state.border} onChange={(v) => update("border", v)} />
        )}
      </div>
    </SectionCard>
  );
}
