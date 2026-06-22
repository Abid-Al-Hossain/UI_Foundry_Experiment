"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { ListState } from "../types";

type Props = { state: ListState; update: <K extends keyof ListState>(key: K, value: ListState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native list generation."><Select label="List mode" value={state.listMode} options={[
  "unordered",
  "ordered",
  "menu",
  "listbox"
]} onChange={(value) => update("listMode", value)} /></SectionCard>;
}
