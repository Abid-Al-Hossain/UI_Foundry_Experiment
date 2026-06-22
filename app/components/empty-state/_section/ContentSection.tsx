"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import type { EmptyStateState } from "../types";

type Props = { state: EmptyStateState; update: <K extends keyof EmptyStateState>(key: K, value: EmptyStateState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Action content for native empty generation.">
      <div className="space-y-4"><Input label="Primary action" value={state.primaryActionLabel} onChange={(value) => update("primaryActionLabel", value)} />
<Switch label="Show primary action" checked={state.showPrimaryAction} onChange={(value) => update("showPrimaryAction", value)} />
<Input label="Secondary action" value={state.secondaryActionLabel} onChange={(value) => update("secondaryActionLabel", value)} />
<Switch label="Show secondary action" checked={state.showSecondaryAction} onChange={(value) => update("showSecondaryAction", value)} /></div>
    </SectionCard>;
}
