"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import { LabeledField } from "@/app/components/controls/layout/LabeledField";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { PopoverStudioState } from "../types";

type Props = { state: PopoverStudioState; update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void };

const EASING_OPTIONS = [
  { value: "ease", label: "Ease" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In/Out" },
  { value: "linear", label: "Linear" },
];

export default function MotionSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Panel Animation" subtitle="Enter/exit animation duration and reduced motion.">
      <div className="space-y-4">
        <LabeledField label={`Duration: ${state.duration}ms`}>
          <Slider value={state.duration} min={0} max={600} step={10} onChange={(v) => update("duration", v)} />
        </LabeledField>
        <Switch label="Reduced motion" checked={state.reducedMotion} onChange={(v) => update("reducedMotion", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Transitions" subtitle="Duration and easing for interactive state changes.">
        <div className="space-y-4">
          <LabeledField label={`Transition: ${state.transitionDuration}ms`}>
            <Slider value={state.transitionDuration} min={0} max={1000} step={10} onChange={(v) => update("transitionDuration", v)} />
          </LabeledField>
          <LabeledField label="Easing">
            <Select
              value={state.transitionEasing}
              onChange={(v) => update("transitionEasing", v as PopoverStudioState["transitionEasing"])}
              options={EASING_OPTIONS}
            />
          </LabeledField>
        </div>
      </SectionCard>
    </div>
  );
}
