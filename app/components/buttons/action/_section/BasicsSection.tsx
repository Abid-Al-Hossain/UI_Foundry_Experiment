"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type AnimationPreset = "none" | "subtle-pop" | "pulse" | "float";

export default function BasicsSection(props: {
  label: string;
  setLabel: (v: string) => void;

  variant: ButtonVariant;
  setVariant: (v: ButtonVariant) => void;

  disabled: boolean;
  setDisabled: (v: boolean) => void;

  loading: boolean;
  setLoading: (v: boolean) => void;

  animation: AnimationPreset;
  setAnimation: (v: AnimationPreset) => void;

  idDisabled: string;
  idLoading: string;
}) {
  return (
    <SectionCard title="Basics" subtitle="Label, variant, and states.">
      <div className="space-y-4">
        <LabeledField label="Label">
          <input
            value={props.label}
            onChange={(e) => props.setLabel(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>

        <LabeledField label="Variant">
          <Segmented
            value={props.variant}
            onChange={(v) => props.setVariant(v as ButtonVariant)}
            items={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
              { value: "ghost", label: "Ghost" },
            ]}
          />
        </LabeledField>

        <div className="grid grid-cols-2 gap-3">
          <div className="inline-flex items-center gap-2">
            <input
              id={props.idDisabled}
              type="checkbox"
              checked={props.disabled}
              onChange={(e) => props.setDisabled(e.target.checked)}
            />
            <label htmlFor={props.idDisabled} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
              Disabled
            </label>
          </div>

          <div className="inline-flex items-center gap-2">
            <input
              id={props.idLoading}
              type="checkbox"
              checked={props.loading}
              onChange={(e) => props.setLoading(e.target.checked)}
            />
            <label htmlFor={props.idLoading} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
              Loading
            </label>
          </div>
        </div>

        <LabeledField label="Animation">
          <select
            value={props.animation}
            onChange={(e) => props.setAnimation(e.target.value as AnimationPreset)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          >
            <option value="none">None</option>
            <option value="subtle-pop">Subtle Pop (on load)</option>
            <option value="pulse">Pulse (loop)</option>
            <option value="float">Float (loop)</option>
          </select>
        </LabeledField>
      </div>
    </SectionCard>
  );
}
