"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { FileUploadState } from "../types";

type Props = {
  state: FileUploadState;
  update: <K extends keyof FileUploadState>(key: K, value: FileUploadState[K]) => void;
};

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Layout controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Slider label="Gap" value={state.gap} min={4} max={36} step={1} onChange={(value) => update("gap", value)} />
      <Slider label="Padding" value={state.padding} min={10} max={44} step={1} onChange={(value) => update("padding", value)} />
    </div>
    </SectionCard>
  );
}
