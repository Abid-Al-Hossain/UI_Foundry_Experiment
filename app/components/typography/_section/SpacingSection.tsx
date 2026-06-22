import React from "react";
import { type TypographyState, type TypographyUpdater } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function SpacingSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Line Height" subtitle="Vertical rhythm">
        <ControlGroup label="Default Line Height">
          <SliderControl
            value={state.defaultLineHeight}
            min={1}
            max={2.5}
            step={0.05}
            onChange={(v) => update("defaultLineHeight", Number(v))}
          />
        </ControlGroup>
      </Section>

      <Section title="Letter Spacing" subtitle="Character spacing (tracking)">
        <ControlGroup label="Unit">
          <SegmentedControl
            value={state.defaultLetterSpacingUnit}
            onChange={(v) =>
              update("defaultLetterSpacingUnit", v as "px" | "em")
            }
            items={[
              { value: "em", label: "em" },
              { value: "px", label: "px" },
            ]}
          />
        </ControlGroup>

        <ControlGroup label="Default Letter Spacing">
          <SliderControl
            value={state.defaultLetterSpacing}
            min={state.defaultLetterSpacingUnit === "em" ? -0.1 : -5}
            max={state.defaultLetterSpacingUnit === "em" ? 0.3 : 10}
            step={state.defaultLetterSpacingUnit === "em" ? 0.005 : 0.5}
            onChange={(v) => update("defaultLetterSpacing", Number(v))}
          />
        </ControlGroup>
      </Section>

      <Section title="Word Spacing" subtitle="Space between words">
        <ControlGroup label="Unit">
          <SegmentedControl
            value={state.defaultWordSpacingUnit}
            onChange={(v) =>
              update("defaultWordSpacingUnit", v as "px" | "em")
            }
            items={[
              { value: "em", label: "em" },
              { value: "px", label: "px" },
            ]}
          />
        </ControlGroup>

        <ControlGroup label="Default Word Spacing">
          <SliderControl
            value={state.defaultWordSpacing}
            min={state.defaultWordSpacingUnit === "em" ? -0.2 : -10}
            max={state.defaultWordSpacingUnit === "em" ? 1 : 20}
            step={state.defaultWordSpacingUnit === "em" ? 0.05 : 1}
            onChange={(v) => update("defaultWordSpacing", Number(v))}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
