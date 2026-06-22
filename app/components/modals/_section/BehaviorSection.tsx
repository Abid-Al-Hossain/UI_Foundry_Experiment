"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Dismiss" subtitle="How the modal closes.">
      <div className="space-y-4">
        <Switch label="Close on Escape" checked={state.closeOnEscape} onChange={(value) => update("closeOnEscape", value)} />
        <Switch label="Close on outside click" checked={state.closeOnOutside} onChange={(value) => update("closeOnOutside", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Overlay & Scroll" subtitle="Overlay and scrollable content options.">
      <div className="space-y-4">
        <Switch label="Show overlay" checked={state.showOverlay} onChange={(value) => update("showOverlay", value)} />
        <Switch label="Modal (aria-modal)" checked={state.modal} onChange={(value) => update("modal", value)} />
        <Switch label="Scrollable content" checked={state.scrollable} onChange={(value) => update("scrollable", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Actions" subtitle="Action button layout and open state.">
      <div className="space-y-4">
        <Select label="Action layout" value={state.actionLayout} options={["row", "column"]} onChange={(value) => update("actionLayout", value)} />
        <Switch label="Default open" checked={state.defaultOpen ?? state.previewState === "open"} onChange={(value) => update("defaultOpen", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
