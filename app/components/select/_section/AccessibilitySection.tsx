"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { SelectStudioState } from "../types";

type Props = {
  state: SelectStudioState;
  update: <K extends keyof SelectStudioState>(key: K, value: SelectStudioState[K]) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="Accessibility controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Select label="dir" value={state.dir} options={[
  "ltr",
  "rtl",
  "auto"
]} onChange={(value) => update("dir", value)} />
      <Input label="lang" value={state.lang} onChange={(value) => update("lang", value)} />
    </div>
    </SectionCard>
  );
}
