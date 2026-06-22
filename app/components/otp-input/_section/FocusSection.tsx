"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { OtpInputState } from "../types";

type Props = {
  state: OtpInputState;
  update: <K extends keyof OtpInputState>(key: K, value: OtpInputState[K]) => void;
};

export default function FocusSection({ state, update }: Props) {
  return (
    <SectionCard title="Focus" subtitle="Focus controls that are native, preview-honest, and React-export-honest.">
      <Slider label="Focus ring" value={state.focusRing} min={0} max={8} step={1} onChange={(value) => update("focusRing", value)} />
    </SectionCard>
  );
}
