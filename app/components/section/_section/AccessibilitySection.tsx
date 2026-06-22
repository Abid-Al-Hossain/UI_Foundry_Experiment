"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { SectionState } from "../types";

type Props = { state: SectionState; update: <K extends keyof SectionState>(key: K, value: SectionState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native layout/page-structure generation.">
      <div className="space-y-4"><Input label="Landmark label" value={state.landmarkLabel} onChange={(value) => update("landmarkLabel", value)} />
<Select label="Semantic role" value={state.role} options={[
  "presentation",
  "group",
  "region"
]} onChange={(value) => update("role", value)} /></div>
    </SectionCard>;
}
