"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Input from "@/app/components/controls/input/Input";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { StatisticState } from "../types";

type Props = { state: StatisticState; update: <K extends keyof StatisticState>(key: K, value: StatisticState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Sizing" subtitle="Sizing controls for native statistic generation.">
      <div className="space-y-4">
        <Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
        <Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
        <Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
        <Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Value & sparkline" subtitle="Value sizing, sparkline, and card style.">
      <div className="space-y-4">
        <Slider label="Value size" value={state.valueSize} min={24} max={96} step={1} onChange={(value) => update("valueSize", value)} />
        <Slider label="Value weight" value={state.valueFontWeight} min={400} max={900} step={100} onChange={(value) => update("valueFontWeight", value)} />
        <Slider label="Label size" value={state.labelSize} min={10} max={20} step={1} onChange={(value) => update("labelSize", value)} />
        <Slider label="Unit size" value={state.unitSize} min={10} max={28} step={1} onChange={(value) => update("unitSize", value)} />
        <Slider label="Sparkline height" value={state.sparklineHeight} min={32} max={120} step={1} onChange={(value) => update("sparklineHeight", value)} />
        <SegmentedControl label="Unit position" value={state.unitPosition} options={[{ label: "Prefix", value: "prefix" }, { label: "Suffix", value: "suffix" }]} onChange={(value) => update("unitPosition", value as StatisticState["unitPosition"])} />
        <SegmentedControl label="Sparkline type" value={state.sparklineType} options={[{ label: "Line", value: "line" }, { label: "Bar", value: "bar" }, { label: "Area", value: "area" }]} onChange={(value) => update("sparklineType", value as StatisticState["sparklineType"])} />
        <SegmentedControl label="Card mode" value={state.cardMode} options={[{ label: "Minimal", value: "minimal" }, { label: "Bordered", value: "bordered" }, { label: "Elevated", value: "elevated" }]} onChange={(value) => update("cardMode", value as StatisticState["cardMode"])} />
        <Input label="Comparison label" value={state.comparisonLabel} onChange={(value: string) => update("comparisonLabel", value)} placeholder="vs last period" />
      </div>
    </SectionCard>
    </div>
  );
}
