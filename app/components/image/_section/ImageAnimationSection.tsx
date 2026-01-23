"use client";

import React from "react";
import type { ImageState } from "../types";
import Slider from "@/app/components/controls/input/Slider";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Select from "@/app/components/controls/input/Select";

interface ImageAnimationSectionProps {
  state: ImageState;
  setState: (updater: (prev: ImageState) => ImageState) => void;
}

export default function ImageAnimationSection({
  state,
  setState,
}: ImageAnimationSectionProps) {
  const setKey =
    <K extends keyof ImageState>(key: K) =>
    (value: ImageState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    };

  const hoverOptions = [
    { value: "none", label: "None" },
    { value: "zoom-in", label: "Zoom In" },
    { value: "zoom-out", label: "Zoom Out" },
    { value: "rotate", label: "Rotate" },
    { value: "lift", label: "Lift" },
    { value: "tilt", label: "Tilt" },
    { value: "brightness", label: "Brightness" },
    { value: "grayscale", label: "Grayscale" },
  ];

  const entranceOptions = [
    { value: "none", label: "None" },
    { value: "fade-in", label: "Fade In" },
    { value: "slide-up", label: "Slide Up" },
    { value: "zoom-in", label: "Zoom In" },
    { value: "blur-in", label: "Blur In" },
  ];

  return (
    <div className="space-y-8">
      {/* Entrance Animations */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Entrance Animation
        </h3>

        <LabeledField label="Type">
          <Select
            value={state.entranceAnimation}
            onChange={(v) => setKey("entranceAnimation")(v as any)}
            options={entranceOptions}
          />
        </LabeledField>

        {state.entranceAnimation !== "none" && (
          <>
            <LabeledField label="Duration" hint={`${state.entranceDuration}ms`}>
              <Slider
                min={100}
                max={2000}
                step={100}
                value={state.entranceDuration}
                onChange={setKey("entranceDuration")}
              />
            </LabeledField>

            <LabeledField label="Delay" hint={`${state.entranceDelay}ms`}>
              <Slider
                min={0}
                max={2000}
                step={100}
                value={state.entranceDelay}
                onChange={setKey("entranceDelay")}
              />
            </LabeledField>
          </>
        )}
      </div>

      {/* Hover Effects */}
      <div className="space-y-4">
        <h3
          className="text-sm font-bold pb-2 border-b"
          style={{ color: "var(--text)", borderColor: "var(--border)" }}
        >
          Hover Interaction
        </h3>

        <LabeledField label="Effect">
          <Select
            value={state.hoverEffect}
            onChange={(v) => setKey("hoverEffect")(v as any)}
            options={hoverOptions}
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

        {(state.hoverEffect === "zoom-in" ||
          state.hoverEffect === "zoom-out") && (
          <LabeledField label="Scale" hint={`x${state.hoverZoomScale}`}>
            <Slider
              min={0.1}
              max={3}
              step={0.1}
              value={state.hoverZoomScale}
              onChange={setKey("hoverZoomScale")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "rotate" && (
          <LabeledField label="Angle" hint={`${state.hoverRotateAngle}°`}>
            <Slider
              min={-360}
              max={360}
              step={5}
              value={state.hoverRotateAngle}
              onChange={setKey("hoverRotateAngle")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "lift" && (
          <LabeledField label="Lift Amount" hint={`${state.hoverLiftAmount}px`}>
            <Slider
              min={-50}
              max={50}
              step={1}
              value={state.hoverLiftAmount}
              onChange={setKey("hoverLiftAmount")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "tilt" && (
          <LabeledField label="Tilt Amount" hint={`${state.hoverTiltAmount}°`}>
            <Slider
              min={0}
              max={45}
              step={1}
              value={state.hoverTiltAmount}
              onChange={setKey("hoverTiltAmount")}
            />
          </LabeledField>
        )}

        {state.hoverEffect === "brightness" && (
          <LabeledField label="Intensity" hint={`${state.hoverIntensity}%`}>
            <Slider
              min={0}
              max={200}
              step={10}
              value={state.hoverIntensity}
              onChange={setKey("hoverIntensity")}
            />
          </LabeledField>
        )}
      </div>
    </div>
  );
}
