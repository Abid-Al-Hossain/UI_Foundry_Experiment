"use client";

import React from "react";
import {
  Segmented,
  SectionCard,
  LabeledField,
  ExportWarningBadge,
} from "../../../buttons/action/_section/ui";

export type ThreeDBadgeMode = "none" | "sphere" | "cube" | "star";
export type ThreeDStatusMode = "none" | "ring" | "halo";

export default function ThreeAvatarSection(props: {
  use3DBadge: ThreeDBadgeMode;
  setUse3DBadge: (v: ThreeDBadgeMode) => void;
  badgeAnimate: boolean;
  setBadgeAnimate: (v: boolean) => void;

  use3DStatus: ThreeDStatusMode;
  setUse3DStatus: (v: ThreeDStatusMode) => void;

  // New
  accessoryType: string;
  setAccessoryType: (v: string) => void;
  accessoryColor: string;
  setAccessoryColor: (v: string) => void;
  orbitSpeed: string;
  setOrbitSpeed: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionCard
        title="3D Badge (Requires React)"
        subtitle="Floating geometry badge."
      >
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Badge Type <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.use3DBadge}
              onChange={(v) => props.setUse3DBadge(v as ThreeDBadgeMode)}
              items={[
                { value: "none", label: "None" },
                { value: "sphere", label: "Sphere" },
                { value: "cube", label: "Cube" },
                { value: "star", label: "Star" },
              ]}
            />
          </LabeledField>

          {props.use3DBadge !== "none" && (
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Animate (Spin)
              </span>
              <input
                type="checkbox"
                checked={props.badgeAnimate}
                onChange={(e) => props.setBadgeAnimate(e.target.checked)}
                className="h-4 w-4"
              />
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="3D Status Ring" subtitle="Glowing torus ring.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Ring Style <ExportWarningBadge />
              </div>
            }
          >
            <Segmented
              value={props.use3DStatus}
              onChange={(v) => props.setUse3DStatus(v as ThreeDStatusMode)}
              items={[
                { value: "none", label: "None" },
                { value: "ring", label: "Torus" },
                { value: "halo", label: "Halo" },
              ]}
            />
          </LabeledField>
        </div>
      </SectionCard>

      {/* --- ACCESSORIES --- */}
      <SectionCard title="3D Accessories" subtitle="Premium floating elements.">
        <div className="space-y-4">
          <LabeledField
            label={
              <div>
                Type <ExportWarningBadge />
              </div>
            }
          >
            <select
              className="w-full h-8 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              value={props.accessoryType}
              onChange={(e) => props.setAccessoryType(e.target.value)}
            >
              <option value="none">None</option>
              <option value="crown">Floating Crown</option>
              <option value="halo-cyber">Cyber Halo</option>
              <option value="neural-link">Neural Link (NodeNet)</option>
              <option value="orb-float">Floating Orbs</option>
            </select>
          </LabeledField>

          {props.accessoryType !== "none" && (
            <>
              <LabeledField label="Color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={props.accessoryColor}
                    onChange={(e) => props.setAccessoryColor(e.target.value)}
                    className="h-6 w-6 rounded cursor-pointer border-none p-0"
                  />
                  <input
                    type="text"
                    value={props.accessoryColor}
                    onChange={(e) => props.setAccessoryColor(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-400 focus:outline-none"
                  />
                </div>
              </LabeledField>
              <LabeledField label="Animation Speed">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={props.orbitSpeed}
                  onChange={(e) => props.setOrbitSpeed(e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </LabeledField>
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
