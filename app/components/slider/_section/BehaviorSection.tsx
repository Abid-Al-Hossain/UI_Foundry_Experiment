"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { SliderState } from "../types";

type Props = {
  state: SliderState;
  update: <K extends keyof SliderState>(key: K, value: SliderState[K]) => void;
};

export default function BehaviorSection({ state: _state, update: _update }: Props) {
  return (
    <SectionCard title="Behavior" subtitle="Animation behavior.">
      <p className="text-sm" style={{ color: "var(--muted)" }}>Use the Transitions section to control animation duration and easing.</p>
    </SectionCard>
  );
}
