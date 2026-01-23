"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/app/components/controls/input/Slider";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Switch from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";

interface ImageFiltersSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageFiltersSection({
  state,
  setState,
}: ImageFiltersSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const FilterSlider = ({
    label,
    value,
    onChange,
    min = 0,
    max = 200,
    unit = "%",
    resetValue = "100",
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    min?: number;
    max?: number;
    unit?: string;
    resetValue?: string;
  }) => (
    <LabeledField
      label={label}
      hint={
        <span className="flex items-center gap-2">
          <span>
            {value}
            {unit}
          </span>
          <button
            type="button"
            onClick={() => onChange(resetValue)}
            className="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            Reset
          </button>
        </span>
      }
    >
      <Slider min={min} max={max} step={1} value={value} onChange={onChange} />
    </LabeledField>
  );

  return (
    <div className="space-y-8">
      {/* Tonal Adjustments */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Tonal Adjustments
        </h3>
        <FilterSlider
          label="Brightness"
          value={state.brightness}
          onChange={setKey("brightness")}
        />
        <FilterSlider
          label="Contrast"
          value={state.contrast}
          onChange={setKey("contrast")}
        />
        <FilterSlider
          label="Saturation"
          value={state.saturation}
          onChange={setKey("saturation")}
        />
      </div>

      {/* Color Effects */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Color Effects
        </h3>
        <FilterSlider
          label="Grayscale"
          value={state.grayscale}
          onChange={setKey("grayscale")}
          max={100}
          resetValue="0"
        />
        <FilterSlider
          label="Sepia"
          value={state.sepia}
          onChange={setKey("sepia")}
          max={100}
          resetValue="0"
        />
        <FilterSlider
          label="Hue Rotate"
          value={state.hueRotate}
          onChange={setKey("hueRotate")}
          max={360}
          unit="°"
          resetValue="0"
        />
        <FilterSlider
          label="Invert"
          value={state.invert}
          onChange={setKey("invert")}
          max={100}
          resetValue="0"
        />
      </div>

      {/* Optical Effects */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Optical Effects
        </h3>
        <FilterSlider
          label="Blur"
          value={state.blur}
          onChange={setKey("blur")}
          max={50}
          unit="px"
          resetValue="0"
        />
        <FilterSlider
          label="Opacity"
          value={state.filterOpacity}
          onChange={setKey("filterOpacity")}
          max={100}
          resetValue="100"
        />
      </div>

      {/* Drop Shadow */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Drop Shadow
          </h3>
          <Switch
            checked={state.dropShadowEnabled}
            onChange={setKey("dropShadowEnabled")}
          />
        </div>

        {state.dropShadowEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <LabeledField label="X Offset">
                <Slider
                  min={-50}
                  max={50}
                  step={1}
                  value={state.dropShadowX}
                  onChange={setKey("dropShadowX")}
                />
              </LabeledField>
              <LabeledField label="Y Offset">
                <Slider
                  min={-50}
                  max={50}
                  step={1}
                  value={state.dropShadowY}
                  onChange={setKey("dropShadowY")}
                />
              </LabeledField>
            </div>

            <FilterSlider
              label="Blur Radius"
              value={state.dropShadowBlur}
              onChange={setKey("dropShadowBlur")}
              max={100}
              unit="px"
              resetValue="0"
            />

            <ColorControl
              label="Shadow Color"
              value={state.dropShadowColor}
              onChange={setKey("dropShadowColor")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
