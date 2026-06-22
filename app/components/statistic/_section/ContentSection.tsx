"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { StatisticState } from "../types";

type Props = { state: StatisticState; update: <K extends keyof StatisticState>(key: K, value: StatisticState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native statistic generation.">
      <div className="space-y-4"><Input label="Value" value={state.value} onChange={(value) => update("value", value)} />
<Input label="Unit" value={state.unit} onChange={(value) => update("unit", value)} />
<Input label="Prefix" value={state.prefix} onChange={(value) => update("prefix", value)} />
<Input label="Suffix" value={state.suffix} onChange={(value) => update("suffix", value)} /></div>
    </SectionCard>;
}
