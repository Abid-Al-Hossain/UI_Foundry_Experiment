"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { SpacerState } from "../types";

type Props = { state: SpacerState; update: <K extends keyof SpacerState>(key: K, value: SpacerState[K]) => void };

export default function StatesSection({ state, update }: Props) {
  return <SectionCard title="State Preview" subtitle="State Preview controls for native layout/page-structure generation."><Select label="Preview state" value={state.previewState} options={[
  "default",
  "hover",
  "focus",
  "active",
  "collapsed",
  "mobile",
  "overflow"
]} onChange={(value) => update("previewState", value)} />
</SectionCard>;
}
