"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { SkeletonState } from "../types";

type Props = { state: SkeletonState; update: <K extends keyof SkeletonState>(key: K, value: SkeletonState[K]) => void };

export default function ContentSection({ state }: Props) {
  return <SectionCard title="Content" subtitle="Content summary for native skeleton generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{state.label}: {state.description}</div></SectionCard>;
}
