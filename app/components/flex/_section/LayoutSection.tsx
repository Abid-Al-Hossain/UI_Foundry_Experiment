"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { FlexState } from "../types";

type Props = { state: FlexState; update: <K extends keyof FlexState>(key: K, value: FlexState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native layout/page-structure generation.">
      <div className="space-y-4"><Select label="Direction" value={state.direction} options={[
  "row",
  "column",
  "row-reverse",
  "column-reverse"
]} onChange={(value) => update("direction", value)} />
<Select label="Wrap" value={state.wrap} options={[
  "nowrap",
  "wrap",
  "wrap-reverse"
]} onChange={(value) => update("wrap", value)} />
<Select label="Justify" value={state.justify} options={[
  "start",
  "center",
  "end",
  "space-between",
  "space-around"
]} onChange={(value) => update("justify", value)} />
<Select label="Align" value={state.align} options={[
  "start",
  "center",
  "end",
  "stretch"
]} onChange={(value) => update("align", value)} /></div>
    </SectionCard>;
}
