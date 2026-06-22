"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { GalleryState } from "../types";

type Props = { state: GalleryState; update: <K extends keyof GalleryState>(key: K, value: GalleryState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Layout" subtitle="Grid columns and layout mode via filter.">
      <div className="space-y-4">
        <Slider label="Columns" value={state.columns} min={1} max={6} step={1} onChange={(value) => update("columns", value)} />
        <Select label="Filter mode" value={state.filterMode} options={["grid", "masonry", "list", "none"]} onChange={(value) => update("filterMode", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Interaction" subtitle="Selection and caption display.">
      <div className="space-y-4">
        <Switch label="Selectable" checked={state.selectable} onChange={(value) => update("selectable", value)} />
        <Switch label="Show captions" checked={state.showCaptions} onChange={(value) => update("showCaptions", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
