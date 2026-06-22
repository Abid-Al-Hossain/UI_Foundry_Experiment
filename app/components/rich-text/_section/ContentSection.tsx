"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Select from "@/app/components/controls/input/Select";
import type { RichTextState } from "../types";

type Props = { state: RichTextState; update: <K extends keyof RichTextState>(key: K, value: RichTextState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native richtext generation.">
      <div className="space-y-4"><Input label="Placeholder" value={state.placeholder} onChange={(value) => update("placeholder", value)} /><Select label="Block type" value={state.blockType} options={["paragraph", "heading", "quote", "checklist"]} onChange={(value) => update("blockType", value)} /><Select label="Toolbar mode" value={state.toolbarMode} options={["full", "compact", "marks", "none"]} onChange={(value) => update("toolbarMode", value)} /></div>
    </SectionCard>;
}
