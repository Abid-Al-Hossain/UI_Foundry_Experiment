"use client";

import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { GridState } from "../types";

type Props = { state: GridState; update: <K extends keyof GridState>(key: K, value: GridState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="Landmark label and semantic role controls for native grid generation.">
      <div className="space-y-4">
      <Input label="Landmark label" value={state.landmarkLabel} onChange={(value) => update("landmarkLabel", value)} />
      <Select
        label="Semantic role"
        value={state.role}
        options={["group", "region", "main", "banner", "contentinfo", "navigation"]}
        onChange={(value) => update("role", value)}
      />
    </div>
    </SectionCard>
  );
}
