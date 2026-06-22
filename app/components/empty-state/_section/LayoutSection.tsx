"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { EmptyStateState } from "../types";

type Props = { state: EmptyStateState; update: <K extends keyof EmptyStateState>(key: K, value: EmptyStateState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native empty generation."><Select label="Layout mode" value={state.layoutMode} options={[
  "centered",
  "sidebar",
  "grouped",
  "inline",
  "stacked"
]} onChange={(value) => update("layoutMode", value)} /></SectionCard>;
}
