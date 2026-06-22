"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return <SectionCard title="Sizing" subtitle="Sizing controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Width" value={state.width} min={120} max={1200} step={1} onChange={(value) => update("width", value)} />
<Slider label="Height" value={state.height} min={40} max={720} step={1} onChange={(value) => update("height", value)} />
<Slider label="Max width" value={state.maxWidth} min={320} max={1600} step={1} onChange={(value) => update("maxWidth", value)} />
<Slider label="Min height" value={state.minHeight} min={80} max={900} step={1} onChange={(value) => update("minHeight", value)} /></div>
    </SectionCard>;
}
