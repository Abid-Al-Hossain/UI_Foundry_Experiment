"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation.">
      <div className="space-y-4"><Switch label="Newsletter" checked={state.showNewsletter} onChange={(value) => update("showNewsletter", value)} />
<Switch label="Social links" checked={state.showSocial} onChange={(value) => update("showSocial", value)} />
<Switch label="Legal row" checked={state.showLegal} onChange={(value) => update("showLegal", value)} /></div>
    </SectionCard>;
}
