"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { FilterPanelState } from "../types";

type Props = { state: FilterPanelState; update: <K extends keyof FilterPanelState>(key: K, value: FilterPanelState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Items controls for native filter generation.">
      <div className="space-y-4">
        <Slider label="Groups" value={state.groupCount} min={1} max={8} step={1} onChange={(value) => update("groupCount", value)} />
        <Slider label="Filters" value={state.filterCount} min={1} max={16} step={1} onChange={(value) => update("filterCount", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Chip & header geometry" subtitle="Chip radius, header size, and collapse.">
      <div className="space-y-4">
        <Slider label="Chip radius" value={state.chipRadius} min={0} max={999} step={1} onChange={(value) => update("chipRadius", value)} />
        <Slider label="Group header size" value={state.groupHeaderSize} min={10} max={20} step={1} onChange={(value) => update("groupHeaderSize", value)} />
        <Switch label="Collapsible groups" checked={state.collapseEnabled} onChange={(value) => update("collapseEnabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
