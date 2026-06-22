"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native layout/page-structure generation."><Select label="Mobile mode" value={state.mobileMode} options={[
  "collapse",
  "drawer",
  "stack"
]} onChange={(value) => update("mobileMode", value)} /></SectionCard>;
}
