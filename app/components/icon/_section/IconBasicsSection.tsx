"use client";

import React from "react";
import { type IconSetter, type IconState } from "../types";
import Switch from "@/app/components/controls/input/Switch";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";

export default function IconBasicsSection({
  state,
  setKey,
}: {
  state: IconState;
  setKey: IconSetter;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Basics" subtitle="Core rendering modes for the icon.">
        <div className="space-y-4">
          <Switch
            label="Use Gradient Stroke"
            checked={state.gradientEnabled}
            onChange={setKey("gradientEnabled")}
          />
          <Switch
            label="Use 3D Perspective"
            checked={state.use3D}
            onChange={setKey("use3D")}
          />
        </div>
      </SectionCard>
    </div>
  );
}
