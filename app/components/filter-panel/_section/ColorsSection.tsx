"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { FilterPanelState } from "../types";

type Props = { state: FilterPanelState; update: <K extends keyof FilterPanelState>(key: K, value: FilterPanelState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Base container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Action" subtitle="Primary button and call-to-action text.">
        <ColorControl label="Action text" value={state.actionText} onChange={(v) => update("actionText", v)} />
      </SectionCard>
      <SectionCard title="Chips" subtitle="Applied filter chip colors.">
      <div className="space-y-4">
        <ColorControl label="Chip background" value={state.chipBg} onChange={(v) => update("chipBg", v)} />
        <ColorControl label="Chip text" value={state.chipText} onChange={(v) => update("chipText", v)} />
        <ColorControl label="Chip border" value={state.chipBorder} onChange={(v) => update("chipBorder", v)} />
        <ColorControl label="Chip hover background" value={state.chipHoverBg} onChange={(v) => update("chipHoverBg", v)} />
        <ColorControl label="Chip remove" value={state.chipRemoveColor} onChange={(v) => update("chipRemoveColor", v)} />
        <ColorControl label="Chip remove hover bg" value={state.chipRemoveHoverBg} onChange={(v) => update("chipRemoveHoverBg", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Buttons" subtitle="Apply and reset button colors.">
      <div className="space-y-4">
        <ColorControl label="Apply background" value={state.applyBg} onChange={(v) => update("applyBg", v)} />
        <ColorControl label="Apply text" value={state.applyText} onChange={(v) => update("applyText", v)} />
        <ColorControl label="Apply hover background" value={state.applyHoverBg} onChange={(v) => update("applyHoverBg", v)} />
        <ColorControl label="Reset background" value={state.resetBg} onChange={(v) => update("resetBg", v)} />
        <ColorControl label="Reset text" value={state.resetText} onChange={(v) => update("resetText", v)} />
        <ColorControl label="Reset border" value={state.resetBorder} onChange={(v) => update("resetBorder", v)} />
        <ColorControl label="Reset hover background" value={state.resetHoverBg} onChange={(v) => update("resetHoverBg", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Headers & badge" subtitle="Group headers, panel header, and count badge.">
      <div className="space-y-4">
        <ColorControl label="Group header" value={state.groupHeaderColor} onChange={(v) => update("groupHeaderColor", v)} />
        <ColorControl label="Group divider" value={state.groupDividerColor} onChange={(v) => update("groupDividerColor", v)} />
        <ColorControl label="Panel header bg" value={state.panelHeaderBg} onChange={(v) => update("panelHeaderBg", v)} />
        <ColorControl label="Panel header border" value={state.panelHeaderBorder} onChange={(v) => update("panelHeaderBorder", v)} />
        <ColorControl label="Badge background" value={state.badgeCountBg} onChange={(v) => update("badgeCountBg", v)} />
        <ColorControl label="Badge text" value={state.badgeCountText} onChange={(v) => update("badgeCountText", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
