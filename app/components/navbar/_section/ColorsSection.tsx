"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Input from "@/app/components/controls/input/Input";
import type { NavbarState } from "../types";

type Props = { state: NavbarState; update: <K extends keyof NavbarState>(key: K, value: NavbarState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Colors" subtitle="Colors controls for native layout/page-structure generation.">
      <div className="space-y-4">
        <ColorControl label="Accent" value={state.accent} onChange={(value) => update("accent", value)} />
        <ColorControl label="Background" value={state.background} onChange={(value) => update("background", value)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(value) => update("foreground", value)} />
        <ColorControl label="Muted text" value={state.muted} onChange={(value) => update("muted", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Nav Item States" subtitle="Active and hover colors for nav links.">
      <div className="space-y-4">
        <ColorControl label="Active background" value={state.activeItemBg} onChange={(value) => update("activeItemBg", value)} />
        <ColorControl label="Active text" value={state.activeItemText} onChange={(value) => update("activeItemText", value)} />
        <ColorControl label="Active border" value={state.activeItemBorder} onChange={(value) => update("activeItemBorder", value)} />
        <ColorControl label="Hover background" value={state.hoverItemBg} onChange={(value) => update("hoverItemBg", value)} />
        <ColorControl label="Hover text" value={state.hoverItemText} onChange={(value) => update("hoverItemText", value)} />
        <ColorControl label="Hover border" value={state.hoverItemBorder} onChange={(value) => update("hoverItemBorder", value)} />
        <ColorControl label="Active page indicator" value={state.indicatorColor} onChange={(value) => update("indicatorColor", value)} />
        <SizeControl label="Indicator height (px)" value={state.indicatorHeight} onChange={(v) => update("indicatorHeight", v)} min={1} max={6} step={1} />
      </div>
    </SectionCard>
      <SectionCard title="Mobile Menu" subtitle="Mobile drawer/stack panel styling.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.mobileMenuBg} onChange={(value) => update("mobileMenuBg", value)} />
        <ColorControl label="Border" value={state.mobileMenuBorder} onChange={(value) => update("mobileMenuBorder", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Logo" subtitle="Brand mark size and corner radius.">
      <div className="space-y-4">
        <SizeControl label="Size (px)" value={state.logoSize} onChange={(v) => update("logoSize", v)} min={16} max={64} step={2} />
        <SizeControl label="Radius (px)" value={state.logoRadius} onChange={(v) => update("logoRadius", v)} min={0} max={32} step={1} />
      </div>
    </SectionCard>
      <SectionCard title="Dropdown Panel" subtitle="Sub-menu panel styling when a nav item has a dropdown.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.dropdownBg} onChange={(value) => update("dropdownBg", value)} />
        <ColorControl label="Border" value={state.dropdownBorder} onChange={(value) => update("dropdownBorder", value)} />
        <Input label="Shadow (CSS box-shadow)" value={state.dropdownShadow} onChange={(value) => update("dropdownShadow", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
