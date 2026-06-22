"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { FileUploadState } from "../types";

type Props = {
  state: FileUploadState;
  update: <K extends keyof FileUploadState>(key: K, value: FileUploadState[K]) => void;
};

export default function FieldSection({ state, update }: Props) {
  return (
    <SectionCard title="Field" subtitle="Field controls that are native, preview-honest, and React-export-honest.">
      <div className="space-y-4">
      <Input label="Accepted types" value={state.accept} onChange={(value) => update("accept", value)} />
      <Select label="Capture" value={state.capture} options={[
  "",
  "user",
  "environment"
]} onChange={(value) => update("capture", value)} />
      <Input label="Max size label" value={state.maxSizeLabel} onChange={(value) => update("maxSizeLabel", value)} />
      <Input label="Selected file preview" value={state.value} onChange={(value) => update("value", value)} />
      <Slider label="Max files" value={state.maxFileCount} min={1} max={12} step={1} onChange={(value) => update("maxFileCount", value)} />
      <Select label="Drop mode" value={state.dropMode} options={[
  "dropzone",
  "button",
  "compact"
]} onChange={(value) => update("dropMode", value)} />
      <Select label="File list" value={state.listMode} options={[
  "cards",
  "rows",
  "chips"
      ]} onChange={(value) => update("listMode", value)} />
      <Switch label="Multiple" checked={state.multiple} onChange={(value) => update("multiple", value)} />
      <Switch label="Show browse action" checked={state.showBrowseAction} onChange={(value) => update("showBrowseAction", value)} />
      <Switch label="Show remove action" checked={state.showRemoveAction} onChange={(value) => update("showRemoveAction", value)} />
    </div>
    </SectionCard>
  );
}
