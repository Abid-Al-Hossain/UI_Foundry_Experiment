import React from "react";
import {
  type TypographyState,
  type TextAlign,
  type TextTransform,
  type TextDecoration,
  type TextDecorationStyle,
  type TextOverflow,
  type WhiteSpace,
  type Direction,
} from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";
import SliderControl from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: (key: keyof TypographyState, value: any) => void;
};

const ALIGN_OPTIONS: { label: string; value: TextAlign }[] = [
  { label: "Left", value: "left" },
  { label: "Center", value: "center" },
  { label: "Right", value: "right" },
  { label: "Justify", value: "justify" },
];

const TRANSFORM_OPTIONS: { label: string; value: TextTransform }[] = [
  { label: "None", value: "none" },
  { label: "Uppercase", value: "uppercase" },
  { label: "Lowercase", value: "lowercase" },
  { label: "Capitalize", value: "capitalize" },
];

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

const OVERFLOW_OPTIONS: { label: string; value: TextOverflow }[] = [
  { label: "Clip", value: "clip" },
  { label: "Ellipsis", value: "ellipsis" },
];

const WHITESPACE_OPTIONS: { label: string; value: WhiteSpace }[] = [
  { label: "Normal", value: "normal" },
  { label: "No Wrap", value: "nowrap" },
  { label: "Pre", value: "pre" },
  { label: "Pre Wrap", value: "pre-wrap" },
  { label: "Pre Line", value: "pre-line" },
];

const DIRECTION_OPTIONS: { label: string; value: Direction }[] = [
  { label: "LTR (Left to Right)", value: "ltr" },
  { label: "RTL (Right to Left)", value: "rtl" },
];

export default function DecorationSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Text Alignment" subtitle="Horizontal alignment">
        <ControlGroup label="Text Align">
          <SelectControl
            value={state.textAlign}
            options={ALIGN_OPTIONS}
            onChange={(v) => update("textAlign", v)}
          />
        </ControlGroup>

        <ControlGroup label="Direction">
          <SelectControl
            value={state.direction}
            options={DIRECTION_OPTIONS}
            onChange={(v) => update("direction", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="Text Transform" subtitle="Case modification">
        <ControlGroup label="Transform">
          <SelectControl
            value={state.textTransform}
            options={TRANSFORM_OPTIONS}
            onChange={(v) => update("textTransform", v)}
          />
        </ControlGroup>
      </Section>

      <Section title="Text Decoration" subtitle="Lines and emphasis">
        <ControlGroup label="Decoration">
          <SelectControl
            value={state.textDecoration}
            options={DECORATION_OPTIONS}
            onChange={(v) => update("textDecoration", v)}
          />
        </ControlGroup>

        {state.textDecoration !== "none" && (
          <>
            <ControlGroup label="Style">
              <SelectControl
                value={state.textDecorationStyle}
                options={DECORATION_STYLE_OPTIONS}
                onChange={(v) => update("textDecorationStyle", v)}
              />
            </ControlGroup>

            <ControlGroup label="Thickness (px)">
              <SliderControl
                value={state.textDecorationThickness}
                min={1}
                max={10}
                step={1}
                onChange={(v) => update("textDecorationThickness", Number(v))}
              />
            </ControlGroup>

            <ControlGroup label="Color">
              <ColorControl
                label="Decoration Color"
                value={state.textDecorationColor}
                onChange={(v: string) => update("textDecorationColor", v)}
              />
            </ControlGroup>
          </>
        )}
      </Section>

      <Section title="Text Shadow" subtitle="Drop shadow effect">
        <ControlGroup label="Enable Shadow">
          <Switch
            checked={state.textShadowEnabled}
            onChange={(v: boolean) => update("textShadowEnabled", v)}
          />
        </ControlGroup>

        {state.textShadowEnabled && (
          <>
            <ControlGroup label="Offset X (px)">
              <SliderControl
                value={state.textShadowX}
                min={-20}
                max={20}
                step={1}
                onChange={(v) => update("textShadowX", Number(v))}
              />
            </ControlGroup>

            <ControlGroup label="Offset Y (px)">
              <SliderControl
                value={state.textShadowY}
                min={-20}
                max={20}
                step={1}
                onChange={(v) => update("textShadowY", Number(v))}
              />
            </ControlGroup>

            <ControlGroup label="Blur (px)">
              <SliderControl
                value={state.textShadowBlur}
                min={0}
                max={30}
                step={1}
                onChange={(v) => update("textShadowBlur", Number(v))}
              />
            </ControlGroup>

            <ControlGroup label="Shadow Color">
              <ColorControl
                label="Shadow Color"
                value={state.textShadowColor}
                onChange={(v: string) => update("textShadowColor", v)}
              />
            </ControlGroup>
          </>
        )}
      </Section>

      <Section title="Text Overflow" subtitle="Handling long text">
        <ControlGroup label="Overflow">
          <SelectControl
            value={state.textOverflow}
            options={OVERFLOW_OPTIONS}
            onChange={(v) => update("textOverflow", v)}
          />
        </ControlGroup>

        <ControlGroup label="White Space">
          <SelectControl
            value={state.whiteSpace}
            options={WHITESPACE_OPTIONS}
            onChange={(v) => update("whiteSpace", v)}
          />
        </ControlGroup>
      </Section>
    </div>
  );
}
