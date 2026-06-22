"use client";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import ColorControl from "@/app/components/controls/color/ColorControl";
import type { ToastState } from "../types";

type Props = { state: ToastState; update: <K extends keyof ToastState>(key: K, value: ToastState[K]) => void };

export default function ColorsSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Shell" subtitle="Toast container colors.">
      <div className="space-y-4">
        <ColorControl label="Background" value={state.background} onChange={(v) => update("background", v)} />
        <ColorControl label="Foreground" value={state.foreground} onChange={(v) => update("foreground", v)} />
        <ColorControl label="Accent" value={state.accent} onChange={(v) => update("accent", v)} />
        <ColorControl label="Muted" value={state.muted} onChange={(v) => update("muted", v)} />
        <ColorControl label="Border" value={state.border} onChange={(v) => update("border", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Severity Palette" subtitle="Per-severity accent colors (overridden by Accent above).">
      <div className="space-y-4">
        <ColorControl label="Info" value={state.infoColor} onChange={(v) => update("infoColor", v)} />
        <ColorControl label="Success" value={state.successColor} onChange={(v) => update("successColor", v)} />
        <ColorControl label="Warning" value={state.warningColor} onChange={(v) => update("warningColor", v)} />
        <ColorControl label="Error" value={state.errorColor} onChange={(v) => update("errorColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Actions & Controls" subtitle="Action button and dismiss colors.">
      <div className="space-y-4">
        <ColorControl label="Action text" value={state.actionText} onChange={(v) => update("actionText", v)} />
        <ColorControl label="Action background" value={state.actionBg} onChange={(v) => update("actionBg", v)} />
        <ColorControl label="Action border" value={state.actionBorder} onChange={(v) => update("actionBorder", v)} />
        <ColorControl label="Action hover background" value={state.actionHoverBg} onChange={(v) => update("actionHoverBg", v)} />
        <ColorControl label="Dismiss border" value={state.dismissBorder} onChange={(v) => update("dismissBorder", v)} />
        <ColorControl label="Dismiss text" value={state.dismissColor} onChange={(v) => update("dismissColor", v)} />
        <ColorControl label="Dismiss hover background" value={state.dismissHoverBg} onChange={(v) => update("dismissHoverBg", v)} />
        <ColorControl label="Dismiss hover text" value={state.dismissHoverColor} onChange={(v) => update("dismissHoverColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Surface & icon" subtitle="Base toast surface and severity icon.">
      <div className="space-y-4">
        <ColorControl label="Toast background" value={state.toastBg} onChange={(v) => update("toastBg", v)} />
        <ColorControl label="Toast border" value={state.toastBorder} onChange={(v) => update("toastBorder", v)} />
        <ColorControl label="Icon" value={state.iconColor} onChange={(v) => update("iconColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Severity surfaces" subtitle="Per-severity background and border.">
      <div className="space-y-4">
        <ColorControl label="Info background" value={state.infoBg} onChange={(v) => update("infoBg", v)} />
        <ColorControl label="Info border" value={state.infoBorderColor} onChange={(v) => update("infoBorderColor", v)} />
        <ColorControl label="Success background" value={state.successBg} onChange={(v) => update("successBg", v)} />
        <ColorControl label="Success border" value={state.successBorderColor} onChange={(v) => update("successBorderColor", v)} />
        <ColorControl label="Warning background" value={state.warningBg} onChange={(v) => update("warningBg", v)} />
        <ColorControl label="Warning border" value={state.warningBorderColor} onChange={(v) => update("warningBorderColor", v)} />
        <ColorControl label="Error background" value={state.errorBg} onChange={(v) => update("errorBg", v)} />
        <ColorControl label="Error border" value={state.errorBorderColor} onChange={(v) => update("errorBorderColor", v)} />
      </div>
    </SectionCard>
      <SectionCard title="Progress bar" subtitle="Auto-dismiss countdown bar colors.">
      <div className="space-y-4">
        <ColorControl label="Progress fill" value={state.progressBarColor} onChange={(v) => update("progressBarColor", v)} />
        <ColorControl label="Progress track" value={state.progressBarBg} onChange={(v) => update("progressBarBg", v)} />
      </div>
    </SectionCard>
    </div>
  );
}
