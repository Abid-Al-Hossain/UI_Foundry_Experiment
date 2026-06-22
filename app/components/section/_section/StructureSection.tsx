"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import type { SectionState } from "../types";

type Props = { state: SectionState; update: <K extends keyof SectionState>(key: K, value: SectionState[K]) => void };

export default function StructureSection({ state, update }: Props) {
  return <SectionCard title="Structure" subtitle="Choose the native section wrapper and heading level.">
      <div className="space-y-4"><Select label="Semantic tag" value={state.element} options={[
  "section",
  "div",
  "main",
  "header",
  "footer",
  "aside",
  "nav"
]} onChange={(value) => update("element", value)} /><Select label="Heading" value={state.headingLevel} options={[
  "h1",
  "h2",
  "h3",
  "h4"
]} onChange={(value) => update("headingLevel", value)} /></div>
    </SectionCard>;
}
