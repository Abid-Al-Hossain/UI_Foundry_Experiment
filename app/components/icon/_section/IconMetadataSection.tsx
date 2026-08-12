"use client";

import React from "react";
import { type IconSetter, type IconState } from "../types";
import InputControl from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";

export default function IconMetadataSection({
  state,
  setKey,
}: {
  state: IconState;
  setKey: IconSetter;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Metadata"
        subtitle="Name the icon correctly for assistive technologies."
      >
        <div className="space-y-4">
          <LabeledField label="ARIA Label">
            <InputControl
              value={state.ariaLabel}
              onChange={(value) =>
                setKey("ariaLabel")(
                  typeof value === "string" ? value : value,
                )
              }
              placeholder="e.g. Settings icon"
            />
          </LabeledField>

          <LabeledField label="Role">
            <Select
              value={state.ariaRole}
              onChange={(value) =>
                setKey("ariaRole")(value as IconState["ariaRole"])
              }
              options={[
                { value: "img", label: "img" },
                { value: "presentation", label: "presentation" },
                { value: "none", label: "none" },
              ]}
            />
          </LabeledField>

          <LabeledField label="Hide From Assistive Tech">
            <Select
              value={state.ariaHidden ? "true" : "false"}
              onChange={(value) => setKey("ariaHidden")(value === "true")}
              options={[
                { value: "false", label: "No" },
                { value: "true", label: "Yes" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
