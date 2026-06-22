"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { EmptyStateState } from "../types";

type Props = { state: EmptyStateState; update: <K extends keyof EmptyStateState>(key: K, value: EmptyStateState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="State Mode" subtitle="Which empty state scenario to display.">
      <div className="space-y-4">
        <Select label="State mode" value={state.stateMode} options={["no-data", "no-results", "offline", "permission", "success"]} onChange={(value) => update("stateMode", value as EmptyStateState["stateMode"])} />
        <Select label="Status variant" value={state.statusVariant} options={["neutral", "info", "warning", "success"]} onChange={(value) => update("statusVariant", value as EmptyStateState["statusVariant"])} />
      </div>
    </SectionCard>
      <SectionCard title="Illustration" subtitle="Illustration style shown in the empty state.">
        <Select label="Illustration" value={state.illustration} options={["spark", "inbox", "search", "chart", "lock"]} onChange={(value) => update("illustration", value as EmptyStateState["illustration"])} />
      </SectionCard>
      <SectionCard title="State" subtitle="Component-level disabled state.">
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
