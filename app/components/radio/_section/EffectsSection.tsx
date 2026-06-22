"use client";

import React from "react";
import {
  SectionCard,
  LabeledField,
  Segmented,
} from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Select from "@/app/components/controls/input/Select";
import { RadioState, RadioSetter } from "../types";
export default function EffectsSection({
  state,
  setKey,
}: {
  state: RadioState;
  setKey: RadioSetter;
}) {
  return (
    <SectionCard title="Motion" subtitle="Selection animation timing.">
      <div className="space-y-4">
        <div
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          Animation
        </div>
        <LabeledField label="Animation Type">
          <Segmented
            value={state.animationType}
            onChange={(v) =>
              setKey("animationType")(v as RadioState["animationType"])
            }
            items={[
              { value: "scale", label: "Scale" },
              { value: "fade", label: "Fade" },
              { value: "none", label: "None" },
            ]}
          />
        </LabeledField>
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
              setKey("transitionEasing")(v as RadioState["transitionEasing"])
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
      </div>
    </SectionCard>
  );
}
