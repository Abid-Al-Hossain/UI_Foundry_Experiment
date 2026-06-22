"use client";

import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { GridState } from "../types";

type Props = { state: GridState; update: <K extends keyof GridState>(key: K, value: GridState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return (
    <SectionCard title="Metadata" subtitle="Semantic element and id controls for native grid generation.">
      <div className="space-y-4">
      <Input label="id" value={state.id} onChange={(value) => update("id", value)} />
      <Select
        label="Element"
        value={state.element}
        options={["div", "section", "main", "header", "footer", "aside", "nav"]}
        onChange={(value) => update("element", value)}
      />
      <Select
        label="Role"
        value={state.role}
        options={["group", "region", "main", "banner", "contentinfo", "navigation"]}
        onChange={(value) => update("role", value)}
      />
      <Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} />
    </div>
    </SectionCard>
  );
}
