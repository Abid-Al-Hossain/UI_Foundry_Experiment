"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { EmptyStateState } from "../types";

type Props = { state: EmptyStateState; update: <K extends keyof EmptyStateState>(key: K, value: EmptyStateState[K]) => void };

export default function PlacementSection({ state }: Props) {
  return <SectionCard title="Placement" subtitle="Placement summary for native empty generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>The <strong>{state.layoutMode}</strong> layout is rendered inside <strong>#{state.id}</strong>.</div></SectionCard>;
}
