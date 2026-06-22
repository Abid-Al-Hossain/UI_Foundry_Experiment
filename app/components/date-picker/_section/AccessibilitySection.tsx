"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { DatePickerStudioState } from "../types";

type Props = {
  state: DatePickerStudioState;
  update: <K extends keyof DatePickerStudioState>(key: K, value: DatePickerStudioState[K]) => void;
};

export default function AccessibilitySection({ state, update }: Props) {
  return (
    <SectionCard title="Accessibility" subtitle="ARIA, labels, language, and semantic guidance.">
      <div className="space-y-4">
      <Select label="dir" value={state.dir} options={[
  "ltr",
  "rtl",
  "auto"
]} onChange={(value) => update("dir", value)} />
      <Input label="lang" value={state.lang} onChange={(value) => update("lang", value)} />
      <Select label="inputMode" value={state.inputMode} options={[
  "none",
  "text",
  "numeric",
  "decimal"
]} onChange={(value) => update("inputMode", value)} />
      <Select label="enterKeyHint" value={state.enterKeyHint} options={[
  "enter",
  "done",
  "go",
  "next",
  "search",
  "send"
]} onChange={(value) => update("enterKeyHint", value)} />
    </div>
    </SectionCard>
  );
}
