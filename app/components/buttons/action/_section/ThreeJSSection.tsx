"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
  ExportWarningBadge,
  Slider,
} from "./ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
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
      {/* --- 3D ICON ENGINE --- */}
      <SectionCard
        title="3D Icon (React)"
        subtitle="Hyper-realistic R3F geometry integration."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Enable 3D <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.use3DIcon}
              onChange={props.setUse3DIcon}
              items={[
                { value: "none", label: "Off" },
                { value: "on", label: "Enabled" },
              ]}
            />
          </LabeledField>

          {props.use3DIcon !== "none" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <LabeledField label="Geometry">
                  <Select
                    value={props.icon3DGeometry}
                    onChange={props.setIcon3DGeometry}
                    options={[
                      { value: "cube", label: "Cube" },
                      { value: "sphere", label: "Sphere" },
                      { value: "tetra", label: "Tetrahedron" },
                      { value: "icosa", label: "Icosahedron" },
                      { value: "torus", label: "Torus" },
                    ]}
                  />
                </LabeledField>
                <LabeledField label="Material">
                  <Select
                    value={props.icon3DMaterial}
                    onChange={props.setIcon3DMaterial}
                    options={[
                      { value: "glass", label: "Frost Glass" },
                      { value: "glass-crystal", label: "Glass - Crystal" },
                      { value: "liquid", label: "Liquid Metal" },
                      { value: "metal", label: "Polished Metal" },
                      { value: "plastic", label: "Glossy Plastic" },
                      { value: "holographic", label: "Holographic" },
                      { value: "neon", label: "Neon Emissive" },
                    ]}
                  />
                </LabeledField>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <LabeledField label="Color Mode">
                  <Segmented
                    value={props.icon3DColorMode}
                    onChange={(v: any) => props.setIcon3DColorMode(v)}
                    items={[
                      { value: "text", label: "Auto (Text)" },
                      { value: "custom", label: "Custom" },
                    ]}
                  />
                </LabeledField>
                import ColorControl from
                "@/app/components/controls/color/ColorControl"; // ... existing
                imports
                {props.icon3DColorMode === "custom" && (
                  <ColorControl
                    label="Custom HEX"
                    value={props.icon3DColorInput}
                    onChange={props.setIcon3DColorInput}
                  />
                )}
              </div>
              <LabeledField label="Motion">
                <Segmented
                  value={props.icon3DAnimation}
                  onChange={props.setIcon3DAnimation}
                  items={[
                    { value: "spin", label: "Spin" },
                    { value: "float", label: "Float" },
                    { value: "wobble", label: "Wobble" },
                    { value: "pulse", label: "Pulse" },
                  ]}
                />
              </LabeledField>
              {/* Material Fine Tuning */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <p className="text-[10px] uppercase font-bold text-slate-500">
                  Material Physics
                </p>
                <LabeledField label="Roughness">
                  <Slider
                    value={props.iconRoughness}
                    onChange={props.setIconRoughness}
                    min={0}
                    max={1}
                    step={0.05}
                  />
                </LabeledField>
                <LabeledField label="Metalness">
                  <Slider
                    value={props.iconMetalness}
                    onChange={props.setIconMetalness}
                    min={0}
                    max={1}
                    step={0.05}
                  />
                </LabeledField>

                {(props.icon3DMaterial === "glass" ||
                  props.icon3DMaterial === "glass-crystal" ||
                  props.icon3DMaterial === "liquid") && (
                  <>
                    <LabeledField label="Transmission">
                      <Slider
                        value={props.iconTransmission}
                        onChange={props.setIconTransmission}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </LabeledField>
                    <LabeledField label="Thickness">
                      <Slider
                        value={props.iconThickness}
                        onChange={props.setIconThickness}
                        min={0}
                        max={3}
                        step={0.1}
                      />
                    </LabeledField>
                    <LabeledField label="Chromatic Aberration">
                      <Slider
                        value={props.iconChromaticAberration}
                        onChange={props.setIconChromaticAberration}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </LabeledField>
                  </>
                )}
                {props.icon3DMaterial === "liquid" && (
                  <LabeledField label="Distortion">
                    <Slider
                      value={props.iconDistortion}
                      onChange={props.setIconDistortion}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </LabeledField>
                )}
                {(props.icon3DMaterial === "neon" ||
                  props.icon3DMaterial === "holographic") && (
                  <LabeledField label="Emissive (Glow)">
                    <Slider
                      value={props.iconEmissive}
                      onChange={props.setIconEmissive}
                      min={0}
                      max={3}
                      step={0.1}
                    />
                  </LabeledField>
                )}
              </div>
            </>
          )}
        </div>
      </SectionCard>

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
                  onChange={props.setHoverSpringStiffness}
                  min={50}
                  max={500}
                  step={10}
                />
              </LabeledField>
              <LabeledField label="Damping (Friction)">
                <Slider
                  value={props.hoverSpringDamping}
                  onChange={props.setHoverSpringDamping}
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
                onChange={props.setClickParticleCount}
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
