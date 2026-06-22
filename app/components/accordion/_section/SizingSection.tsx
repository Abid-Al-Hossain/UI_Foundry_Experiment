"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { AccordionState } from "../types";

type Props = { state: AccordionState; update: <K extends keyof AccordionState>(key: K, value: AccordionState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Sizing" subtitle="Sizing controls for native accordion generation.">
      <div className="space-y-4">
        <Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
        <Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
        <Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
        <Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Trigger geometry" subtitle="Header button sizing and chevron position.">
      <div className="space-y-4">
        <Slider label="Trigger height" value={state.triggerHeight} min={32} max={80} step={1} onChange={(value) => update("triggerHeight", value)} />
        <Slider label="Trigger padding X" value={state.triggerPaddingX} min={4} max={32} step={1} onChange={(value) => update("triggerPaddingX", value)} />
        <Slider label="Trigger padding Y" value={state.triggerPaddingY} min={4} max={28} step={1} onChange={(value) => update("triggerPaddingY", value)} />
        <Slider label="Icon size" value={state.triggerIconSize} min={10} max={28} step={1} onChange={(value) => update("triggerIconSize", value)} />
        <SegmentedControl
          label="Chevron position"
          value={state.chevronPosition}
          options={[{ label: "Left", value: "left" }, { label: "Right", value: "right" }]}
          onChange={(value) => update("chevronPosition", value as AccordionState["chevronPosition"])}
        />
      </div>
    </SectionCard>
      <SectionCard title="Item & panel geometry" subtitle="Spacing, radius, and panel padding.">
      <div className="space-y-4">
        <Slider label="Item gap" value={state.itemGap} min={0} max={32} step={1} onChange={(value) => update("itemGap", value)} />
        <Slider label="Item radius" value={state.itemRadius} min={0} max={28} step={1} onChange={(value) => update("itemRadius", value)} />
        <Slider label="Panel padding X" value={state.panelPaddingX} min={4} max={40} step={1} onChange={(value) => update("panelPaddingX", value)} />
        <Slider label="Panel padding Y" value={state.panelPaddingY} min={4} max={40} step={1} onChange={(value) => update("panelPaddingY", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
