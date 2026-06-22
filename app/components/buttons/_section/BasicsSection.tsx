"use client";

import React from "react";
import { LabeledField, SectionCard, Segmented } from "./ui";

import { ActionButtonState } from "../types";

export type ButtonVariant = "solid" | "outline" | "ghost";

export default function BasicsSection({
  state,
  setKey,
}: {
  state: ActionButtonState;
  setKey: (key: keyof ActionButtonState) => (val: any) => void;
}) {
  return (
    <SectionCard title="Basics" subtitle="Label, variant, and states.">
      <div className="space-y-4">
        <LabeledField label="Label">
          <input
            value={state.label}
            onChange={(e) => setKey("label")(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
            style={{
              borderColor: "var(--border)",
              background:
                "color-mix(in oklab, var(--surface) 70%, transparent)",
              color: "var(--text)",
            }}
          />
        </LabeledField>

        <LabeledField label="Variant">
          <Segmented
            value={state.variant}
            onChange={(v) => setKey("variant")(v)}
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
              id="disabled-check"
              type="checkbox"
              checked={state.disabled}
              onChange={(e) => setKey("disabled")(e.target.checked)}
            />
            <label
              htmlFor="disabled-check"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Disabled
            </label>
          </div>

          <div className="inline-flex items-center gap-2">
            <input
              id="loading-check"
              type="checkbox"
              checked={state.loading}
              onChange={(e) => setKey("loading")(e.target.checked)}
            />
            <label
              htmlFor="loading-check"
              className="text-sm uf-clickable"
              style={{ color: "var(--text)" }}
            >
              Loading
            </label>
          </div>
        </div>

      </div>
    </SectionCard>
  );
}
