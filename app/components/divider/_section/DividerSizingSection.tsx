"use client";
import React from "react";
import type { DividerState } from "../types";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Input from "@/app/components/controls/input/Input";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerSizingSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  const { orientation, width, thickness, gap, borderRadius } = state;

  return (
    <SectionCard title="Sizing" subtitle="Layout span, thickness, and spacing.">
      <div className="space-y-6">
        <LabeledField label="Orientation">
          <Segmented
            value={orientation}
            onChange={(v) =>
              setKey("orientation")(v as DividerState["orientation"])
            }
            items={[
              { label: "Horizontal", value: "horizontal" },
              { label: "Vertical", value: "vertical" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Width / Height">
          <Input
            type="text"
            value={width}
            onNativeChange={(e) => setKey("width")(e.target.value)}
            placeholder="e.g. 100%, 300px"
           />
        </LabeledField>

        <SizeControl
          label="Thickness (px)"
          value={thickness}
          onChange={setKey("thickness")}
          min={1}
          max={40}
          step={1}
        />

        <SizeControl
          label="Gap / Spacing (px)"
          value={gap}
          onChange={setKey("gap")}
          min={0}
          max={100}
          step={4}
        />

        <SizeControl
          label="Border Radius (px)"
          value={borderRadius}
          onChange={setKey("borderRadius")}
          min={0}
          max={50}
          step={1}
        />
      </div>
    </SectionCard>
  );
}
