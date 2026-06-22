"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { FilterPanelState } from "../types";

type Props = { state: FilterPanelState; update: <K extends keyof FilterPanelState>(key: K, value: FilterPanelState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native filter generation."><Select label="Layout mode" value={state.layoutMode} options={[
  "centered",
  "sidebar",
  "grouped",
  "inline",
  "stacked"
]} onChange={(value) => update("layoutMode", value)} /></SectionCard>;
}
