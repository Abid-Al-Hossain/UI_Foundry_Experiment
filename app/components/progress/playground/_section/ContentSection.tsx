import React from "react";
import { type ProgressState } from "../../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SwitchControl from "@/app/components/controls/input/Switch";
import SelectControl from "@/app/components/controls/input/Select";
import InputControl from "@/app/components/controls/input/Input";
import SliderControl from "@/app/components/controls/input/Slider";
import IconPickerControl, {
  type IconSource,
} from "@/app/components/controls/layout/IconPickerControl";

type Props = {
  state: ProgressState;
  update: (key: keyof ProgressState, value: any) => void;
};

// Position options - 9 point grid plus inside (follows progress)
const POSITION_OPTIONS = [
  { label: "↖ Top Left", value: "top-left" },
  { label: "↑ Top Center", value: "top-center" },
  { label: "↗ Top Right", value: "top-right" },
  { label: "← Center Left", value: "center-left" },
  { label: "● Center", value: "center" },
  { label: "→ Center Right", value: "center-right" },
  { label: "↙ Bottom Left", value: "bottom-left" },
  { label: "↓ Bottom Center", value: "bottom-center" },
  { label: "↘ Bottom Right", value: "bottom-right" },
  { label: "◐ Inside (Follows Progress)", value: "inside" },
];

export default function ContentSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Labels" subtitle="Progress indicator display">
        <ControlGroup label="Show Label">
          <SwitchControl
            checked={state.showLabel}
            onChange={(v) => update("showLabel", v)}
          />
        </ControlGroup>

        {state.showLabel && (
          <>
            <ControlGroup label="Label Type">
              <SelectControl
                value={state.labelType}
                options={[
                  { label: "Text (Percent/Value)", value: "text" },
                  { label: "Icon (Library/Custom SVG)", value: "icon" },
                  { label: "Animated Indicator", value: "animated" },
                ]}
                onChange={(v) => update("labelType", v)}
              />
            </ControlGroup>

            {/* Position - Common for all label types */}
            <ControlGroup label="Position">
              <SelectControl
                value={state.labelPosition}
                options={POSITION_OPTIONS}
                onChange={(v) => update("labelPosition", v)}
              />
            </ControlGroup>

            {/* Text Label Options */}
            {state.labelType === "text" && (
              <>
                <ControlGroup label="Format">
                  <SelectControl
                    value={state.labelFormat}
                    options={[
                      { label: "Percent (%)", value: "percent" },
                      { label: "Fraction (Val/Max)", value: "fraction" },
                      { label: "Raw Value", value: "value" },
                      { label: "Custom Text", value: "custom" },
                    ]}
                    onChange={(v) => update("labelFormat", v)}
                  />
                </ControlGroup>

                {state.labelFormat === "custom" && (
                  <ControlGroup label="Custom Text">
                    <InputControl
                      value={state.customLabel}
                      onChange={(v) => update("customLabel", v)}
                      placeholder="e.g. Loading..."
                    />
                  </ControlGroup>
                )}
              </>
            )}

            {/* Icon Label Options */}
            {state.labelType === "icon" && (
              <>
                <IconPickerControl
                  label="Progress Icon"
                  source={state.iconSource as IconSource}
                  setSource={(v) => update("iconSource", v)}
                  name={state.iconName}
                  setName={(v) => update("iconName", v)}
                  customSvg={state.customSvg}
                  setCustomSvg={(v) => update("customSvg", v)}
                  allowNone={false}
                />

                <ControlGroup label="Icon Size (px)">
                  <SliderControl
                    value={state.indicatorSize}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(v) => update("indicatorSize", Number(v))}
                  />
                </ControlGroup>
              </>
            )}

            {/* Animated Indicator Options */}
            {state.labelType === "animated" && (
              <>
                <ControlGroup label="Animated Indicator">
                  <SelectControl
                    value={state.animatedIndicator}
                    options={[
                      { label: "None", value: "none" },
                      { label: "🚶 Walking Person", value: "walking-person" },
                      { label: "🐕 Running Dog", value: "running-dog" },
                      { label: "🐦 Flying Bird", value: "flying-bird" },
                      { label: "🐟 Swimming Fish", value: "swimming-fish" },
                      { label: "🐌 Crawling Snail", value: "crawling-snail" },
                      { label: "⚽ Bouncing Ball", value: "bouncing-ball" },
                      { label: "⭐ Spinning Star", value: "spinning-star" },
                      { label: "🚀 Rocket", value: "rocket" },
                      { label: "🚗 Car", value: "car" },
                      { label: "🚲 Bicycle", value: "bicycle" },
                    ]}
                    onChange={(v) => update("animatedIndicator", v)}
                  />
                </ControlGroup>

                <ControlGroup label="Indicator Size (px)">
                  <SliderControl
                    value={state.indicatorSize}
                    min={16}
                    max={64}
                    step={4}
                    onChange={(v) => update("indicatorSize", Number(v))}
                  />
                </ControlGroup>
              </>
            )}
          </>
        )}
      </Section>
    </div>
  );
}
