"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { LayoutDividerState } from "../types";

type Props = { state: LayoutDividerState; update: <K extends keyof LayoutDividerState>(key: K, value: LayoutDividerState[K]) => void };

export default function BasicsSection({ state, update }: Props) {
  return <SectionCard title="Basics" subtitle="Basics controls for native layout/page-structure generation.">
      <div className="space-y-4"><Input label="Title" value={state.title} onChange={(value) => update("title", value)} />
<Input label="Description" value={state.description} onChange={(value) => update("description", value)} /></div>
    </SectionCard>;
}
