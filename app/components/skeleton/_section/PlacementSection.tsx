"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { SkeletonState } from "../types";

type Props = { state: SkeletonState; update: <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => void };

export default function PlacementSection({ state }: Props) {
  return <SectionCard title="Placement" subtitle="Placement summary for native skeleton generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>The <strong>{state.pattern}</strong> skeleton is rendered inside busy region <strong>#{state.id}</strong>.</div></SectionCard>;
}
