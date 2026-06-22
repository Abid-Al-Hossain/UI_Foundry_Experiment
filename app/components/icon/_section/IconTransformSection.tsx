"use client";

import React from "react";
import { type IconFloatSetter, type IconSetter, type IconState } from "../types";
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
  setKey: IconSetter;
  setFloat: IconFloatSetter;
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

      <SectionCard title="3D Transform" subtitle="Perspective and depth.">
        <div className="space-y-4">
          <Switch
            label="Enable 3D"
            checked={state.use3D}
            onChange={(value) => setKey("use3D")(value)}
          />

          {state.use3D ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                <LabeledField label="Rotate X (deg)">
                  <SliderControl
                    value={state.rotateX}
                    onChange={setFloat("rotateX")}
                    min={-180}
                    max={180}
                    step={5}
                  />
                </LabeledField>
                <LabeledField label="Rotate Y (deg)">
                  <SliderControl
                    value={state.rotateY}
                    onChange={setFloat("rotateY")}
                    min={-180}
                    max={180}
                    step={5}
                  />
                </LabeledField>
                <LabeledField label="Rotate Z (deg)">
                  <SliderControl
                    value={state.rotateZ}
                    onChange={setFloat("rotateZ")}
                    min={-180}
                    max={180}
                    step={5}
                  />
                </LabeledField>
              </div>

              <LabeledField label="Perspective (px)">
                <SliderControl
                  value={state.perspective}
                  onChange={setFloat("perspective")}
                  min={100}
                  max={2000}
                  step={25}
                />
              </LabeledField>

              <LabeledField label="Depth">
                <SliderControl
                  value={state.depth}
                  onChange={setFloat("depth")}
                  min={0}
                  max={80}
                  step={1}
                />
              </LabeledField>
            </>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}
