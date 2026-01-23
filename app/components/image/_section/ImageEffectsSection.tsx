"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/app/components/controls/input/Slider";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Switch from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Select from "@/app/components/controls/input/Select";

interface ImageEffectsSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageEffectsSection({
  state,
  setState,
}: ImageEffectsSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const blendModeOptions = [
    { value: "normal", label: "Normal" },
    { value: "multiply", label: "Multiply" },
    { value: "screen", label: "Screen" },
    { value: "overlay", label: "Overlay" },
    { value: "darken", label: "Darken" },
    { value: "lighten", label: "Lighten" },
    { value: "color-dodge", label: "Color Dodge" },
    { value: "color-burn", label: "Color Burn" },
    { value: "hard-light", label: "Hard Light" },
    { value: "soft-light", label: "Soft Light" },
    { value: "difference", label: "Difference" },
    { value: "exclusion", label: "Exclusion" },
    { value: "hue", label: "Hue" },
    { value: "saturation", label: "Saturation" },
    { value: "color", label: "Color" },
    { value: "luminosity", label: "Luminosity" },
  ];

  return (
    <div className="space-y-8">
      {/* Blend Mode */}
      <LabeledField label="Global Blend Mode">
        <Select
          value={state.mixBlendMode}
          onChange={(v) => setKey("mixBlendMode")(v as any)}
          options={blendModeOptions}
        />
      </LabeledField>

      {/* Color Overlay */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Color Overlay
          </h3>
          <Switch
            checked={state.overlayEnabled}
            onChange={setKey("overlayEnabled")}
          />
        </div>

        {state.overlayEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <ColorControl
              label="Overlay Color"
              value={state.overlayColor}
              onChange={setKey("overlayColor")}
            />

            <LabeledField label="Opacity" hint={`${state.overlayOpacity}%`}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.overlayOpacity}
                onChange={setKey("overlayOpacity")}
              />
            </LabeledField>

            <LabeledField label="Blend Mode">
              <Select
                value={state.overlayBlendMode}
                onChange={(v) => setKey("overlayBlendMode")(v as any)}
                options={blendModeOptions}
              />
            </LabeledField>
          </div>
        )}
      </div>

      {/* Vignette */}
      <div className="space-y-4">
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-bold" style={{ color: "var(--text)" }}>
            Vignette
          </h3>
          <Switch
            checked={state.vignetteEnabled}
            onChange={setKey("vignetteEnabled")}
          />
        </div>

        {state.vignetteEnabled && (
          <div
            className="space-y-4 pl-2 border-l-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <LabeledField
              label="Intensity"
              hint={`${state.vignetteIntensity}%`}
            >
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.vignetteIntensity}
                onChange={setKey("vignetteIntensity")}
              />
            </LabeledField>

            <LabeledField label="Softness" hint={`${state.vignetteSoftness}%`}>
              <Slider
                min={0}
                max={100}
                step={1}
                value={state.vignetteSoftness}
                onChange={setKey("vignetteSoftness")}
              />
            </LabeledField>

            <ColorControl
              label="Vignette Color"
              value={state.vignetteColor}
              onChange={setKey("vignetteColor")}
            />
          </div>
        )}
      </div>

      {/* Hover Effects */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Animations
        </h3>

        <LabeledField label="Hover Effect">
          <Select
            value={state.hoverEffect}
            onChange={(v) => setKey("hoverEffect")(v as any)}
            options={[
              { value: "none", label: "None" },
              { value: "zoom-in", label: "Zoom In" },
              { value: "zoom-out", label: "Zoom Out" },
              { value: "rotate", label: "Rotate" },
              { value: "lift", label: "Lift" },
              { value: "tilt", label: "Tilt" },
              { value: "brightness", label: "Brightness" },
              { value: "grayscale", label: "Grayscale" },
            ]}
          />
        </LabeledField>

        {state.hoverEffect !== "none" && (
          <LabeledField label="Duration" hint={`${state.hoverDuration}ms`}>
            <Slider
              min={100}
              max={1000}
              step={50}
              value={state.hoverDuration}
              onChange={setKey("hoverDuration")}
            />
          </LabeledField>
        )}
      </div>
    </div>
  );
}
