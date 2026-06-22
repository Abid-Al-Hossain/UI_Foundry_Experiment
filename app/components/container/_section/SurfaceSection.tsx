"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation.">
      <div className="space-y-4"><Switch label="Centered" checked={state.centered} onChange={(value) => update("centered", value)} />
<Switch label="Fluid" checked={state.fluid} onChange={(value) => update("fluid", value)} /></div>
    </SectionCard>;
}
