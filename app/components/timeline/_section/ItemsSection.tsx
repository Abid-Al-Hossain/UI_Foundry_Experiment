"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { TimelineState } from "../types";
import { getCurrentIndex } from "../_utils/timelineModel";

type Props = { state: TimelineState; update: <K extends keyof TimelineState>(key: K, value: TimelineState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Timeline event count and current event semantics.">
      <div className="space-y-4">
        <Slider label="Event count" value={state.itemCount} min={1} max={14} step={1} onChange={(value) => update("itemCount", value)} />
        <Slider label="Current event" value={getCurrentIndex(state) + 1} min={1} max={state.itemCount} step={1} onChange={(value) => update("currentItem", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Marker & card geometry" subtitle="Marker, connector, card, and date sizing.">
      <div className="space-y-4">
        <Slider label="Marker size" value={state.markerSize} min={20} max={56} step={1} onChange={(value) => update("markerSize", value)} />
        <Slider label="Marker radius" value={state.markerRadius} min={0} max={999} step={1} onChange={(value) => update("markerRadius", value)} />
        <Slider label="Connector width" value={state.connectorWidth} min={1} max={8} step={1} onChange={(value) => update("connectorWidth", value)} />
        <Slider label="Card radius" value={state.itemCardRadius} min={0} max={28} step={1} onChange={(value) => update("itemCardRadius", value)} />
        <Slider label="Card padding" value={state.itemCardPadding} min={4} max={32} step={1} onChange={(value) => update("itemCardPadding", value)} />
        <Slider label="Date size" value={state.dateSize} min={9} max={18} step={1} onChange={(value) => update("dateSize", value)} />
        <Slider label="Item gap" value={state.itemGap} min={0} max={48} step={1} onChange={(value) => update("itemGap", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
