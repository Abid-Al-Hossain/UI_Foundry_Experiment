"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { ListState } from "../types";

type Props = { state: ListState; update: <K extends keyof ListState>(key: K, value: ListState[K]) => void };

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
      <SectionCard title="Item states" subtitle="Default, hover, and selected item colors.">
      <div className="space-y-4">
        <ColorControl label="Selected background" value={state.itemActiveBg} onChange={(v) => update("itemActiveBg", v)} />
        <ColorControl label="Item background" value={state.itemBg} onChange={(v) => update("itemBg", v)} />
        <ColorControl label="Item text" value={state.itemText} onChange={(v) => update("itemText", v)} />
        <ColorControl label="Hover background" value={state.itemHoverBg} onChange={(v) => update("itemHoverBg", v)} />
        <ColorControl label="Hover text" value={state.itemHoverText} onChange={(v) => update("itemHoverText", v)} />
        <ColorControl label="Selected text" value={state.itemSelectedText} onChange={(v) => update("itemSelectedText", v)} />
        <ColorControl label="Selected border" value={state.itemSelectedBorder} onChange={(v) => update("itemSelectedBorder", v)} />
        <ColorControl label="Disabled text" value={state.itemDisabledColor} onChange={(v) => update("itemDisabledColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Dividers, badge & avatar" subtitle="Secondary text, status badge, and avatar.">
      <div className="space-y-4">
        <ColorControl label="Divider" value={state.dividerColor} onChange={(v) => update("dividerColor", v)} />
        <ColorControl label="Secondary text" value={state.secondaryTextColor} onChange={(v) => update("secondaryTextColor", v)} />
        <ColorControl label="Badge background" value={state.badgeBg} onChange={(v) => update("badgeBg", v)} />
        <ColorControl label="Badge text" value={state.badgeText} onChange={(v) => update("badgeText", v)} />
        <ColorControl label="Badge border" value={state.badgeBorder} onChange={(v) => update("badgeBorder", v)} />
        <ColorControl label="Leading icon" value={state.leadingIconColor} onChange={(v) => update("leadingIconColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
