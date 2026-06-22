"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function SizingSection({ state, update }: Props) {
  return (
    <SectionCard title="Sizing" subtitle="Width, height, and scale controls.">
      <div className="space-y-4">
      <Slider label="Width" value={state.width} min={240} max={620} step={1} onChange={(value) => update("width", value)} />
      <Slider label="Max height" value={state.maxHeight} min={160} max={640} step={1} onChange={(value) => update("maxHeight", value)} />
      <Slider label="Padding" value={state.padding} min={10} max={40} step={1} onChange={(value) => update("padding", value)} />
      <Slider label="Gap" value={state.gap} min={4} max={32} step={1} onChange={(value) => update("gap", value)} />
    </div>
    </SectionCard>
  );
}
