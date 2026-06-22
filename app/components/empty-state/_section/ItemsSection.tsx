"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { EmptyStateState } from "../types";

type Props = { state: EmptyStateState; update: <K extends keyof EmptyStateState>(key: K, value: EmptyStateState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  const splitList = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);
  return <SectionCard title="Items" subtitle="Suggestions and resource chips for native empty generation.">
      <div className="space-y-4"><Input label="Suggestions" value={state.suggestions.join(", ")} onChange={(value) => update("suggestions", splitList(value))} />
<Input label="Resources" value={state.resources.join(", ")} onChange={(value) => update("resources", splitList(value))} /></div>
    </SectionCard>;
}
