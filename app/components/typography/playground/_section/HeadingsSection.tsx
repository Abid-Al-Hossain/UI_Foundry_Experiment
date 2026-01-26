import React from "react";
import {
  type TypographyState,
  type HeadingConfig,
  type FontWeight,
  type TextTransform,
  SCALE_RATIO_VALUES,
} from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";

type Props = {
  state: TypographyState;
  update: (key: keyof TypographyState, value: any) => void;
  selectedLevel: 1 | 2 | 3 | 4 | 5 | 6;
  setSelectedLevel: (v: 1 | 2 | 3 | 4 | 5 | 6) => void;
};

const WEIGHT_OPTIONS: { label: string; value: FontWeight }[] = [
  { label: "100 - Thin", value: 100 },
  { label: "200 - Extra Light", value: 200 },
  { label: "300 - Light", value: 300 },
  { label: "400 - Regular", value: 400 },
  { label: "500 - Medium", value: 500 },
  { label: "600 - Semibold", value: 600 },
  { label: "700 - Bold", value: 700 },
  { label: "800 - Extra Bold", value: 800 },
  { label: "900 - Black", value: 900 },
];

const TRANSFORM_OPTIONS: { label: string; value: TextTransform }[] = [
  { label: "None", value: "none" },
  { label: "Uppercase", value: "uppercase" },
  { label: "Lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" },
];

export default function HeadingsSection({
  state,
  update,
  selectedLevel,
  setSelectedLevel,
}: Props) {
  const currentHeading = state.headings.find((h) => h.level === selectedLevel);

  const updateHeading = (field: keyof HeadingConfig, value: any) => {
    const newHeadings = state.headings.map((h) =>
      h.level === selectedLevel ? { ...h, [field]: value } : h,
    );
    update("headings", newHeadings);
  };

  const regenerateFromScale = () => {
    const ratio =
      state.scaleRatio === "custom"
        ? state.customRatio
        : SCALE_RATIO_VALUES[state.scaleRatio];

    const newHeadings = state.headings.map((h) => {
      const scale = Math.pow(ratio, 7 - h.level);
      return {
        ...h,
        fontSize: Math.round(state.baseSize * scale * 100) / 100,
        fontSizeUnit: state.baseSizeUnit,
      };
    });
    update("headings", newHeadings);
  };

  if (!currentHeading) return null;

  return (
    <div className="space-y-6">
      <Section title="Heading Level" subtitle="Select and customize H1-H6">
        <ControlGroup label="Select Heading">
          <div className="grid grid-cols-6 gap-2">
            {([1, 2, 3, 4, 5, 6] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                className="py-2 px-3 rounded-lg border text-sm font-semibold transition-all"
                style={{
                  borderColor: "var(--border)",
                  background:
                    selectedLevel === level ? "var(--primary)" : "transparent",
                  color: selectedLevel === level ? "white" : "var(--text)",
                }}
              >
                H{level}
              </button>
            ))}
          </div>
        </ControlGroup>

        <button
          type="button"
          onClick={regenerateFromScale}
          className="w-full py-2 px-4 rounded-lg border text-sm font-medium transition-all hover:bg-[var(--card)]"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          🔄 Regenerate from Scale
        </button>
      </Section>

      <Section
        title={`H${selectedLevel} Settings`}
        subtitle="Customize this heading level"
      >
        <ControlGroup label="Font Size">
          <SliderControl
            value={currentHeading.fontSize}
            min={0.5}
            max={6}
            step={0.0625}
            onChange={(v) => updateHeading("fontSize", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Font Weight">
          <SelectControl
            value={String(currentHeading.fontWeight)}
            options={WEIGHT_OPTIONS.map((o) => ({
              ...o,
              value: String(o.value),
            }))}
            onChange={(v) => updateHeading("fontWeight", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Line Height">
          <SliderControl
            value={currentHeading.lineHeight}
            min={0.8}
            max={2}
            step={0.05}
            onChange={(v) => updateHeading("lineHeight", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Letter Spacing (em)">
          <SliderControl
            value={currentHeading.letterSpacing}
            min={-0.1}
            max={0.2}
            step={0.005}
            onChange={(v) => updateHeading("letterSpacing", Number(v))}
          />
        </ControlGroup>

        <ControlGroup label="Text Transform">
          <SelectControl
            value={currentHeading.textTransform}
            options={TRANSFORM_OPTIONS}
            onChange={(v) => updateHeading("textTransform", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
