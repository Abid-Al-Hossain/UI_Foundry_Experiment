"use client";

import React from "react";
import { type IconState } from "../types";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import SliderControl from "@/app/components/controls/input/Slider";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Switch from "@/app/components/controls/input/Switch";

export default function IconTransformSection({
  state,
  setKey,
  setFloat,
}: {
  state: IconState;
  setKey: (key: keyof IconState) => (val: any) => void;
  setFloat: (key: keyof IconState) => (val: any) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Transform" subtitle="Rotate and flip the icon.">
        <div className="space-y-4">
          <LabeledField label="Rotation (deg)">
            <SliderControl
              value={state.rotation}
              onChange={setFloat("rotation")}
              min={0}
              max={360}
              step={5}
            />
          </LabeledField>

          <div className="grid grid-cols-2 gap-4">
            <Switch
              label="Flip Horizontal"
              checked={state.flipHorizontal}
              onChange={(v) => setKey("flipHorizontal")(v)}
            />
            <Switch
              label="Flip Vertical"
              checked={state.flipVertical}
              onChange={(v) => setKey("flipVertical")(v)}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
