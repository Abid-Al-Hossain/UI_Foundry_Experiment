"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { BreadcrumbState } from "../types";

type Props = { state: BreadcrumbState; update: <K extends keyof BreadcrumbState>(key: K, value: BreadcrumbState[K]) => void };

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
      <SectionCard title="Crumb Links" subtitle="Ancestor (non-current) breadcrumb item colors.">
      <div className="space-y-4">
        <ColorControl label="Link text" value={state.linkColor} onChange={(v) => update("linkColor", v)} />
        <ColorControl label="Link border" value={state.linkBorder} onChange={(v) => update("linkBorder", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Current Crumb" subtitle="Active page breadcrumb item colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.currentBg} onChange={(v) => update("currentBg", v)} />
        <ColorControl label="Text" value={state.currentText} onChange={(v) => update("currentText", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Separator & Collapse" subtitle="Separator character and collapsed ellipsis colors.">
      <div className="space-y-4">
        <ColorControl label="Separator" value={state.separatorColor} onChange={(v) => update("separatorColor", v)} />
        <ColorControl label="Collapsed border" value={state.collapsedBorder} onChange={(v) => update("collapsedBorder", v)} />
        <ColorControl label="Collapsed text" value={state.collapsedColor} onChange={(v) => update("collapsedColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
