"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { DrawerState } from "../types";

type Props = { state: DrawerState; update: <K extends keyof DrawerState>(key: K, value: DrawerState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Sizing" subtitle="Sizing controls for native drawer generation.">
      <div className="space-y-4">
        <Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
        <Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
        <Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
        <Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Motion & handle" subtitle="Entrance animation, overlay, and swipe handle.">
      <div className="space-y-4">
        <SegmentedControl
          label="Animation"
          value={state.animationType}
          options={[{ label: "Slide", value: "slide" }, { label: "Fade", value: "fade" }, { label: "Scale", value: "scale" }]}
          onChange={(value) => update("animationType", value as DrawerState["animationType"])}
        />
        <Slider label="Overlay opacity" value={state.overlayOpacity} min={0} max={1} step={0.01} onChange={(value) => update("overlayOpacity", value)} />
        <Slider label="Close icon size" value={state.closeIconSize} min={10} max={28} step={1} onChange={(value) => update("closeIconSize", value)} />
        <Switch label="Show handle" checked={state.handleVisible} onChange={(value) => update("handleVisible", value)} />
        <Slider label="Handle width" value={state.handleWidth} min={16} max={80} step={1} onChange={(value) => update("handleWidth", value)} />
      </div>
    </SectionCard>
    </div>
  );
}
