"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function PlacementSection({ state, update }: Props) {
  return <SectionCard title="Placement" subtitle="Placement controls for native modal generation."><Select label="Panel placement" value={state.placement ?? "center"} options={[
  "center",
  "top",
  "bottom"
]} onChange={(value) => update("placement", value)} /></SectionCard>;
}
