"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import Select from "@/app/components/controls/input/Select";
import type { BadgeState } from "../types";

export default function BadgeStyleSection(props: {
  variant: BadgeState["variant"];
  setVariant: (v: BadgeState["variant"]) => void;
  shape: BadgeState["shape"];
  setShape: (v: BadgeState["shape"]) => void;
  size: BadgeState["size"];
  setSize: (v: BadgeState["size"]) => void;
}) {
  return (
    <SectionCard title="Styling" subtitle="Variant, shape, and size family.">
      <div className="space-y-6">
        <LabeledField label="Variant">
          <Select
            value={props.variant}
            onChange={(v) => props.setVariant(v as BadgeState["variant"])}
            options={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
              { value: "soft", label: "Soft / Tint" },
              { value: "ghost", label: "Ghost" },
              { value: "neumorphic", label: "Neumorphic" },
              { value: "glass", label: "Glassmorphism" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Shape">
          <Segmented
            value={props.shape}
            onChange={(v) => props.setShape(v as BadgeState["shape"])}
            items={[
              { label: "Pill", value: "pill" },
              { label: "Rounded", value: "rounded" },
              { label: "Square", value: "square" },
              { label: "Circle", value: "circle" },
            ]}
          />
        </LabeledField>

        <LabeledField label="Size Preset">
          <Segmented
            value={props.size}
            onChange={(v) => props.setSize(v as BadgeState["size"])}
            items={[
              { label: "S", value: "sm" },
              { label: "M", value: "md" },
              { label: "L", value: "lg" },
            ]}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
