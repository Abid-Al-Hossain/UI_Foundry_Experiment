"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import Slider from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { AlertState } from "../types";

type Props = { state: AlertState; update: <K extends keyof AlertState>(key: K, value: AlertState[K]) => void };

export default function BehaviorSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Severity" subtitle="Alert severity level and icon display.">
      <div className="space-y-4">
        <Select label="Severity" value={state.severity} options={["info", "success", "warning", "error"]} onChange={(value) => update("severity", value)} />
        <Select label="Icon mode" value={state.iconMode} options={["status", "none"]} onChange={(value) => update("iconMode", value)} />
        <Slider label="Icon size" value={state.iconSize} min={10} max={28} step={1} onChange={(value) => update("iconSize", value)} />
        <SegmentedControl
          label="Icon position"
          value={state.iconPosition}
          options={[{ label: "Left", value: "left" }, { label: "Right", value: "right" }]}
          onChange={(value) => update("iconPosition", value as AlertState["iconPosition"])}
        />
      </div>
    </SectionCard>
      <SectionCard title="Variant" subtitle="Alert surface style.">
        <Select label="Variant" value={state.alertVariant} options={["filled", "outlined", "standard", "left-accent"]} onChange={(value) => update("alertVariant", value as AlertState["alertVariant"])} />
      </SectionCard>
      <SectionCard title="Actions" subtitle="Inline action buttons within the alert.">
      <div className="space-y-4">
        <Switch label="Show actions" checked={state.showActions} onChange={(value) => update("showActions", value)} />
        <Switch label="Dismissible" checked={state.dismissible} onChange={(value) => update("dismissible", value)} />
        <Switch label="Auto-dismiss" checked={state.autoDismiss} onChange={(value) => update("autoDismiss", value)} />
        <Slider label="Auto-dismiss (ms)" value={state.autoDismissDuration} min={1000} max={10000} step={500} onChange={(value) => update("autoDismissDuration", value)} />
        <Switch label="Disabled" checked={state.disabled} onChange={(value) => update("disabled", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
