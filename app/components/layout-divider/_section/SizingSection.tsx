"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { LayoutDividerState } from "../types";

type Props = { state: LayoutDividerState; update: <K extends keyof LayoutDividerState>(key: K, value: LayoutDividerState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return <SectionCard title="Sizing" subtitle="Sizing controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Width" value={state.width} min={120} max={1200} step={1} onChange={(value) => update("width", value)} />
<Slider label="Height" value={state.height} min={40} max={720} step={1} onChange={(value) => update("height", value)} />
<Slider label="Length" value={state.length} min={120} max={1200} step={1} onChange={(value) => update("length", value)} />
<Slider label="Thickness" value={state.thickness} min={1} max={16} step={1} onChange={(value) => update("thickness", value)} /></div>
    </SectionCard>;
}
