"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { LayoutDividerState } from "../types";

type Props = { state: LayoutDividerState; update: <K extends keyof LayoutDividerState>(key: K, value: LayoutDividerState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation."><Switch label="Decorative" checked={state.decorative} onChange={(value) => update("decorative", value)} /></SectionCard>;
}
