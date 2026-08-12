"use client";

import React from "react";
import { SectionCard, Segmented, LabeledField } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";

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

  imageRotation: number;
  setImageRotation: (v: number) => void;
  imageScale: number;
  setImageScale: (v: number) => void;
  hoverZoom: boolean;
  setHoverZoom: (v: boolean) => void;
  hoverGrayscale: boolean;
  setHoverGrayscale: (v: boolean) => void;
  effect3D: "none" | "tilt" | "glitch" | "pulse";
  setEffect3D: (v: "none" | "tilt" | "glitch" | "pulse") => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard title="Adjustments" subtitle="Transform the avatar image.">
        <div className="space-y-6">
          <SizeControl
            label="Rotation (deg)"
            value={props.imageRotation}
            onChange={(v) => props.setImageRotation(v)}
            min={0}
            max={360}
            step={1}
            unit="deg"
          />
          <SizeControl
            label="Scale (Zoom)"
            value={props.imageScale}
            onChange={(v) => props.setImageScale(v)}
            min={0.5}
            max={2}
            step={0.1}
          />
        </div>
      </SectionCard>

      <SectionCard title="3D Effects" subtitle="Advanced animations and depth.">
        <LabeledField label="Effect Mode">
          <Segmented
            value={props.effect3D}
            onChange={(v) =>
              props.setEffect3D(v as "none" | "tilt" | "glitch" | "pulse")
            }
            items={[
              { value: "none", label: "None" },
              { value: "tilt", label: "Tilt" },
              { value: "glitch", label: "Glitch" },
              { value: "pulse", label: "Pulse" },
            ]}
          />
        </LabeledField>
      </SectionCard>

      <SectionCard title="Hover Behavior" subtitle="Pointer reactions while previewing.">
        <div className="space-y-4">
          <Switch
            label={<><span>Hover Zoom</span></>}
            checked={props.hoverZoom}
            onChange={(checked) => props.setHoverZoom(checked)}
          />

          <Switch
            label={<><span>Hover Grayscale</span></>}
            checked={props.hoverGrayscale}
            onChange={(checked) => props.setHoverGrayscale(checked)}
          />
        </div>
      </SectionCard>

      <SectionCard title="Opacity" subtitle="Transparency level (0-100%).">
        <SizeControl
          label="Opacity"
          value={props.opacity}
          onChange={(v) => props.setOpacity(v)}
          min={0}
          max={100}
          step={1}
        />
      </SectionCard>

      <SectionCard title="Filters" subtitle="CSS filters applied to the image.">
        <div className="space-y-6">
          <SizeControl
            label="Grayscale (%)"
            value={props.filterGrayscale}
            onChange={(v) => props.setFilterGrayscale(v)}
            min={0}
            max={100}
            step={1}
          />
          <SizeControl
            label="Blur (px)"
            value={props.filterBlur}
            onChange={(v) => props.setFilterBlur(v)}
            min={0}
            max={20}
            step={1}
          />
          <SizeControl
            label="Sepia (%)"
            value={props.filterSepia}
            onChange={(v) => props.setFilterSepia(v)}
            min={0}
            max={100}
            step={1}
          />
          <SizeControl
            label="Brightness (%)"
            value={props.filterBrightness}
            onChange={(v) => props.setFilterBrightness(v)}
            min={0}
            max={200}
            step={5}
          />
          <SizeControl
            label="Contrast (%)"
            value={props.filterContrast}
            onChange={(v) => props.setFilterContrast(v)}
            min={0}
            max={200}
            step={5}
          />
        </div>
      </SectionCard>
    </div>
  );
}
