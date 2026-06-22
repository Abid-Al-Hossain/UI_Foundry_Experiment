"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { SpacerState } from "../types";

type Props = { state: SpacerState; update: <K extends keyof SpacerState>(key: K, value: SpacerState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation.">
      <div className="space-y-4"><Switch label="Decorative" checked={state.decorative} onChange={(value) => update("decorative", value)} />
<Switch label="Debug visible" checked={state.debugVisible} onChange={(value) => update("debugVisible", value)} /></div>
    </SectionCard>;
}
