"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { GridState } from "../types";

type Props = { state: GridState; update: <K extends keyof GridState>(key: K, value: GridState[K]) => void };

export default function SurfaceSection(props: Props) {
  void props;

  return <SectionCard title="Surface" subtitle="Surface controls for native layout/page-structure generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
