"use client";

import React from "react";
import { SectionCard, LabeledField, Segmented } from "./ui";
import SizeControl from "./SizeControl";

export default function StyleSection(props: {
  borderWidth: number;
  setBorderWidth: (v: number) => void;
  borderColor: string;
  setBorderColor: (v: string) => void;
  borderStyle: "solid" | "dashed" | "dotted";
  setBorderStyle: (v: "solid" | "dashed" | "dotted") => void;
  initialsBg: string;
  setInitialsBg: (v: string) => void;
  initialsColor: string;
  setInitialsColor: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Border" subtitle="Outline styling for the avatar.">
        <div className="space-y-4">
          <SizeControl
            label="Width (px)"
            valueText={String(props.borderWidth)}
            setValueText={(v) => props.setBorderWidth(Number(v))}
            min={0}
            max={20}
          />

          <LabeledField label="Color">
            <div className="flex gap-2">
              <input
                type="color"
                value={props.borderColor}
                onChange={(e) => props.setBorderColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border-none p-0"
              />
              <input
                type="text"
                value={props.borderColor}
                onChange={(e) => props.setBorderColor(e.target.value)}
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </div>
          </LabeledField>

          <LabeledField label="Style">
            <Segmented
              value={props.borderStyle}
              onChange={(v) => props.setBorderStyle(v as any)}
              items={[
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      <SectionCard
        title="Fallback / Initials"
        subtitle="Colors when image is missing."
      >
        <div className="space-y-4">
          <LabeledField label="Background Color">
            <div className="flex gap-2">
              <input
                type="color"
                value={props.initialsBg}
                onChange={(e) => props.setInitialsBg(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border-none p-0"
              />
              <input
                type="text"
                value={props.initialsBg}
                onChange={(e) => props.setInitialsBg(e.target.value)}
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </div>
          </LabeledField>
          <LabeledField label="Text Color">
            <div className="flex gap-2">
              <input
                type="color"
                value={props.initialsColor}
                onChange={(e) => props.setInitialsColor(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border-none p-0"
              />
              <input
                type="text"
                value={props.initialsColor}
                onChange={(e) => props.setInitialsColor(e.target.value)}
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                style={{
                  borderColor: "var(--border)",
                  background:
                    "color-mix(in oklab, var(--surface) 70%, transparent)",
                  color: "var(--text)",
                }}
              />
            </div>
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
