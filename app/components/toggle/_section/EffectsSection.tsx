"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
} from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { type ToggleState, type ToggleKeyUpdater } from "../types";
export default function EffectsSection({
  state,
  setKey,
}: {
  state: ToggleState;
  setKey: ToggleKeyUpdater;
}) {
  return (
    <SectionCard title="Motion" subtitle="Track and thumb animation timing.">
      <div className="space-y-4">
        <div
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Animation
        </div>
        <SizeControl
          label="Duration (ms)"
          value={state.transitionDuration}
          onChange={(v) => setKey("transitionDuration")(v)}
          min={0}
          max={1000}
          step={50}
        />
        <LabeledField label="Easing">
          <Select
            value={state.transitionEasing}
            onChange={(v) =>
              setKey("transitionEasing")(v as ToggleState["transitionEasing"])
            }
            options={[
              { value: "ease", label: "Ease" },
              { value: "ease-in", label: "Ease In" },
              { value: "ease-out", label: "Ease Out" },
              { value: "ease-in-out", label: "Ease In Out" },
              { value: "linear", label: "Linear" },
            ]}
          />
        </LabeledField>
        <SizeControl
          label="Press Scale"
          value={state.thumbScaleOnPress}
          onChange={(v) => setKey("thumbScaleOnPress")(v)}
          min={0.5}
          max={1}
          step={0.05}
        />
      </div>
    </SectionCard>
  );
}
