"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Nav item count and active item.">
      <div className="space-y-4">
        <Slider label="Nav items" value={state.navCount} min={1} max={10} step={1} onChange={(value) => update("navCount", value)} />
        <Slider label="Active index" value={state.activeIndex} min={0} max={Math.max(0, state.navCount - 1)} step={1} onChange={(value) => update("activeIndex", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Dropdowns" subtitle="Whether nav items show dropdown indicators.">
        <Switch label="Has dropdowns" checked={state.hasDropdowns} onChange={(value) => update("hasDropdowns", value)} />
      </SectionCard>
    </div>
  );
}
