"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
  ExportWarningBadge,
  Slider,
} from "./ui";
import Select from "@/app/components/controls/input/Select";

export type ThreeDIconMode = "none" | "on";
export type ThreeDAnimation = "spin" | "float" | "wobble" | "pulse";
export type ClickEffect = "none" | "confetti" | "explosion" | "ripple";

export default function ThreeJSSection(props: {
  // 3D
  use3DIcon: string;
  setUse3DIcon: (v: string) => void;
  icon3DGeometry: string;
  setIcon3DGeometry: (v: string) => void;
  icon3DMaterial: string;
  setIcon3DMaterial: (v: string) => void;
  icon3DAnimation: string;
  setIcon3DAnimation: (v: string) => void;
  iconRoughness: string;
  setIconRoughness: (v: string) => void;
  iconMetalness: string;
  setIconMetalness: (v: string) => void;
  iconTransmission: string;
  setIconTransmission: (v: string) => void;
  iconEmissive: string;
  setIconEmissive: (v: string) => void;
  iconDistortion: string;
  setIconDistortion: (v: string) => void;
  iconThickness: string;
  setIconThickness: (v: string) => void;
  iconChromaticAberration: string;

  setIconChromaticAberration: (v: string) => void;
  icon3DColorMode: "text" | "custom";
  setIcon3DColorMode: (v: "text" | "custom") => void;
  icon3DColorInput: string;
  setIcon3DColorInput: (v: string) => void;
  icon3DText: string;
  setIcon3DText: (v: string) => void;

  // Motion
  clickEffect: string;
  setClickEffect: (v: string) => void;
  clickParticleCount: string;
  setClickParticleCount: (v: string) => void;
  hoverEffect: string;
  setHoverEffect: (v: string) => void;
  hoverSpringStiffness: string;
  setHoverSpringStiffness: (v: string) => void;
  hoverSpringDamping: string;
  setHoverSpringDamping: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* --- 3D ICON ENGINE REMOVED --- */}

      {/* --- MOTION ENGINE --- */}
      <SectionCard
        title="Motion FX (Framer)"
        subtitle="Physics-based interaction effects."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Hover Effect <ExportWarningBadge />
              </div>
            }
          >
            <Select
              value={props.hoverEffect}
              onChange={props.setHoverEffect}
              options={[
                { value: "none", label: "None" },
                { value: "magnetic", label: "Magnetic Pull" },
                { value: "spotlight", label: "Glow Spotlight" },
                { value: "tilt", label: "3D Glare Tilt" },
                { value: "morph", label: "Shape Morph" },
                { value: "sparkles", label: "Floating Sparkles" },
              ]}
            />
          </LabeledField>
          {props.hoverEffect !== "none" && (
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <LabeledField label="Stiffness (Spring)">
                <Slider
                  value={props.hoverSpringStiffness}
                  onChange={(value) => props.setHoverSpringStiffness(String(value))}
                  min={50}
                  max={500}
                  step={10}
                />
              </LabeledField>
              <LabeledField label="Damping (Friction)">
                <Slider
                  value={props.hoverSpringDamping}
                  onChange={(value) => props.setHoverSpringDamping(String(value))}
                  min={5}
                  max={50}
                  step={1}
                />
              </LabeledField>
            </div>
          )}
        </div>
      </SectionCard>

      {/* --- PARTICLE ENGINE --- */}
      <SectionCard
        title="Particle Engine"
        subtitle="Canvas-based click feedback."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Click Trigger <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.clickEffect}
              onChange={props.setClickEffect}
              items={[
                { value: "none", label: "None" },
                { value: "confetti", label: "Confetti" },
                { value: "explosion", label: "Explosion" },
                { value: "ripple", label: "Shockwave" },
              ]}
            />
          </LabeledField>
          {props.clickEffect !== "none" && (
            <LabeledField label="Particle Count">
              <Slider
                value={props.clickParticleCount}
                onChange={(value) => props.setClickParticleCount(String(value))}
                min={10}
                max={200}
                step={10}
              />
            </LabeledField>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
