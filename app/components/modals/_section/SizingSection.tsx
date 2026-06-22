"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Slider from "@/app/components/controls/input/Slider";
import { SegmentedControl } from "@/app/components/controls/input/SegmentedControl";
import type { ModalState } from "../types";

type Props = { state: ModalState; update: <K extends keyof ModalState>(key: K, value: ModalState[K]) => void };

export default function SizingSection({ state, update }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Sizing" subtitle="Sizing controls for native modal generation.">
      <div className="space-y-4">
        <Slider label="Width" value={state.width} min={220} max={900} step={1} onChange={(value) => update("width", value)} />
        <Slider label="Height" value={state.height} min={120} max={720} step={1} onChange={(value) => update("height", value)} />
        <Slider label="Gap" value={state.gap} min={0} max={48} step={1} onChange={(value) => update("gap", value)} />
        <Slider label="Padding" value={state.padding} min={8} max={64} step={1} onChange={(value) => update("padding", value)} />
      </div>
    </SectionCard>
      <SectionCard title="Dialog size & motion" subtitle="Max-width variant, height cap, and entrance.">
      <div className="space-y-4">
        <SegmentedControl
          label="Width variant"
          value={state.widthVariant}
          options={[{ label: "SM", value: "sm" }, { label: "MD", value: "md" }, { label: "LG", value: "lg" }, { label: "XL", value: "xl" }, { label: "Full", value: "full" }]}
          onChange={(value) => update("widthVariant", value as ModalState["widthVariant"])}
        />
        <Slider label="Max height" value={state.maxHeight} min={320} max={900} step={1} onChange={(value) => update("maxHeight", value)} />
        <Slider label="Overlay opacity" value={state.overlayOpacity} min={0} max={1} step={0.01} onChange={(value) => update("overlayOpacity", value)} />
        <Slider label="Close icon size" value={state.closeIconSize} min={10} max={28} step={1} onChange={(value) => update("closeIconSize", value)} />
        <SegmentedControl
          label="Animation"
          value={state.animationType}
          options={[{ label: "Fade", value: "fade" }, { label: "Scale", value: "scale" }, { label: "Slide up", value: "slide-up" }, { label: "Slide down", value: "slide-down" }]}
          onChange={(value) => update("animationType", value as ModalState["animationType"])}
        />
      </div>
    </SectionCard>
    </div>
  );
}
