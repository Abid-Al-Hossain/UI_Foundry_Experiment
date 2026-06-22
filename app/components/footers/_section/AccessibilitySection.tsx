"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { FooterState } from "../types";

type Props = { state: FooterState; update: <K extends keyof FooterState>(key: K, value: FooterState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native layout/page-structure generation."><Input label="Landmark label" value={state.landmarkLabel} onChange={(value) => update("landmarkLabel", value)} />
<div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>Footer link nav, social nav, legal text, and newsletter label are reflected in preview and React export.</div></SectionCard>;
}
