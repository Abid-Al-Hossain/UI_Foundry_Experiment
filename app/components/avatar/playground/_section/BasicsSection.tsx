"use client";

import React from "react";

import { SectionCard, LabeledField, Segmented } from "./ui";

export default function BasicsSection(props: {
  src: string;
  setSrc: (v: string) => void;
  alt: string;
  setAlt: (v: string) => void;
  initials: string;
  setInitials: (v: string) => void;
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  setObjectFit: (
    v: "cover" | "contain" | "fill" | "none" | "scale-down",
  ) => void;
  loadingState: "default" | "loading" | "error";
  setLoadingState: (v: "default" | "loading" | "error") => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Image Source" subtitle="The main avatar image URL.">
        <LabeledField label="URL">
          <input
            type="text"
            value={props.src}
            onChange={(e) => props.setSrc(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>
      </SectionCard>

      <SectionCard
        title="State Simulation"
        subtitle="Preview loading and error states."
      >
        <Segmented
          value={props.loadingState}
          onChange={(v) => props.setLoadingState(v as any)}
          items={[
            { value: "default", label: "Default" },
            { value: "loading", label: "Loading" },
            { value: "error", label: "Error" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Fallback & Accessibility"
        subtitle="Shown when image fails or is loading."
      >
        <div className="space-y-4">
          <LabeledField label="Alt Text">
            <input
              type="text"
              value={props.alt}
              onChange={(e) => props.setAlt(e.target.value)}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
          <LabeledField label="Initials">
            <input
              type="text"
              value={props.initials}
              onChange={(e) => props.setInitials(e.target.value)}
              maxLength={3}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: "var(--border)",
                background:
                  "color-mix(in oklab, var(--surface) 70%, transparent)",
                color: "var(--text)",
              }}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Object Fit"
        subtitle="How the image scales within containers."
      >
        <Segmented
          value={props.objectFit}
          onChange={(v) => props.setObjectFit(v as any)}
          items={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "scale-down", label: "Scale Down" },
          ]}
        />
      </SectionCard>
    </div>
  );
}
