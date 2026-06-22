"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { SidebarState } from "../types";

type Props = { state: SidebarState; update: <K extends keyof SidebarState>(key: K, value: SidebarState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Number of navigation items.">
        <Slider label="Item count" value={state.itemCount} min={1} max={12} step={1} onChange={(value) => update("itemCount", value)} />
      </SectionCard>
      <SectionCard title="Groups" subtitle="Nested group sections within the sidebar.">
        <Slider label="Nested groups" value={state.nestedGroups} min={0} max={5} step={1} onChange={(value) => update("nestedGroups", value)} />
      </SectionCard>
    </div>
  );
}
