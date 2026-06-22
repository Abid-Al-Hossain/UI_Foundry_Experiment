"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { ListState } from "../types";

type Props = { state: ListState; update: <K extends keyof ListState>(key: K, value: ListState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Items controls for native list generation.">
        <Slider label="Item count" value={state.itemCount} min={1} max={14} step={1} onChange={(value) => update("itemCount", value)} />
      </SectionCard>
      <SectionCard title="Item geometry" subtitle="Row sizing, badge, avatar, and dividers.">
      <div className="space-y-4">
        <Slider label="Item height" value={state.itemHeight} min={36} max={88} step={1} onChange={(value) => update("itemHeight", value)} />
        <Slider label="Item padding" value={state.itemPadding} min={4} max={28} step={1} onChange={(value) => update("itemPadding", value)} />
        <Slider label="Item radius" value={state.itemRadius} min={0} max={28} step={1} onChange={(value) => update("itemRadius", value)} />
        <Slider label="Avatar size" value={state.avatarSize} min={24} max={64} step={1} onChange={(value) => update("avatarSize", value)} />
        <Slider label="Secondary text size" value={state.secondaryTextSize} min={10} max={18} step={1} onChange={(value) => update("secondaryTextSize", value)} />
        <Slider label="Badge radius" value={state.badgeRadius} min={0} max={999} step={1} onChange={(value) => update("badgeRadius", value)} />
        <SegmentedControl label="Divider style" value={state.dividerStyle} options={[{ label: "Solid", value: "solid" }, { label: "Dashed", value: "dashed" }, { label: "Dotted", value: "dotted" }]} onChange={(value) => update("dividerStyle", value as ListState["dividerStyle"])} />
      </div>
    </SectionCard>
    </div>
  );
}
