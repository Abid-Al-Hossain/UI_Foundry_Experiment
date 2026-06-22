"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function ContentSection({ state, update }: Props) {
  return (
    <SectionCard title="Content" subtitle="Text, labels, and visible content structure.">
      <div className="space-y-4">
      <Input label="Primary action" value={state.primaryAction} onChange={(value) => update("primaryAction", value)} />
      <Input label="Secondary action" value={state.secondaryAction} onChange={(value) => update("secondaryAction", value)} />
      <Switch label="Match trigger width" checked={state.sameWidth} onChange={(value) => update("sameWidth", value)} />
    </div>
    </SectionCard>
  );
}
