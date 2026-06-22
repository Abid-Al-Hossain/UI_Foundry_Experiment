"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import type { LightboxState } from "../types";

type Props = { state: LightboxState; update: <K extends keyof LightboxState>(key: K, value: LightboxState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native lightbox generation."><Slider label="Media count" value={state.mediaCount} min={1} max={10} step={1} onChange={(value) => update("mediaCount", value)} /></SectionCard>;
}
