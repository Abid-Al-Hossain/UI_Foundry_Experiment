"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { TimePickerState } from "../types";

type Props = {
  state: TimePickerState;
  update: <K extends keyof TimePickerState>(key: K, value: TimePickerState[K]) => void;
};

function normalizeTimeValue(value: string, showSeconds: boolean) {
  if (!value) return "";
  const [rawHour = "", rawMinute = "", rawSecond = ""] = value.split(":");
  const hour = rawHour.padStart(2, "0").slice(0, 2);
  const minute = rawMinute.padStart(2, "0").slice(0, 2);
  const second = rawSecond.padStart(2, "0").slice(0, 2);
  return showSeconds ? `${hour}:${minute}:${second || "00"}` : `${hour}:${minute}`;
}

export default function FieldSection({ state, update }: Props) {
  const toggleSeconds = (showSeconds: boolean) => {
    update("showSeconds", showSeconds);
    update("value", normalizeTimeValue(state.value, showSeconds));
    update("min", normalizeTimeValue(state.min, showSeconds));
    update("max", normalizeTimeValue(state.max, showSeconds));
    if (showSeconds && state.step >= 60) update("step", 1);
    if (!showSeconds && state.step < 60) update("step", 60);
  };

  return (
    <SectionCard title="Field" subtitle="Native time value, range, seconds granularity, and timezone companion copy.">
      <div className="space-y-4">
      <Input label={state.showSeconds ? "Value (HH:MM:SS)" : "Value (HH:MM)"} value={state.value} onChange={(value) => update("value", normalizeTimeValue(value, state.showSeconds))} />
      <Input label={state.showSeconds ? "Min (HH:MM:SS)" : "Min (HH:MM)"} value={state.min} onChange={(value) => update("min", normalizeTimeValue(value, state.showSeconds))} />
      <Input label={state.showSeconds ? "Max (HH:MM:SS)" : "Max (HH:MM)"} value={state.max} onChange={(value) => update("max", normalizeTimeValue(value, state.showSeconds))} />
      <Slider label="Step seconds" value={state.step} min={1} max={3600} step={1} onChange={(value) => update("step", value)} />
      <Switch label="Show seconds" checked={state.showSeconds} onChange={toggleSeconds} />
      <Switch label="Timezone companion text" checked={state.showTimezone} onChange={(value) => update("showTimezone", value)} />
      <Input label="Timezone copy" value={state.timezoneLabel} onChange={(value) => update("timezoneLabel", value)} />
      <Switch label="Clear action" checked={state.showClearAction} onChange={(value) => update("showClearAction", value)} />
    </div>
    </SectionCard>
  );
}
