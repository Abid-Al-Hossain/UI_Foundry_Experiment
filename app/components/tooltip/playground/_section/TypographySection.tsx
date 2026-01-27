"use client";

import React from "react";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

import { TooltipState } from "../../types";

// Font options
const FONT_WEIGHT_OPTIONS = [
  { value: "300", label: "Light" },
  { value: "400", label: "Regular" },
  { value: "500", label: "Medium" },
  { value: "600", label: "Semibold" },
  { value: "700", label: "Bold" },
];

const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const FONT_FAMILY_OPTIONS = [
  { value: "system-ui, -apple-system, sans-serif", label: "System" },
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "'SF Pro', sans-serif", label: "SF Pro" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Fira Code', monospace", label: "Fira Code" },
];

interface TypographySectionProps {
  state: TooltipState;
  update: <K extends keyof TooltipState>(
    key: K,
    value: TooltipState[K],
  ) => void;
}

export default function TypographySection({
  state,
  update,
}: TypographySectionProps) {
  return (
    <div className="space-y-4">
      {/* Font Family */}
      <SectionCard title="Font Family" subtitle="Choose the tooltip font">
        <LabeledField label="Font">
          <Select
            value={state.fontFamily}
            onChange={(v) => update("fontFamily", v)}
            options={FONT_FAMILY_OPTIONS}
          />
        </LabeledField>
      </SectionCard>

      {/* Font Size & Weight */}
      <SectionCard title="Size & Weight" subtitle="Control text appearance">
        <div className="space-y-4">
          <LabeledField label={`Font Size: ${state.fontSize}px`}>
            <Slider
              value={state.fontSize}
              onChange={(v) => update("fontSize", Number(v))}
              min={10}
              max={24}
              step={1}
            />
          </LabeledField>

          <LabeledField label="Font Weight">
            <Select
              value={String(state.fontWeight)}
              onChange={(v) => update("fontWeight", Number(v))}
              options={FONT_WEIGHT_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* Text Alignment */}
      <SectionCard title="Alignment" subtitle="Text alignment within tooltip">
        <SegmentedControl
          value={state.textAlign}
          onChange={(v) =>
            update("textAlign", v as "left" | "center" | "right")
          }
          items={TEXT_ALIGN_OPTIONS}
        />
      </SectionCard>

      {/* Typography Preview */}
      <SectionCard title="Preview" subtitle="How your text will look">
        <div
          className="p-4 rounded-xl"
          style={{
            background: state.bgColor,
            color: state.textColor,
            fontFamily: state.fontFamily,
            fontSize: `${state.fontSize}px`,
            fontWeight: state.fontWeight,
            textAlign: state.textAlign,
          }}
        >
          {state.content || "Preview text"}
        </div>
      </SectionCard>
    </div>
  );
}
