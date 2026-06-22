"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function PlacementSection({ state, update }: Props) {
  return (
    <SectionCard title="Placement" subtitle="Side, alignment, offset, and collision behavior.">
      <div className="space-y-4">
      <Select label="Side" value={state.side} options={[
  "top",
  "right",
  "bottom",
  "left"
]} onChange={(value) => update("side", value)} />
      <Select label="Align" value={state.align} options={[
  "start",
  "center",
  "end"
]} onChange={(value) => update("align", value)} />
      <Slider label="Offset" value={state.offset} min={0} max={40} step={1} onChange={(value) => update("offset", value)} />
      <Slider label="Collision padding" value={state.collisionPadding} min={0} max={48} step={1} onChange={(value) => update("collisionPadding", value)} />
      <Select label="Sticky" value={state.sticky} options={[
  "partial",
  "always",
  "none"
]} onChange={(value) => update("sticky", value)} />
    </div>
    </SectionCard>
  );
}
