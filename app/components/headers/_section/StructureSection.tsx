"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { HeaderState } from "../types";

type Props = { state: HeaderState; update: <K extends keyof HeaderState>(key: K, value: HeaderState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Navigation and action item counts.">
      <div className="space-y-4">
        <Slider label="Nav items" value={state.navCount} min={1} max={10} step={1} onChange={(value) => update("navCount", value)} />
        <Slider label="Action count" value={state.actionCount} min={0} max={5} step={1} onChange={(value) => update("actionCount", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Scroll Behavior" subtitle="Compact header on scroll.">
        <Switch label="Compact on scroll" checked={state.compactOnScroll} onChange={(value) => update("compactOnScroll", value)} />
      </SectionCard>
    </div>
  );
}
