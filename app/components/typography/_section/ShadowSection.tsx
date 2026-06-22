import React from "react";
import {
  type TypographyState,
  type TypographyUpdater,
} from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";

type Props = {
  state: TypographyState;
  update: TypographyUpdater;
};

export default function ShadowSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Shadow" subtitle="Subtle depth and readability effects.">
        <ControlGroup label="Enable Shadow">
          <Switch
            checked={state.textShadowEnabled}
            onChange={(value: boolean) => update("textShadowEnabled", value)}
          />
        </ControlGroup>

        {state.textShadowEnabled ? (
          <>
            <ControlGroup label="Offset X (px)">
              <SliderControl
                value={state.textShadowX}
                min={-20}
                max={20}
                step={1}
                onChange={(value) => update("textShadowX", Number(value))}
              />
            </ControlGroup>

            <ControlGroup label="Offset Y (px)">
              <SliderControl
                value={state.textShadowY}
                min={-20}
                max={20}
                step={1}
                onChange={(value) => update("textShadowY", Number(value))}
              />
            </ControlGroup>

            <ControlGroup label="Blur (px)">
              <SliderControl
                value={state.textShadowBlur}
                min={0}
                max={30}
                step={1}
                onChange={(value) => update("textShadowBlur", Number(value))}
              />
            </ControlGroup>

            <ControlGroup label="Shadow Color">
              <ColorControl
                label="Shadow Color"
                value={state.textShadowColor}
                onChange={(value: string) => update("textShadowColor", value)}
              />
            </ControlGroup>
          </>
        ) : null}
      </Section>
    </div>
  );
}
