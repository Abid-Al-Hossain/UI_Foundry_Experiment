"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { SettingsPanelState } from "../types";

type Props = { state: SettingsPanelState; update: <K extends keyof SettingsPanelState>(key: K, value: SettingsPanelState[K]) => void };

export default function ContentSection(props: Props) {
  void props;
  return <SectionCard title="Content" subtitle="Content controls for native settings generation."><div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>No separate native controls are needed for this section in this component.</div></SectionCard>;
}
