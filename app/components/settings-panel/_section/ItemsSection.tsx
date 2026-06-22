"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { SettingsPanelState } from "../types";

type Props = { state: SettingsPanelState; update: <K extends keyof SettingsPanelState>(key: K, value: SettingsPanelState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native settings generation.">
      <div className="space-y-4"><Slider label="Groups" value={state.groupCount} min={1} max={8} step={1} onChange={(value) => update("groupCount", value)} />
<Slider label="Controls" value={state.controlCount} min={1} max={16} step={1} onChange={(value) => update("controlCount", value)} /></div>
    </SectionCard>;
}
