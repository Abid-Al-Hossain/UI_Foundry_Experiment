import React from "react";
import {
  type TextDecoration,
  type TextDecorationStyle,
  type TypographyState,
  type TypographyUpdater,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

const DECORATION_OPTIONS: { label: string; value: TextDecoration }[] = [
  { label: "None", value: "none" },
  { label: "Underline", value: "underline" },
  { label: "Overline", value: "overline" },
  { label: "Line-through", value: "line-through" },
];

const DECORATION_STYLE_OPTIONS: {
  label: string;
  value: TextDecorationStyle;
}[] = [
  { label: "Solid", value: "solid" },
  { label: "Double", value: "double" },
  { label: "Dotted", value: "dotted" },
  { label: "Dashed", value: "dashed" },
  { label: "Wavy", value: "wavy" },
];

export default function DecorationSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Decoration" subtitle="Underline, overline, and strike treatments.">
        <ControlGroup label="Decoration">
          <SelectControl
            value={state.textDecoration}
            options={DECORATION_OPTIONS}
            onChange={(value) => update("textDecoration", value as TextDecoration)}
          />
        </ControlGroup>

        {state.textDecoration !== "none" ? (
          <>
            <ControlGroup label="Style">
              <SelectControl
                value={state.textDecorationStyle}
                options={DECORATION_STYLE_OPTIONS}
                onChange={(value) =>
                  update("textDecorationStyle", value as TextDecorationStyle)
                }
              />
            </ControlGroup>

            <ControlGroup label="Thickness (px)">
              <SliderControl
                value={state.textDecorationThickness}
                min={1}
                max={10}
                step={1}
                onChange={(value) =>
                  update("textDecorationThickness", Number(value))
                }
              />
            </ControlGroup>

            <ControlGroup label="Color">
              <ColorControl
                label="Decoration Color"
                value={state.textDecorationColor}
                onChange={(value: string) => update("textDecorationColor", value)}
              />
            </ControlGroup>
          </>
        ) : null}
      </Section>
    </div>
  );
}
