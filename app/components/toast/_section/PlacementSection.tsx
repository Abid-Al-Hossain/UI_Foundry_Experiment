"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { ToastState } from "../types";

type Props = { state: ToastState; update: <K extends keyof ToastState>(key: K, value: ToastState[K]) => void };

export default function PlacementSection({ state, update }: Props) {
  return <SectionCard title="Placement" subtitle="Placement controls for native toast generation.">
      <div className="space-y-4"><Select label="Placement" value={state.placement} options={[
  "inline",
  "top",
  "right",
  "bottom",
  "left",
  "bottom-right"
]} onChange={(value) => update("placement", value)} />
<Select label="Swipe" value={state.swipeDirection} options={[
  "left",
  "right",
  "up",
  "down"
]} onChange={(value) => update("swipeDirection", value)} /></div>
    </SectionCard>;
}
