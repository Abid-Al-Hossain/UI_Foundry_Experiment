"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function FieldSection({ state, update }: Props) {
  return (
    <SectionCard title="Field" subtitle="Native field value and adornment behavior.">
      <div className="space-y-4">
      <Select label="Picker type" value={state.pickerType} options={[
  "date",
  "month",
  "week",
  "datetime-local"
]} onChange={(value) => update("pickerType", value)} />
      <Input label="Value (start)" value={state.value} onChange={(value) => update("value", value)} />
      {state.rangeMode && <Input label="Value (end)" value={state.valueEnd} onChange={(value) => update("valueEnd", value)} />}
      <Switch label="Calendar icon" checked={state.showCalendarIcon} onChange={(value) => update("showCalendarIcon", value)} />
      <Switch label="Clear action" checked={state.showClearAction} onChange={(value) => update("showClearAction", value)} />
    </div>
    </SectionCard>
  );
}
