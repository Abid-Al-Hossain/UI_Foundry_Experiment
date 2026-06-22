"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { AlertState } from "../types";

type Props = { state: AlertState; update: <K extends keyof AlertState>(key: K, value: AlertState[K]) => void };

export default function PlacementSection({ state, update }: Props) {
  return <SectionCard title="Placement" subtitle="Placement controls for native alert generation."><Select label="Placement" value={state.placement} options={[
  "inline",
  "top",
  "right",
  "bottom",
  "left",
  "bottom-right"
]} onChange={(value) => update("placement", value)} /></SectionCard>;
}
