"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native breadcrumb generation.">
      <div className="space-y-4"><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Select label="aria-current" value={state.ariaCurrent} options={[
  "page",
  "step",
  "location",
  "date",
  "time",
  "true"
]} onChange={(value) => update("ariaCurrent", value)} /></div>
    </SectionCard>;
}
