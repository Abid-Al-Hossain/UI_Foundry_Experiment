"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function SpacingSection({ state, update }: Props) {
  return <SectionCard title="Spacing" subtitle="Spacing controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
<Slider label="Padding" value={state.padding} min={0} max={80} step={1} onChange={(value) => update("padding", value)} />
<Slider label="Margin" value={state.margin} min={0} max={80} step={1} onChange={(value) => update("margin", value)} /></div>
    </SectionCard>;
}
