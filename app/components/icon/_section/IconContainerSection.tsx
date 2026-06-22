"use client";

import React from "react";
import { type IconFloatSetter, type IconSetter, type IconState } from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Switch from "@/app/components/controls/input/Switch";

export default function IconContainerSection({
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
      <SectionCard
        title="Surface"
        subtitle="Container shape and framing."
      >
        <div className="space-y-4">
          <SegmentedControl
            value={state.shape}
            onChange={(value) => setKey("shape")(value as IconState["shape"])}
            items={[
              { value: "none", label: "None" },
              { value: "square", label: "Square" },
              { value: "circle", label: "Circle" },
              { value: "rounded", label: "Rounded" },
              { value: "squircle", label: "Squircle" },
            ]}
          />

          {state.shape !== "none" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <SizeControl
                  label="Dimensions"
                  value={state.containerSize}
                  onChange={setFloat("containerSize")}
                  min={24}
                  max={400}
                  unit="px"
                />
                <SizeControl
                  label="Padding"
                  value={state.containerPadding}
                  onChange={setFloat("containerPadding")}
                  min={0}
                  max={100}
                  unit="px"
                />
              </div>

              <ColorControl
                label="Background Color"
                value={state.containerColor}
                onChange={setKey("containerColor")}
              />
              <SizeControl
                label="Background Opacity"
                value={state.containerOpacity}
                onChange={setFloat("containerOpacity")}
                min={0}
                max={1}
                step={0.05}
              />
            </>
          )}
        </div>
      </SectionCard>

      {state.shape !== "none" && (
        <>
          <SectionCard title="Glass" subtitle="Backdrop blur and translucency.">
            <div className="space-y-4">
              <SizeControl
                label="Blur Amount"
                value={state.glassBlur}
                onChange={setFloat("glassBlur")}
                min={0}
                max={40}
                unit="px"
              />
              <SizeControl
                label="Backdrop Opacity"
                value={state.glassOpacity}
                onChange={setFloat("glassOpacity")}
                min={0}
                max={1}
                step={0.05}
              />
            </div>
          </SectionCard>

          <SectionCard title="Surface Effects" subtitle="Reflection and soft depth.">
            <div className="space-y-4">
              <Switch
                label="Reflection Overlay"
                checked={state.reflectionEnabled}
                onChange={setKey("reflectionEnabled")}
              />
              <Switch
                label="Neumorphic Surface"
                checked={state.neumorphic}
                onChange={setKey("neumorphic")}
              />
              {state.neumorphic && (
                <LabeledField label="Neumorphic Depth">
                  <SegmentedControl
                    value={state.neumorphicElevation}
                    onChange={(value) =>
                      setKey("neumorphicElevation")(
                        value as IconState["neumorphicElevation"],
                      )
                    }
                    items={[
                      { value: "flat", label: "Flat" },
                      { value: "pressed", label: "Pressed" },
                      { value: "convex", label: "Convex" },
                      { value: "concave", label: "Concave" },
                    ]}
                  />
                </LabeledField>
              )}
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
}
