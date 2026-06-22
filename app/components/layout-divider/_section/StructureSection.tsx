"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { LayoutDividerState } from "../types";

type Props = { state: LayoutDividerState; update: <K extends keyof LayoutDividerState>(key: K, value: LayoutDividerState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Structure controls for native layout/page-structure generation."><Select label="Orientation" value={state.orientation} options={[
  "horizontal",
  "vertical"
]} onChange={(value) => update("orientation", value)} /></SectionCard>;
}
