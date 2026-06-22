"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function SizingSection({ state, update }: Props) {
  return (
    <SectionCard title="Sizing" subtitle="Width, height, and scale controls.">
      <div className="space-y-4">
      <Slider label="Width" value={state.width} min={260} max={720} step={1} onChange={(value) => update("width", value)} />
      <Slider label="Height" value={state.height} min={82} max={220} step={1} onChange={(value) => update("height", value)} />
    </div>
    </SectionCard>
  );
}
