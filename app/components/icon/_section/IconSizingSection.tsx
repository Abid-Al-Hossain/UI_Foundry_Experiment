"use client";

import React from "react";
import {
  type IconFloatSetter,
  type IconState,
} from "../types";
import SizeControl from "@/app/components/controls/input/SizeControl";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";

export default function IconSizingSection({
  state,
  setFloat,
}: {
  state: IconState;
  setFloat: IconFloatSetter;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Sizing" subtitle="Icon scale, stroke, and transparency.">
        <div className="grid grid-cols-2 gap-4">
          <SizeControl
            label="Size"
            value={state.size}
            onChange={setFloat("size")}
            min={12}
            max={256}
            unit="px"
          />
          <SizeControl
            label="Stroke Width"
            value={state.strokeWidth}
            onChange={setFloat("strokeWidth")}
            min={0.5}
            max={4}
            step={0.1}
            unit="px"
          />
          <SizeControl
            label="Fill Opacity"
            value={state.fillOpacity}
            onChange={setFloat("fillOpacity")}
            min={0}
            max={1}
            step={0.05}
          />
          <SizeControl
            label="Overall Opacity"
            value={state.opacity}
            onChange={setFloat("opacity")}
            min={0}
            max={1}
            step={0.05}
          />
        </div>
      </SectionCard>
    </div>
  );
}
