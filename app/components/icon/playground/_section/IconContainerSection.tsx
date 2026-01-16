"use client";

import React from "react";
import { type IconState, type IconShape } from "../types";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";

export default function IconContainerSection({
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
      <SectionCard
        title="Container Shape"
        subtitle="Background shape geometry."
      >
        <div className="space-y-4">
          <SegmentedControl
            value={state.shape}
            onChange={(v) => setKey("shape")(v)}
            items={[
              { value: "none", label: "None" },
              { value: "square", label: "Square" },
              { value: "circle", label: "Circle" },
              { value: "rounded", label: "Rounded" },
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
            </>
          )}
        </div>
      </SectionCard>

      {state.shape !== "none" && (
        <>
          <SectionCard title="Border" subtitle="Outline styling.">
            <div className="space-y-4">
              <LabeledField label="Style">
                <select
                  value={state.borderStyle}
                  onChange={(e) => setKey("borderStyle")(e.target.value)}
                  className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
                  style={{
                    borderColor: "var(--border)",
                    background:
                      "color-mix(in oklab, var(--surface) 70%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </LabeledField>

              <div className="grid grid-cols-2 gap-4">
                <SizeControl
                  label="Width"
                  value={state.borderWidth}
                  onChange={setFloat("borderWidth")}
                  min={0}
                  max={10}
                  unit="px"
                />
                {state.shape === "rounded" && (
                  <SizeControl
                    label="Radius"
                    value={state.borderRadius}
                    onChange={setFloat("borderRadius")}
                    min={0}
                    max={100}
                    unit="px"
                  />
                )}
              </div>
              <ColorControl
                label="Border Color"
                value={state.borderColor}
                onChange={setKey("borderColor")}
              />
            </div>
          </SectionCard>

          <SectionCard title="Glassmorphism" subtitle="Backdrop blur effect.">
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
        </>
      )}
    </div>
  );
}
