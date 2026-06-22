"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { AccordionState } from "../types";

type Props = { state: AccordionState; update: <K extends keyof AccordionState>(key: K, value: AccordionState[K]) => void };

export default function ContentSection({ state, update }: Props) {
  return <SectionCard title="Content" subtitle="Content controls for native accordion generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
