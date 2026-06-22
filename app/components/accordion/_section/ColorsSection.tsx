"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { AccordionState } from "../types";

type Props = { state: AccordionState; update: <K extends keyof AccordionState>(key: K, value: AccordionState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Outer container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Trigger" subtitle="Accordion header button colors.">
      <div className="space-y-4">
        <ColorControl label="Item border" value={state.itemBorder} onChange={(v) => update("itemBorder", v)} />
        <ColorControl label="Closed background" value={state.triggerBg} onChange={(v) => update("triggerBg", v)} />
        <ColorControl label="Closed text" value={state.triggerText} onChange={(v) => update("triggerText", v)} />
        <ColorControl label="Open background" value={state.triggerOpenBg} onChange={(v) => update("triggerOpenBg", v)} />
        <ColorControl label="Open text" value={state.triggerOpenText} onChange={(v) => update("triggerOpenText", v)} />
        <ColorControl label="Open border" value={state.openTriggerBorder} onChange={(v) => update("openTriggerBorder", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Trigger states & icon" subtitle="Hover, focus, and chevron/plus icon.">
      <div className="space-y-4">
        <ColorControl label="Hover background" value={state.hoverTriggerBg} onChange={(v) => update("hoverTriggerBg", v)} />
        <ColorControl label="Hover text" value={state.hoverTriggerText} onChange={(v) => update("hoverTriggerText", v)} />
        <ColorControl label="Focused background" value={state.focusedTriggerBg} onChange={(v) => update("focusedTriggerBg", v)} />
        <ColorControl label="Icon color" value={state.triggerIconColor} onChange={(v) => update("triggerIconColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Panel" subtitle="Expanded content area colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.panelBg} onChange={(v) => update("panelBg", v)} />
        <ColorControl label="Text" value={state.panelText} onChange={(v) => update("panelText", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
