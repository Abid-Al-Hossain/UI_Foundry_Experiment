"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { StatisticState } from "../types";

type Props = { state: StatisticState; update: <K extends keyof StatisticState>(key: K, value: StatisticState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Trend" subtitle="Trend value, direction, and sparkline.">
      <div className="space-y-4">
        <Input label="Trend value" value={state.trend} onChange={(value) => update("trend", value)} />
        <Select label="Trend direction" value={state.trendDirection} options={["up", "down", "neutral"]} onChange={(value) => update("trendDirection", value)} />
        <Switch label="Show sparkline" checked={state.showSparkline} onChange={(value) => update("showSparkline", value)} />
      </div>
    </SectionCard>
      <SectionCard title="State" subtitle="Component-level disabled state.">
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
