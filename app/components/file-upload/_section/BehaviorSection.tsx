"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { FileUploadState } from "../types";

type Props = {
  state: FileUploadState;
  update: <K extends keyof FileUploadState>(key: K, value: FileUploadState[K]) => void;
};

export default function BehaviorSection({ state: _state, update: _update }: Props) {
  return (
    <SectionCard title="Behavior" subtitle="Animation behavior.">
      <p className="text-sm" style={{ color: "var(--muted)" }}>Use the Transitions section to control animation duration and easing.</p>
    </SectionCard>
  );
}
