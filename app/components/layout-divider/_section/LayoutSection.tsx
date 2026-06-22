"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import type { LayoutDividerState } from "../types";

type Props = { state: LayoutDividerState; update: <K extends keyof LayoutDividerState>(key: K, value: LayoutDividerState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Visible divider label used in preview and exported JSX."><Input label="Divider label" value={state.contentLabel} onChange={(value) => update("contentLabel", value)} /></SectionCard>;
}
