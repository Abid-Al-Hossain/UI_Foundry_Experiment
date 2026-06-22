"use client";
import React from "react";
import type { DividerState } from "../types";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import SizeControl from "@/app/components/controls/input/SizeControl";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerTypographySection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  return (
    <SectionCard title="Typography" subtitle="Label text sizing and emphasis.">
      <div className="space-y-6">
        <SizeControl
          label="Font Size"
          value={state.fontSize}
          onChange={setKey("fontSize")}
          min={10}
          max={32}
          step={1}
        />

        <LabeledField label="Font Weight">
          <Select
            value={state.fontWeight}
            onChange={setKey("fontWeight")}
            options={[
              { value: "300", label: "300 - Light" },
              { value: "400", label: "400 - Regular" },
              { value: "500", label: "500 - Medium" },
              { value: "600", label: "600 - Semibold" },
              { value: "700", label: "700 - Bold" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Transform">
          <Segmented
            value={state.labelTransform}
            onChange={(v) =>
              setKey("labelTransform")(v as DividerState["labelTransform"])
            }
            items={[
              { label: "None", value: "none" },
              { label: "ABC", value: "uppercase" },
              { label: "abc", value: "lowercase" },
            ]}
          />
        </LabeledField>

        <SizeControl
          label="Letter Spacing"
          value={state.letterSpacing}
          onChange={setKey("letterSpacing")}
          min={-2}
          max={10}
          step={0.5}
        />
      </div>
    </SectionCard>
  );
}
