import React from "react";
import {
  type TypographyState,
  type BodyConfig,
  type FontWeight,
} from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";

type BodyStyle = "body" | "lead" | "small" | "caption";

type Props = {
  state: TypographyState;
  update: (key: keyof TypographyState, value: any) => void;
  selectedStyle: BodyStyle;
  setSelectedStyle: (v: BodyStyle) => void;
};

const BODY_STYLES: { id: BodyStyle; label: string; desc: string }[] = [
  { id: "body", label: "Body", desc: "Default paragraph text" },
  { id: "lead", label: "Lead", desc: "Introduction paragraphs" },
  { id: "small", label: "Small", desc: "Secondary text" },
  { id: "caption", label: "Caption", desc: "Image captions, labels" },
];

const WEIGHT_OPTIONS: { label: string; value: FontWeight }[] = [
  { label: "300 - Light", value: 300 },
  { label: "400 - Regular", value: 400 },
  { label: "500 - Medium", value: 500 },
  { label: "600 - Semibold", value: 600 },
  { label: "700 - Bold", value: 700 },
];

export default function BodySection({
  state,
  update,
  selectedStyle,
  setSelectedStyle,
}: Props) {
  const currentConfig = state[selectedStyle] as BodyConfig;

  const updateConfig = (field: keyof BodyConfig, value: any) => {
    update(selectedStyle, { ...currentConfig, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Section title="Body Styles" subtitle="Select a text style to customize">
        <div className="grid grid-cols-2 gap-2">
          {BODY_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setSelectedStyle(style.id)}
              className="py-3 px-4 rounded-lg border text-left transition-all"
              style={{
                borderColor: "var(--border)",
                background:
                  selectedStyle === style.id ? "var(--primary)" : "transparent",
                color: selectedStyle === style.id ? "white" : "var(--text)",
              }}
            >
              <div className="font-semibold text-sm">{style.label}</div>
              <div
                className="text-xs mt-0.5"
                style={{
                  opacity: selectedStyle === style.id ? 0.8 : 0.6,
                }}
              >
                {style.desc}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title={`${selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Settings`}
        subtitle="Customize this text style"
      >
        <ControlGroup label="Font Size">
          <SliderControl
            value={currentConfig.fontSize}
            min={0.5}
            max={2}
            step={0.0625}
            onChange={(v) => updateConfig("fontSize", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Font Weight">
          <SelectControl
            value={String(currentConfig.fontWeight)}
            options={WEIGHT_OPTIONS.map((o) => ({
              ...o,
              value: String(o.value),
            }))}
            onChange={(v) => updateConfig("fontWeight", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Line Height">
          <SliderControl
            value={currentConfig.lineHeight}
            min={1}
            max={2.5}
            step={0.05}
            onChange={(v) => updateConfig("lineHeight", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Letter Spacing (em)">
          <SliderControl
            value={currentConfig.letterSpacing}
            min={-0.05}
            max={0.1}
            step={0.005}
            onChange={(v) => updateConfig("letterSpacing", Number(v))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
