"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Layout" subtitle="Separator character and collapse mode.">
      <div className="space-y-4">
        <Select label="Separator" value={state.separator} options={["slash", "chevron", "dot", "pipe"]} onChange={(value) => update("separator", value)} />
        <Select label="Collapse mode" value={state.collapseMode} options={["none", "middle", "start", "end"]} onChange={(value) => update("collapseMode", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Icons" subtitle="Show icons alongside breadcrumb labels.">
        <Switch label="Show icons" checked={state.showIcons} onChange={(value) => update("showIcons", value)} />
      </SectionCard>
    </div>
  );
}
