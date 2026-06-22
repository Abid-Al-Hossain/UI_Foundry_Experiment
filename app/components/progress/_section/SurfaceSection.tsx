"use client";

import React from "react";
import { type ProgressState, type ProgressUpdater, SURFACE_STYLE_OPTIONS } from "../types";
import { SectionCard as Section } from "@/app/components/controls/layout/SectionCard";
import { LabeledField as ControlGroup } from "@/app/components/controls/layout/LabeledField";
import SelectControl from "@/app/components/controls/input/Select";

type Props = {
  state: ProgressState;
  update: ProgressUpdater;
};

export default function SurfaceSection({ state, update }: Props) {
  return (
    <div className="space-y-6">
      <Section title="Surface" subtitle="Material language and container finish">
        <div className="space-y-4">
          <ControlGroup label="Surface Style">
            <SelectControl
              value={state.surfaceStyle}
              options={SURFACE_STYLE_OPTIONS}
              onChange={(v) => update("surfaceStyle", v as ProgressState["surfaceStyle"])}
            />
          </ControlGroup>
        </div>
      </Section>
    </div>
  );
}
