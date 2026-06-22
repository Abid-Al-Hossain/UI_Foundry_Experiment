"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { SelectStudioState } from "../types";

type Props = {
  state: SelectStudioState;
  update: <K extends keyof SelectStudioState>(key: K, value: SelectStudioState[K]) => void;
};

export default function FieldSection({ state, update }: Props) {
  return (
    <SectionCard title="Field" subtitle="Field controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Input label="Value" value={state.value} onChange={(value) => update("value", value)} />
      <Input label="Placeholder" value={state.placeholder} onChange={(value) => update("placeholder", value)} />
      <Slider label="Option count" value={state.optionCount} min={2} max={12} step={1} onChange={(value) => update("optionCount", value)} />
      <Slider label="Groups" value={state.groupCount} min={1} max={4} step={1} onChange={(value) => update("groupCount", value)} />
      <Select label="Mode" value={state.selectMode} options={[
  "native",
  "custom-listbox",
  "combobox"
]} onChange={(value) => update("selectMode", value)} />
      <Select label="Panel side" value={state.panelSide} options={[
  "bottom",
  "top"
]} onChange={(value) => update("panelSide", value)} />
      <Switch label="Multiple" checked={state.multiple} onChange={(value) => update("multiple", value)} />
      <Switch label="Searchable" checked={state.searchable} onChange={(value) => update("searchable", value)} />
      <Switch label="Clearable" checked={state.clearable} onChange={(value) => update("clearable", value)} />
    </div>
    </SectionCard>
  );
}
