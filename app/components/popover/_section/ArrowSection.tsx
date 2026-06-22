"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import type { PopoverStudioState } from "../types";

type Props = {
  state: PopoverStudioState;
  update: <K extends keyof PopoverStudioState>(key: K, value: PopoverStudioState[K]) => void;
};

export default function ArrowSection({ state, update }: Props) {
  return (
    <SectionCard title="Arrow" subtitle="Popover arrow geometry.">
      <div className="space-y-4">
      <Switch label="Show arrow" checked={state.showArrow} onChange={(value) => update("showArrow", value)} />
      <Slider label="Arrow size" value={state.arrowSize} min={6} max={28} step={1} onChange={(value) => update("arrowSize", value)} />
      <Select label="Arrow shape" value={state.arrowShape} options={[
  "triangle",
  "rounded",
  "notch"
]} onChange={(value) => update("arrowShape", value)} />
    </div>
    </SectionCard>
  );
}
