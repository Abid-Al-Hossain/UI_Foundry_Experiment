"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA, labels, language, and semantic guidance.">
      <div className="space-y-4">
      <Input label="Root id" value={state.id} onChange={(value) => update("id", value)} />
      <Input label="Trigger id" value={state.triggerId} onChange={(value) => update("triggerId", value)} />
      <Input label="Content id" value={state.contentId} onChange={(value) => update("contentId", value)} />
      <Input label="aria-labelledby" value={state.labelledBy} onChange={(value) => update("labelledBy", value)} />
      <Input label="aria-describedby" value={state.describedBy} onChange={(value) => update("describedBy", value)} />
      <Input label="aria-label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
      <Select
        label="Role"
        value={state.role}
        options={["dialog", "alertdialog", "tooltip", "none"]}
        onChange={(value) => update("role", value as PopoverStudioState["role"])}
      />
    </div>
    </SectionCard>
  );
}
