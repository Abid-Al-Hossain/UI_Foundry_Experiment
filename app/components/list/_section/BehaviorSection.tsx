"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { ListState } from "../types";

type Props = { state: ListState; update: <K extends keyof ListState>(key: K, value: ListState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Items" subtitle="Visual treatment of list items.">
      <div className="space-y-4">
        <Switch label="Show avatars" checked={state.showAvatars} onChange={(value) => update("showAvatars", value)} />
        <Switch label="Show dividers" checked={state.showDividers} onChange={(value) => update("showDividers", value)} />
      </div>
    </SectionCard>
      <SectionCard title="State" subtitle="Interactive state of the list.">
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </SectionCard>
    </div>
  );
}
