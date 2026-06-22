"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return <SectionCard title="Sizing" subtitle="Sizing controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Width" value={state.width} min={120} max={1200} step={1} onChange={(value) => update("width", value)} />
<Slider label="Height" value={state.height} min={40} max={720} step={1} onChange={(value) => update("height", value)} /></div>
    </SectionCard>;
}
