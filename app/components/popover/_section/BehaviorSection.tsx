"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function BehaviorSection({ state, update }: Props) {
  return (
    <SectionCard title="Behavior" subtitle="Dismissal and modality behavior.">
      <div className="space-y-4">
      <Switch label="Modal behavior" checked={state.modal} onChange={(value) => update("modal", value)} />
      <Switch label="Close on Escape" checked={state.closeOnEscape} onChange={(value) => update("closeOnEscape", value)} />
      <Switch label="Close on outside interaction" checked={state.closeOnInteractOutside} onChange={(value) => update("closeOnInteractOutside", value)} />
      <Switch label="Close on scroll" checked={state.closeOnScroll} onChange={(value) => update("closeOnScroll", value)} />
    </div>
    </SectionCard>
  );
}
