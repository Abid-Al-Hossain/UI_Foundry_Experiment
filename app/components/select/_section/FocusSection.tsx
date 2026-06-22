"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { SelectStudioState } from "../types";

type Props = {
  state: SelectStudioState;
  update: <K extends keyof SelectStudioState>(key: K, value: SelectStudioState[K]) => void;
};

export default function FocusSection({ state, update }: Props) {
  return (
    <SectionCard title="Focus" subtitle="Focus controls that are native, preview-honest, and React-export-honest.">
      <Slider label="Focus ring" value={state.focusRing} min={0} max={8} step={1} onChange={(value) => update("focusRing", value)} />
    </SectionCard>
  );
}
