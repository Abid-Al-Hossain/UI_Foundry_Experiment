"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { ContainerState } from "../types";

type Props = { state: ContainerState; update: <K extends keyof ContainerState>(key: K, value: ContainerState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Control container width behavior and page alignment.">
      <div className="space-y-4"><Switch label="Fluid width" checked={state.fluid} onChange={(value) => update("fluid", value)} /><Switch label="Center horizontally" checked={state.centered} onChange={(value) => update("centered", value)} /></div>
    </SectionCard>;
}
