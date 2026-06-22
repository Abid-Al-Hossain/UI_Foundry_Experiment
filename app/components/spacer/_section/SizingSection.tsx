"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { SpacerState } from "../types";

type Props = { state: SpacerState; update: <K extends keyof SpacerState>(key: K, value: SpacerState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return <SectionCard title="Sizing" subtitle="Sizing controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Width" value={state.width} min={120} max={1200} step={1} onChange={(value) => update("width", value)} />
<Slider label="Height" value={state.height} min={40} max={720} step={1} onChange={(value) => update("height", value)} />
<Slider label="Size" value={state.size} min={8} max={180} step={1} onChange={(value) => update("size", value)} />
<Slider label="Mobile size" value={state.mobileSize ?? Math.max(4, Math.round(state.size * 0.6))} min={4} max={160} step={1} onChange={(value) => update("mobileSize", value)} />
<Slider label="Desktop size" value={state.desktopSize ?? state.size} min={8} max={240} step={1} onChange={(value) => update("desktopSize", value)} /></div>
    </SectionCard>;
}
