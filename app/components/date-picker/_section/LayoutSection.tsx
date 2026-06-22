"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Component-native layout rhythm.">
      <div className="space-y-4">
      <Slider label="Gap" value={state.gap} min={4} max={32} step={1} onChange={(value) => update("gap", value)} />
      <Slider label="Padding" value={state.padding} min={10} max={40} step={1} onChange={(value) => update("padding", value)} />
    </div>
    </SectionCard>
  );
}
