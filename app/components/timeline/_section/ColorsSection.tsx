"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { TimelineState } from "../types";

type Props = { state: TimelineState; update: <K extends keyof TimelineState>(key: K, value: TimelineState[K]) => void };

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
      <SectionCard title="Markers" subtitle="Default, active, and completed marker colors.">
      <div className="space-y-4">
        <ColorControl label="Marker background" value={state.markerBg} onChange={(v) => update("markerBg", v)} />
        <ColorControl label="Marker text" value={state.markerText} onChange={(v) => update("markerText", v)} />
        <ColorControl label="Marker border" value={state.markerBorder} onChange={(v) => update("markerBorder", v)} />
        <ColorControl label="Marker icon" value={state.markerIconColor} onChange={(v) => update("markerIconColor", v)} />
        <ColorControl label="Active background" value={state.markerActiveBg} onChange={(v) => update("markerActiveBg", v)} />
        <ColorControl label="Active text" value={state.markerActiveText} onChange={(v) => update("markerActiveText", v)} />
        <ColorControl label="Completed background" value={state.markerCompletedBg} onChange={(v) => update("markerCompletedBg", v)} />
        <ColorControl label="Completed text" value={state.markerCompletedText} onChange={(v) => update("markerCompletedText", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Connector, card & text" subtitle="Connectors, event cards, and text.">
      <div className="space-y-4">
        <ColorControl label="Connector" value={state.connectorColor} onChange={(v) => update("connectorColor", v)} />
        <ColorControl label="Completed connector" value={state.connectorCompletedColor} onChange={(v) => update("connectorCompletedColor", v)} />
        <ColorControl label="Card background" value={state.itemCardBg} onChange={(v) => update("itemCardBg", v)} />
        <ColorControl label="Card border" value={state.itemCardBorder} onChange={(v) => update("itemCardBorder", v)} />
        <ColorControl label="Date" value={state.dateColor} onChange={(v) => update("dateColor", v)} />
        <ColorControl label="Event title" value={state.eventTitleColor} onChange={(v) => update("eventTitleColor", v)} />
        <ColorControl label="Body" value={state.bodyColor} onChange={(v) => update("bodyColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
