"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import type { SelectStudioState } from "../types";

type Props = { state: SelectStudioState; update: <K extends keyof SelectStudioState>(key: K, value: SelectStudioState[K]) => void };

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
      <SectionCard title="Active Item" subtitle="Selected or hovered option highlight.">
      <div className="space-y-4">
        <ColorControl label="Active background" value={state.itemActiveBg} onChange={(v) => update("itemActiveBg", v)} />
        <ColorControl label="Selected text" value={state.optionSelectedText} onChange={(v) => update("optionSelectedText", v)} />
        <ColorControl label="Hovered/focused background" value={state.optionActiveBg} onChange={(v) => update("optionActiveBg", v)} />
        <ColorControl label="Hovered/focused text" value={state.optionActiveText} onChange={(v) => update("optionActiveText", v)} />
        <ColorControl label="Disabled option text" value={state.optionDisabledColor} onChange={(v) => update("optionDisabledColor", v)} />
        <ColorControl label="Checkmark" value={state.checkmarkColor} onChange={(v) => update("checkmarkColor", v)} />
        <ColorControl label="Chevron" value={state.chevronColor} onChange={(v) => update("chevronColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Dropdown Panel" subtitle="Custom listbox/combobox panel sizing and elevation.">
      <div className="space-y-4">
        <Slider label="Max height (px)" value={state.listMaxHeight} min={120} max={480} step={10} onChange={(v) => update("listMaxHeight", v)} />
        <Input label="Shadow (CSS box-shadow)" value={state.listShadow} onChange={(v) => update("listShadow", v)} />
      </div>
    </SectionCard>
      <SectionCard title="State Colors" subtitle="Status-driven accent colors.">
      <div className="space-y-4">
        <ColorControl label="Error" value={state.errorColor} onChange={(v) => update("errorColor", v)} />
        <ColorControl label="Success" value={state.successColor} onChange={(v) => update("successColor", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
