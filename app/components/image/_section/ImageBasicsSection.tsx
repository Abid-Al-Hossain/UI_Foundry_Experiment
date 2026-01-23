"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/app/components/controls/input/Slider";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import Input from "@/app/components/controls/input/Input";
import { IMAGE_PRESETS as presets } from "../types";

interface ImageBasicsSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageBasicsSection({
  state,
  setState,
}: ImageBasicsSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <div className="space-y-6">
      {/* Target Source */}
      <LabeledField label="Image Source" hint="">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setKey("src")(preset.url)}
                className="relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105"
                style={{
                  borderColor:
                    state.src === preset.url
                      ? "var(--primary)"
                      : "var(--border)",
                  boxShadow:
                    state.src === preset.url
                      ? "0 0 0 2px var(--primary-shadow)"
                      : "none",
                }}
                title={preset.label}
              >
                <img
                  src={preset.url}
                  alt={preset.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <Input
            value={state.src}
            onChange={(e) => setKey("src")(e.target.value)}
            placeholder="Or enter custom URL..."
          />
        </div>
      </LabeledField>

      <LabeledField label="Alt Text" hint="">
        <Input
          value={state.alt}
          onChange={(e) => setKey("alt")(e.target.value)}
          placeholder="Describe the image..."
        />
      </LabeledField>

      <div className="grid grid-cols-2 gap-4">
        <LabeledField label="Width" hint="">
          <div className="flex gap-2">
            <Input
              value={state.width}
              onChange={(e) => setKey("width")(e.target.value)}
              className="flex-1"
            />
            <div className="w-20">
              <SegmentedControl
                value={state.widthUnit}
                onChange={(v) => setKey("widthUnit")(v as any)}
                items={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "auto", label: "A" },
                ]}
              />
            </div>
          </div>
        </LabeledField>

        <LabeledField label="Height" hint="">
          <div className="flex gap-2">
            <Input
              value={state.height}
              onChange={(e) => setKey("height")(e.target.value)}
              className="flex-1"
            />
            <div className="w-20">
              <SegmentedControl
                value={state.heightUnit}
                onChange={(v) => setKey("heightUnit")(v as any)}
                items={[
                  { value: "px", label: "px" },
                  { value: "%", label: "%" },
                  { value: "auto", label: "A" },
                ]}
              />
            </div>
          </div>
        </LabeledField>
      </div>

      <LabeledField label="Aspect Ratio" hint="">
        <div className="grid grid-cols-4 gap-2">
          {["1/1", "16/9", "4/3", "3/2", "21/9", "2/3", "9/16", "none"].map(
            (ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setKey("aspectRatio")(ratio as any)}
                className="px-2 py-2 rounded-lg border text-xs font-medium transition-all"
                style={{
                  borderColor:
                    state.aspectRatio === ratio
                      ? "var(--primary)"
                      : "var(--border)",
                  background:
                    state.aspectRatio === ratio
                      ? "var(--primary)"
                      : "transparent",
                  color: state.aspectRatio === ratio ? "white" : "var(--text)",
                }}
              >
                {ratio}
              </button>
            ),
          )}
        </div>
      </LabeledField>

      <LabeledField label="Object Fit" hint="">
        <SegmentedControl
          value={state.objectFit}
          onChange={(v) => setKey("objectFit")(v as any)}
          items={[
            { value: "cover", label: "Cover" },
            { value: "contain", label: "Contain" },
            { value: "fill", label: "Fill" },
            { value: "none", label: "None" },
          ]}
        />
      </LabeledField>

      <LabeledField
        label="Object Position"
        hint={`${state.objectPositionX}% ${state.objectPositionY}%`}
      >
        <div className="space-y-3">
          <Slider
            min={0}
            max={100}
            step={1}
            value={state.objectPositionX}
            onChange={setKey("objectPositionX")}
          />
          <Slider
            min={0}
            max={100}
            step={1}
            value={state.objectPositionY}
            onChange={setKey("objectPositionY")}
          />
        </div>
      </LabeledField>

      <LabeledField label="Loading Mode" hint="">
        <SegmentedControl
          value={state.loading}
          onChange={(v) => setKey("loading")(v as any)}
          items={[
            { value: "lazy", label: "Lazy" },
            { value: "eager", label: "Eager" },
          ]}
        />
      </LabeledField>
    </div>
  );
}
