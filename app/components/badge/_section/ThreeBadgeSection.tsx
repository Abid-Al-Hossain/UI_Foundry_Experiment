"use client";
import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
  Slider,
  ExportWarningBadge,
} from "../../buttons/action/_section/ui";

export default function ThreeBadgeSection(props: {
  use3D: boolean;
  setUse3D: (v: boolean) => void;
  depth: number;
  setDepth: (v: number) => void;
  tiltEnabled: boolean;
  setTiltEnabled: (v: boolean) => void;
  tiltMax: number;
  setTiltMax: (v: number) => void;
  glareOpacity: number;
  setGlareOpacity: (v: number) => void;

  icon3DEnabled: boolean;
  setIcon3DEnabled: (v: boolean) => void;
  icon3DGeometry: string;
  setIcon3DGeometry: (v: any) => void;
  icon3DSpinSpeed: number;
  setIcon3DSpinSpeed: (v: number) => void;
}) {
  return (
    <SectionCard title="3D & Hyper FX" subtitle="Cinema-grade 3D engine.">
      <div className="space-y-6">
        {/* Tilt Engine */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">
              Holographic Tilt
            </label>
            <input
              type="checkbox"
              checked={props.tiltEnabled}
              onChange={(e) => props.setTiltEnabled(e.target.checked)}
            />
          </div>
          {props.tiltEnabled && (
            <div className="pl-4 border-l border-slate-700 space-y-3">
              <LabeledField label="Max Tilt">
                <Slider
                  value={props.tiltMax}
                  onChange={(v) => props.setTiltMax(parseFloat(v))}
                  min={5}
                  max={45}
                  step={1}
                />
              </LabeledField>
              <LabeledField label="Glare Opacity">
                <Slider
                  value={props.glareOpacity}
                  onChange={(v) => props.setGlareOpacity(parseFloat(v))}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </LabeledField>
            </div>
          )}
        </div>

        {/* 3D Depth */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-300">
              3D Transform Depth
            </label>
            <input
              type="checkbox"
              checked={props.use3D}
              onChange={(e) => props.setUse3D(e.target.checked)}
            />
          </div>
          {props.use3D && (
            <div className="pl-4 border-l border-slate-700">
              <LabeledField label="Z-Translation (px)">
                <Slider
                  value={props.depth}
                  onChange={(v) => props.setDepth(parseFloat(v))}
                  min={0}
                  max={100}
                  step={1}
                />
              </LabeledField>
            </div>
          )}
        </div>

        {/* 3D Icon Overlay (R3F) */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-300">
                3D Floating Object
              </label>
              <ExportWarningBadge />
            </div>
            <input
              type="checkbox"
              checked={props.icon3DEnabled}
              onChange={(e) => props.setIcon3DEnabled(e.target.checked)}
            />
          </div>

          {props.icon3DEnabled && (
            <div className="pl-4 border-l border-slate-700 space-y-3">
              <LabeledField label="Geometry">
                <Segmented
                  value={props.icon3DGeometry}
                  onChange={props.setIcon3DGeometry}
                  items={[
                    { label: "Sphere", value: "sphere" },
                    { label: "Cube", value: "cube" },
                    { label: "Torus", value: "torus" },
                  ]}
                />
              </LabeledField>
              <LabeledField label="Spin Speed">
                <Slider
                  value={props.icon3DSpinSpeed}
                  onChange={(v) => props.setIcon3DSpinSpeed(parseFloat(v))}
                  min={0}
                  max={5}
                  step={0.1}
                />
              </LabeledField>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
