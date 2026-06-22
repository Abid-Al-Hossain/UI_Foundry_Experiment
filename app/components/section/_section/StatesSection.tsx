"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Input from "@/app/components/controls/input/Input";
import type { SectionState } from "../types";

type Props = { state: SectionState; update: <K extends keyof SectionState>(key: K, value: SectionState[K]) => void };

export default function StatesSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="State Preview" subtitle="State Preview controls for native layout/page-structure generation.">
        <Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "collapsed",
  "mobile",
  "overflow"
]} onChange={(value) => update("previewState", value)} />
      </SectionCard>
      <SectionCard title="Hover" subtitle="Real hover state for interactive (clickable) sections.">
      <div className="space-y-4">
        <Switch label="Enabled" checked={state.hoverEnabled} onChange={(value) => update("hoverEnabled", value)} />
        <ColorControl label="Hover background" value={state.hoverBg} onChange={(v) => update("hoverBg", v)} />
        <ColorControl label="Hover border" value={state.hoverBorder} onChange={(v) => update("hoverBorder", v)} />
        <Input label="Hover shadow (CSS box-shadow)" value={state.hoverShadow} onChange={(v) => update("hoverShadow", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
