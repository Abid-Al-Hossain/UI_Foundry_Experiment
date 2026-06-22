"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { ToastState } from "../types";

type Props = { state: ToastState; update: <K extends keyof ToastState>(key: K, value: ToastState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Severity" subtitle="Toast severity level for color and icon.">
        <Select label="Severity" value={state.severity} options={["info", "success", "warning", "error"]} onChange={(value) => update("severity", value)} />
      </SectionCard>
      <SectionCard title="Variant" subtitle="Toast surface style.">
        <Select label="Variant" value={state.toastVariant} options={["filled", "outlined", "standard", "left-accent"]} onChange={(value) => update("toastVariant", value as ToastState["toastVariant"])} />
      </SectionCard>
      <SectionCard title="Timing & Stack" subtitle="Auto-dismiss duration and stack count.">
      <div className="space-y-4">
        <Slider label="Duration (ms)" value={state.duration} min={1000} max={10000} step={500} onChange={(value) => update("duration", value)} />
        <Slider label="Stack count" value={state.stackCount} min={1} max={5} step={1} onChange={(value) => update("stackCount", value)} />
        <Slider label="Max toasts" value={state.maxToasts} min={1} max={8} step={1} onChange={(value) => update("maxToasts", value)} />
        <Slider label="Stack gap" value={state.stackGap} min={0} max={32} step={1} onChange={(value) => update("stackGap", value)} />
        <Slider label="Stack offset" value={state.stackOffset} min={0} max={20} step={1} onChange={(value) => update("stackOffset", value)} />
        <Slider label="Stack scale ratio" value={state.stackScaleRatio} min={0} max={0.12} step={0.01} onChange={(value) => update("stackScaleRatio", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Geometry & progress" subtitle="Toast radius, icon size, and progress bar.">
      <div className="space-y-4">
        <Slider label="Toast radius" value={state.toastRadius} min={0} max={32} step={1} onChange={(value) => update("toastRadius", value)} />
        <Slider label="Icon size" value={state.iconSize} min={10} max={28} step={1} onChange={(value) => update("iconSize", value)} />
        <Switch label="Progress bar" checked={state.progressBarEnabled} onChange={(value) => update("progressBarEnabled", value)} />
        <Slider label="Progress height" value={state.progressBarHeight} min={1} max={8} step={1} onChange={(value) => update("progressBarHeight", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Actions" subtitle="Action button and dismiss controls.">
      <div className="space-y-4">
        <Switch label="Show action" checked={state.showAction} onChange={(value) => update("showAction", value)} />
        <Switch label="Dismissible" checked={state.dismissible} onChange={(value) => update("dismissible", value)} />
        <Switch label="Pause on hover" checked={state.pauseOnHover} onChange={(value) => update("pauseOnHover", value)} />
        <Switch label="Pause on window blur" checked={state.pauseOnWindowBlur} onChange={(value) => update("pauseOnWindowBlur", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
