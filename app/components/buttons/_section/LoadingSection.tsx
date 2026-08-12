"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";
import Input from "@/app/components/controls/input/Input";
import Textarea from "@/app/components/controls/input/Textarea";

export type LoadingSpinnerMode = "default" | "custom" | "none";
export type LoadingSpinnerPosition = "left" | "right";

export default function LoadingSection(props: {
  loadingLabel: string;
  setLoadingLabel: (v: string) => void;

  loadingSpinnerMode: LoadingSpinnerMode;
  setLoadingSpinnerMode: (v: LoadingSpinnerMode) => void;

  loadingSpinnerPosition: LoadingSpinnerPosition;
  setLoadingSpinnerPosition: (v: LoadingSpinnerPosition) => void;

  loadingSpinnerSvg: string;
  setLoadingSpinnerSvg: (v: string) => void;
}) {
  return (
    <SectionCard title="Loading" subtitle="Label and spinner overrides.">
      <div className="space-y-4">
        <LabeledField label="Loading label">
          <Input
            value={props.loadingLabel}
            onNativeChange={(e) => props.setLoadingLabel(e.target.value)}
           />
        </LabeledField>

        <LabeledField label="Spinner position">
          <Segmented
            value={props.loadingSpinnerPosition}
            onChange={(v) => props.setLoadingSpinnerPosition(v as LoadingSpinnerPosition)}
            items={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Spinner mode">
          <Segmented
            value={props.loadingSpinnerMode}
            onChange={(v) => props.setLoadingSpinnerMode(v as LoadingSpinnerMode)}
            items={[
              { value: "default", label: "Default" },
              { value: "custom", label: "Custom" },
              { value: "none", label: "None" },
            ]}
          />
        </LabeledField>

        {props.loadingSpinnerMode === "custom" ? (
          <LabeledField label="Custom spinner SVG">
            <Textarea
              value={props.loadingSpinnerSvg}
              onNativeChange={(e) => props.setLoadingSpinnerSvg(e.target.value)}
              placeholder="<svg ...>...</svg>"
              rows={4}
             />
          </LabeledField>
        ) : null}
      </div>
    </SectionCard>
  );
}
