"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native layout/page-structure generation.">
      <div className="space-y-4"><Input label="Landmark label" value={state.landmarkLabel} onChange={(value) => update("landmarkLabel", value)} />
<Select label="Semantic role" value={state.role} options={[
  "presentation",
  "group",
  "region"
]} onChange={(value) => update("role", value)} />
<Switch label="Safe area" checked={state.safeArea} onChange={(value) => update("safeArea", value)} /></div>
    </SectionCard>;
}
