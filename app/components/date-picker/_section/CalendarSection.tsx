"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function CalendarSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
    <SectionCard title="Range" subtitle="Date range selection (start + end).">
      <Switch label="Range mode" checked={state.rangeMode} onChange={(value) => update("rangeMode", value)} />
    </SectionCard>
    <SectionCard title="Calendar" subtitle="Calendar-related picker behavior.">
      <div className="space-y-4">
      <SegmentedControl label="Calendar density" value={state.calendarDensity} options={[
  {
    "value": "compact",
    "label": "Compact"
  },
  {
    "value": "balanced",
    "label": "Balanced"
  },
  {
    "value": "spacious",
    "label": "Spacious"
  }
]} onChange={(value) => update("calendarDensity", value)} />
      <Select label="First day" value={state.firstDayOfWeek} options={[
  "sunday",
  "monday",
  "saturday"
]} onChange={(value) => update("firstDayOfWeek", value)} />
      <Select label="Autocomplete" value={state.autocomplete} options={[
  "off",
  "bday",
  "bday-day",
  "bday-month",
  "bday-year"
]} onChange={(value) => update("autocomplete", value)} />
    </div>
    </SectionCard>
    </div>
  );
}
