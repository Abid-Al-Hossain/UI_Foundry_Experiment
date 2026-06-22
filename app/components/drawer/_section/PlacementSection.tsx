"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function PlacementSection({ state, update }: Props) {
  return <SectionCard title="Placement" subtitle="Placement controls for native drawer generation."><Select label="Side" value={state.side} options={[
  "top",
  "right",
  "bottom",
  "left"
]} onChange={(value) => update("side", value)} /></SectionCard>;
}
