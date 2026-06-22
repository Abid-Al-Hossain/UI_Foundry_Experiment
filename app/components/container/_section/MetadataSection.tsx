"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function MetadataSection({ state, update }: Props) {
  return <SectionCard title="Metadata" subtitle="Metadata controls for native layout/page-structure generation.">
      <div className="space-y-4"><Input label="id" value={state.id} onChange={(value) => update("id", value)} />
<Select label="Element" value={state.element} options={[
  "div",
  "section",
  "main",
  "header",
  "footer",
  "aside",
  "nav",
  "hr"
]} onChange={(value) => update("element", value)} />
<Select label="Role" value={state.role} options={[
  "presentation",
  "group",
  "region"
]} onChange={(value) => update("role", value)} />
<Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} /></div>
    </SectionCard>;
}
