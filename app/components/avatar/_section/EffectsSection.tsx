"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";

export default function EffectsSection(props: {
  opacity: number;
  setOpacity: (v: number) => void;
  filterGrayscale: number;
  setFilterGrayscale: (v: number) => void;
  filterBlur: number;
  setFilterBlur: (v: number) => void;
  filterSepia: number;
  setFilterSepia: (v: number) => void;
  filterBrightness: number;
  setFilterBrightness: (v: number) => void;
  filterContrast: number;
  setFilterContrast: (v: number) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Opacity" subtitle="Transparency level (0-100%).">
        <SizeControl
          label="Opacity"
          valueText={String(props.opacity)}
          setValueText={(v) => props.setOpacity(Number(v))}
          min={0}
          max={100}
        />
      </SectionCard>

      <SectionCard title="Filters" subtitle="CSS filters applied to the image.">
        <div className="space-y-6">
          <SizeControl
            label="Grayscale (%)"
            valueText={String(props.filterGrayscale)}
            setValueText={(v) => props.setFilterGrayscale(Number(v))}
            min={0}
            max={100}
          />
          <SizeControl
            label="Blur (px)"
            valueText={String(props.filterBlur)}
            setValueText={(v) => props.setFilterBlur(Number(v))}
            min={0}
            max={20}
          />
          <SizeControl
            label="Sepia (%)"
            valueText={String(props.filterSepia)}
            setValueText={(v) => props.setFilterSepia(Number(v))}
            min={0}
            max={100}
          />
          <SizeControl
            label="Brightness (%)"
            valueText={String(props.filterBrightness)}
            setValueText={(v) => props.setFilterBrightness(Number(v))}
            min={0}
            max={200}
          />
          <SizeControl
            label="Contrast (%)"
            valueText={String(props.filterContrast)}
            setValueText={(v) => props.setFilterContrast(Number(v))}
            min={0}
            max={200}
          />
        </div>
      </SectionCard>
    </div>
  );
}
