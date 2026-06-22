"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function ValidationSection({ state, update }: Props) {
  return (
    <SectionCard title="Validation" subtitle="Required, range, and validation messaging.">
      <div className="space-y-4">
      <Switch label="Required" checked={state.required} onChange={(value) => update("required", value)} />
      <Switch label="Read only" checked={state.readOnly} onChange={(value) => update("readOnly", value)} />
      <Input label="Min" value={state.min} onChange={(value) => update("min", value)} />
      <Input label="Max" value={state.max} onChange={(value) => update("max", value)} />
      <Slider label="Step" value={state.step} min={1} max={30} step={1} onChange={(value) => update("step", value)} />
      <Input label="Error text" value={state.errorText} onChange={(value) => update("errorText", value)} />
      <Input label="Success text" value={state.successText} onChange={(value) => update("successText", value)} />
    </div>
    </SectionCard>
  );
}
