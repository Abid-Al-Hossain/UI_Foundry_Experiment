"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";

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
          <input
            value={props.loadingLabel}
            onChange={(e) => props.setLoadingLabel(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
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
            <textarea
              value={props.loadingSpinnerSvg}
              onChange={(e) => props.setLoadingSpinnerSvg(e.target.value)}
              placeholder="<svg ...>...</svg>"
              rows={4}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        ) : null}
      </div>
    </SectionCard>
  );
}
