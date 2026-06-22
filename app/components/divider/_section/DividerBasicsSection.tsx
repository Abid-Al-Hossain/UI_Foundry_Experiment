"use client";
import React from "react";
import type { DividerState } from "../types";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerBasicsSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  const { orientation, variant } = state;

  return (
    <SectionCard title="Basics" subtitle="Orientation and line style.">
      <div className="space-y-4">
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

        <LabeledField label="Variant">
          <Segmented
            value={variant}
            onChange={(v) => setKey("variant")(v as DividerState["variant"])}
            items={[
              { label: "Solid", value: "solid" },
              { label: "Dashed", value: "dashed" },
              { label: "Dotted", value: "dotted" },
              { label: "Double", value: "double" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
