"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native modal generation.">
      <div className="space-y-4"><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Switch label="Focus return" checked={state.focusReturn} onChange={(value) => update("focusReturn", value)} />
<div className="rounded-2xl border p-3 text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>The preview and React export move focus into the dialog, contain Tab navigation while modal, support Escape dismissal, and return focus to the trigger when enabled.</div></div>
    </SectionCard>;
}
