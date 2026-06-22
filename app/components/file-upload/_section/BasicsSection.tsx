"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { FileUploadState } from "../types";

type Props = {
  state: FileUploadState;
  update: <K extends keyof FileUploadState>(key: K, value: FileUploadState[K]) => void;
};

export default function BasicsSection({ state, update }: Props) {
  return (
    <SectionCard title="Basics" subtitle="Basics controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Input label="Label" value={state.label} onChange={(value) => update("label", value)} />
      <Input label="Description" value={state.description} onChange={(value) => update("description", value)} />
      <Input label="Helper text" value={state.helper} onChange={(value) => update("helper", value)} />
    </div>
    </SectionCard>
  );
}
