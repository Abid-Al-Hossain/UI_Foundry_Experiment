"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { HeaderState } from "../types";

type Props = { state: HeaderState; update: <K extends keyof HeaderState>(key: K, value: HeaderState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native layout/page-structure generation."><Select label="Mobile mode" value={state.mobileMode} options={[
  "collapse",
  "drawer",
  "stack"
]} onChange={(value) => update("mobileMode", value)} /></SectionCard>;
}
