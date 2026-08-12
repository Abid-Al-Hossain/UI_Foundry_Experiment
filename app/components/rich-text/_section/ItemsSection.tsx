"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { RichTextState } from "../types";

type Props = { state: RichTextState; update: <K extends keyof RichTextState>(key: K, value: RichTextState[K]) => void };

export default function ItemsSection({ state, update }: Props) {
  return <SectionCard title="Items" subtitle="Items controls for native richtext generation.">
      <div className="space-y-4"><Switch label="Show mark controls" checked={state.showMarks} onChange={(value) => update("showMarks", value)} /><Switch label="Show list controls" checked={state.showLists} onChange={(value) => update("showLists", value)} /><Slider label="Character limit (0 = unlimited)" value={state.characterCount} min={0} max={1200} step={10} onChange={(value) => update("characterCount", value)} /></div>
    </SectionCard>;
}
