"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Structure controls for native layout/page-structure generation.">
      <div className="space-y-4"><Slider label="Columns" value={state.columnCount} min={1} max={6} step={1} onChange={(value) => update("columnCount", value)} />
<Slider label="Links" value={state.linkCount} min={1} max={12} step={1} onChange={(value) => update("linkCount", value)} /></div>
    </SectionCard>;
}
