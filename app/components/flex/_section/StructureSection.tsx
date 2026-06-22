"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import type { FlexState } from "../types";

type Props = { state: FlexState; update: <K extends keyof FlexState>(key: K, value: FlexState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Choose the exported wrapper and number of flex items.">
      <div className="space-y-4"><Select label="Semantic tag" value={state.element} options={[
  "div",
  "section",
  "main",
  "header",
  "footer",
  "aside",
  "nav"
]} onChange={(value) => update("element", value)} /><Slider label="Item count" value={state.itemCount} min={1} max={12} step={1} onChange={(value) => update("itemCount", value)} /></div>
    </SectionCard>;
}
