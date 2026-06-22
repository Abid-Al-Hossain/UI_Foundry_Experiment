"use client";

import React from "react";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SliderControl from "@/app/components/controls/input/Slider";
import SwitchControl from "@/app/components/controls/input/Switch";

type Props = {
  interactive: boolean;
  hoverScale: number;
  setHoverScale: (v: number) => void;
  clickRipple: boolean;
  setClickRipple: (v: boolean) => void;
  icon3DEnabled: boolean;
  icon3DSpinSpeed: number;
  setIcon3DSpinSpeed: (v: number) => void;
};

export default function BadgeMotionSection({
  interactive,
  hoverScale,
  setHoverScale,
  clickRipple,
  setClickRipple,
  icon3DEnabled,
  icon3DSpinSpeed,
  setIcon3DSpinSpeed,
}: Props) {
  return (
    <div className="space-y-6">
      <Section
        title="Motion"
        subtitle="Hover, press, and 3D overlay movement that remains badge-native."
      >
        <div className="space-y-4">
          <ControlGroup label="Click Ripple">
            <SwitchControl checked={clickRipple} onChange={setClickRipple} />
          </ControlGroup>

          {interactive ? (
            <ControlGroup label="Hover Scale">
              <SliderControl
                value={hoverScale}
                min={0.95}
                max={1.2}
                step={0.01}
                onChange={(v) => setHoverScale(Number(v))}
              />
            </ControlGroup>
          ) : null}

          {icon3DEnabled ? (
            <ControlGroup label="3D Icon Spin Speed">
              <SliderControl
                value={icon3DSpinSpeed}
                min={0}
                max={5}
                step={0.1}
                onChange={(v) => setIcon3DSpinSpeed(Number(v))}
              />
            </ControlGroup>
          ) : null}
        </div>
      </Section>
    </div>
  );
}
