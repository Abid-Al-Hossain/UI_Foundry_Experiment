"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { SettingsPanelState } from "../types";

type Props = { state: SettingsPanelState; update: <K extends keyof SettingsPanelState>(key: K, value: SettingsPanelState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Save State" subtitle="Simulated save lifecycle state.">
        <Select label="Save state" value={state.saveState} options={["idle", "saving", "success", "error"]} onChange={(value) => update("saveState", value)} />
      </SectionCard>
      <SectionCard title="Controls" subtitle="Footer action controls.">
      <div className="space-y-4">
        <Switch label="Show reset" checked={state.showReset} onChange={(value) => update("showReset", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
