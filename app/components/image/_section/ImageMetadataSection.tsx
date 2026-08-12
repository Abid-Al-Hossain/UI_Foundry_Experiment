"use client";

import React from "react";
import type { ImageState } from "../types";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";

interface ImageMetadataSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageMetadataSection({
  state,
  setState,
}: ImageMetadataSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Metadata"
        subtitle="Name the image correctly for semantics and export."
      >
        <div className="space-y-4">
          <LabeledField label="Alt Text" hint="Describe the meaningful content.">
            <Input
              value={state.alt}
              onChange={(event) => setKey("alt")(event)}
              placeholder="Describe the image..."
            />
          </LabeledField>

          <LabeledField label="Role">
            <Select
              value={state.ariaRole}
              onChange={(value) =>
                setKey("ariaRole")(value as ImageState["ariaRole"])
              }
              options={[
                { value: "img", label: "img" },
                { value: "figure", label: "figure" },
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
