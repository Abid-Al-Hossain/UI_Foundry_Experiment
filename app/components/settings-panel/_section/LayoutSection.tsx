"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { SettingsPanelState } from "../types";

type Props = { state: SettingsPanelState; update: <K extends keyof SettingsPanelState>(key: K, value: SettingsPanelState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native settings generation."><Select label="Layout mode" value={state.layoutMode} options={[
  "centered",
  "sidebar",
  "grouped",
  "inline",
  "stacked"
]} onChange={(value) => update("layoutMode", value)} /></SectionCard>;
}
