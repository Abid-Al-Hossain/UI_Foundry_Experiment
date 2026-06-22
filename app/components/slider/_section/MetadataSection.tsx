"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import type { SliderState } from "../types";

type Props = {
  state: SliderState;
  update: <K extends keyof SliderState>(key: K, value: SliderState[K]) => void;
};

export default function MetadataSection({ state, update }: Props) {
  return (
    <SectionCard title="Metadata" subtitle="Metadata controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Input label="id" value={state.id} onChange={(value) => update("id", value)} />
      <Input label="name" value={state.name} onChange={(value) => update("name", value)} />
      <Input label="title" value={state.title} onChange={(value) => update("title", value)} />
      <Input label="ariaLabel" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
      <Input label="ariaDescribedBy" value={state.ariaDescribedBy} onChange={(value) => update("ariaDescribedBy", value)} />
      <Slider label="tabIndex" value={state.tabIndex} min={0} max={4} step={1} onChange={(value) => update("tabIndex", value)} />
    </div>
    </SectionCard>
  );
}
