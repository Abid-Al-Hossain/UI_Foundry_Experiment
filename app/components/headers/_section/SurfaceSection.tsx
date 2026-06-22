"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Switch from "@/app/components/controls/input/Switch";
import type { HeaderState } from "../types";

type Props = { state: HeaderState; update: <K extends keyof HeaderState>(key: K, value: HeaderState[K]) => void };

export default function SurfaceSection({ state, update }: Props) {
  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation."><Switch label="Sticky" checked={state.sticky} onChange={(value) => update("sticky", value)} /></SectionCard>;
}
