"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { SelectStudioState } from "../types";

type Props = {
  state: SelectStudioState;
  update: <K extends keyof SelectStudioState>(key: K, value: SelectStudioState[K]) => void;
};

export default function StatesSection({ state, update }: Props) {
  return (
    <SectionCard title="State Preview" subtitle="State Preview controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "disabled",
  "invalid",
  "loading",
  "empty",
  "filled"
]} onChange={(value) => update("previewState", value)} />
      <Switch label="Show helper" checked={state.showHelper} onChange={(value) => update("showHelper", value)} />
      <Switch label="Show success" checked={state.showSuccess} onChange={(value) => update("showSuccess", value)} />
    </div>
    </SectionCard>
  );
}
