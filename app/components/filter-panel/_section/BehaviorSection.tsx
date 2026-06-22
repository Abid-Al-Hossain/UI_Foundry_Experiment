"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { FilterPanelState } from "../types";

type Props = { state: FilterPanelState; update: <K extends keyof FilterPanelState>(key: K, value: FilterPanelState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Applied Filters" subtitle="Active filter count and chip display.">
      <div className="space-y-4">
        <Slider label="Applied count" value={state.appliedCount} min={0} max={10} step={1} onChange={(value) => update("appliedCount", value)} />
        <Switch label="Show chips" checked={state.showChips} onChange={(value) => update("showChips", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Actions" subtitle="Apply and reset footer controls.">
      <div className="space-y-4">
        <Switch label="Show apply / reset" checked={state.showApplyReset} onChange={(value) => update("showApplyReset", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
