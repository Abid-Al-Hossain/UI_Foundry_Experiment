"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Input from "@/app/components/controls/input/Input";
import Slider from "@/app/components/controls/input/Slider";
import type { SliderState } from "../types";

type Props = { state: SliderState; update: <K extends keyof SliderState>(key: K, value: SliderState[K]) => void };

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
      <SectionCard title="Thumb & Track" subtitle="Native range input thumb and track colors.">
      <div className="space-y-4">
        <ColorControl label="Thumb background" value={state.thumbBg} onChange={(v) => update("thumbBg", v)} />
        <ColorControl label="Thumb border" value={state.thumbBorder} onChange={(v) => update("thumbBorder", v)} />
        <Input label="Thumb shadow (CSS box-shadow)" value={state.thumbShadow} onChange={(v) => update("thumbShadow", v)} />
        <ColorControl label="Track fill (before thumb)" value={state.trackFillBg} onChange={(v) => update("trackFillBg", v)} />
        <ColorControl label="Track background (after thumb)" value={state.trackBg} onChange={(v) => update("trackBg", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Ticks & Tooltip" subtitle="Step tick marks and value tooltip colors.">
      <div className="space-y-4">
        <ColorControl label="Ticks color" value={state.ticksColor} onChange={(v) => update("ticksColor", v)} />
        <Slider label="Ticks size (px)" value={state.ticksSize} min={2} max={12} step={1} onChange={(v) => update("ticksSize", v)} />
        <ColorControl label="Tooltip background" value={state.tooltipBg} onChange={(v) => update("tooltipBg", v)} />
        <ColorControl label="Tooltip text" value={state.tooltipText} onChange={(v) => update("tooltipText", v)} />
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
