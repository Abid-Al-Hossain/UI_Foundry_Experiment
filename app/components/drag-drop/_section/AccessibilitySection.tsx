"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Input from "@/app/components/controls/input/Input";
import Switch from "@/app/components/controls/input/Switch";
import type { DragDropState } from "../types";

type Props = { state: DragDropState; update: <K extends keyof DragDropState>(key: K, value: DragDropState[K]) => void };

export default function AccessibilitySection({ state, update }: Props) {
  return <SectionCard title="Accessibility" subtitle="Accessibility controls for native dragdrop generation.">
      <div className="space-y-4"><Input label="Accessible label" value={state.ariaLabel} onChange={(value) => update("ariaLabel", value)} />
<Input label="Help text" value={state.helper} onChange={(value) => update("helper", value)} />
<Switch label="Keyboard help" checked={state.keyboardHelp} onChange={(value) => update("keyboardHelp", value)} /></div>
    </SectionCard>;
}
