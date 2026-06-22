"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

const EASING_OPTIONS = [
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In/Out" },
  { value: "linear", label: "Linear" },
];

export default function MotionSection({ state, update }: Props) {
  return (
    <SectionCard title="Transitions" subtitle="Duration and easing for interactive state changes.">
      <div className="space-y-4">
        <LabeledField label={`Duration: ${state.transitionDuration}ms`}>
          <Slider value={state.transitionDuration} min={0} max={1000} step={10} onChange={(v) => update("transitionDuration", v)} />
        </LabeledField>
        <LabeledField label="Easing">
          <Select
            value={state.transitionEasing}
            onChange={(v) => update("transitionEasing", v as ContainerState["transitionEasing"])}
            options={EASING_OPTIONS}
          />
        </LabeledField>
      </div>
    </SectionCard>
  );
}
