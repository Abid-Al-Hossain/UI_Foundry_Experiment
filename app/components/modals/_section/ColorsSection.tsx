"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

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
      <SectionCard title="Overlay & header" subtitle="Backdrop and dialog header.">
      <div className="space-y-4">
        <ColorControl label="Overlay" value={state.overlayBg} onChange={(v) => update("overlayBg", v)} />
        <ColorControl label="Header background" value={state.headerBg} onChange={(v) => update("headerBg", v)} />
        <ColorControl label="Header text" value={state.headerText} onChange={(v) => update("headerText", v)} />
        <ColorControl label="Header border" value={state.headerBorder} onChange={(v) => update("headerBorder", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Footer & dividers" subtitle="Dialog footer and divider lines.">
      <div className="space-y-4">
        <ColorControl label="Footer background" value={state.footerBg} onChange={(v) => update("footerBg", v)} />
        <ColorControl label="Footer border" value={state.footerBorder} onChange={(v) => update("footerBorder", v)} />
        <ColorControl label="Divider" value={state.dividerColor} onChange={(v) => update("dividerColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Close button" subtitle="Header close control.">
      <div className="space-y-4">
        <ColorControl label="Close icon" value={state.closeIconColor} onChange={(v) => update("closeIconColor", v)} />
        <ColorControl label="Close hover background" value={state.closeIconHoverBg} onChange={(v) => update("closeIconHoverBg", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Action buttons" subtitle="Primary and secondary button colors.">
      <div className="space-y-4">
        <ColorControl label="Primary background" value={state.primaryBg} onChange={(v) => update("primaryBg", v)} />
        <ColorControl label="Primary text" value={state.primaryText} onChange={(v) => update("primaryText", v)} />
        <ColorControl label="Primary hover background" value={state.primaryHoverBg} onChange={(v) => update("primaryHoverBg", v)} />
        <ColorControl label="Secondary background" value={state.secondaryBg} onChange={(v) => update("secondaryBg", v)} />
        <ColorControl label="Secondary text" value={state.secondaryText} onChange={(v) => update("secondaryText", v)} />
        <ColorControl label="Secondary border" value={state.secondaryBorder} onChange={(v) => update("secondaryBorder", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
