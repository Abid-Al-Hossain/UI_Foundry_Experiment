"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { StatisticState } from "../types";

type Props = { state: StatisticState; update: <K extends keyof StatisticState>(key: K, value: StatisticState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Colors" subtitle="Colors controls for native statistic generation.">
      <div className="space-y-4">
        <ColorControl label="Accent" value={state.accent} onChange={(value) => update("accent", value)} />
        <ColorControl label="Background" value={state.background} onChange={(value) => update("background", value)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(value) => update("foreground", value)} />
        <ColorControl label="Muted text" value={state.muted} onChange={(value) => update("muted", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Value & label" subtitle="Metric value, label, unit, and affixes.">
      <div className="space-y-4">
        <ColorControl label="Value" value={state.valueColor} onChange={(value) => update("valueColor", value)} />
        <ColorControl label="Label" value={state.labelColor} onChange={(value) => update("labelColor", value)} />
        <ColorControl label="Unit" value={state.unitColor} onChange={(value) => update("unitColor", value)} />
        <ColorControl label="Prefix" value={state.prefixColor} onChange={(value) => update("prefixColor", value)} />
        <ColorControl label="Suffix" value={state.suffixColor} onChange={(value) => update("suffixColor", value)} />
        <ColorControl label="Description" value={state.descriptionColor} onChange={(value) => update("descriptionColor", value)} />
        <ColorControl label="Help text" value={state.helpTextColor} onChange={(value) => update("helpTextColor", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Trend & sparkline" subtitle="Trend colors, comparison, and sparkline.">
      <div className="space-y-4">
        <ColorControl label="Trend up" value={state.trendUpColor} onChange={(value) => update("trendUpColor", value)} />
        <ColorControl label="Trend down" value={state.trendDownColor} onChange={(value) => update("trendDownColor", value)} />
        <ColorControl label="Trend neutral" value={state.trendNeutralColor} onChange={(value) => update("trendNeutralColor", value)} />
        <ColorControl label="Comparison" value={state.comparisonColor} onChange={(value) => update("comparisonColor", value)} />
        <ColorControl label="Sparkline" value={state.sparklineColor} onChange={(value) => update("sparklineColor", value)} />
        <ColorControl label="Sparkline area" value={state.sparklineAreaColor} onChange={(value) => update("sparklineAreaColor", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
