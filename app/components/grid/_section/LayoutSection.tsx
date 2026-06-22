"use client";

import Select from "@/app/components/controls/input/Select";
import Slider from "@/app/components/controls/input/Slider";
import Switch from "@/app/components/controls/input/Switch";
import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import type { GridState } from "../types";

type Props = { state: GridState; update: <K extends keyof GridState>(key: K, value: GridState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return (
    <SectionCard title="Layout" subtitle="Template, packing, and layout variant controls for native grid generation.">
      <div className="space-y-4">
      <Select
        label="Auto mode"
        value={state.autoMode}
        options={[
          { value: "fit", label: "auto-fit minmax" },
          { value: "fill", label: "auto-fill minmax" },
          { value: "fixed", label: "fixed columns" },
        ]}
        onChange={(value) => update("autoMode", value)}
      />
      <Select
        label="Layout variant"
        value={state.layoutVariant ?? "balanced"}
        options={[
          { value: "balanced", label: "Balanced cards" },
          { value: "feature", label: "Feature lead" },
          { value: "mosaic", label: "Mosaic spans" },
          { value: "dashboard", label: "Dashboard rhythm" },
        ]}
        onChange={(value) => update("layoutVariant", value)}
      />
      <Select
        label="Justify items"
        value={state.justifyItems ?? "stretch"}
        options={["stretch", "start", "center", "end"]}
        onChange={(value) => update("justifyItems", value)}
      />
      <Select
        label="Align items"
        value={state.alignItems ?? "stretch"}
        options={["stretch", "start", "center", "end"]}
        onChange={(value) => update("alignItems", value)}
      />
      <Slider label="Columns" value={state.columns} min={1} max={8} step={1} onChange={(value) => update("columns", value)} />
      <Slider label="Rows" value={state.rows} min={1} max={8} step={1} onChange={(value) => update("rows", value)} />
      <Slider label="Min item width" value={state.itemMin} min={80} max={320} step={4} onChange={(value) => update("itemMin", value)} />
      <Switch label="Dense packing" checked={state.dense} onChange={(value) => update("dense", value)} />
      <p className="text-sm leading-6" style={{ color: "var(--muted)" }} data-audit="grid-responsive-note" data-testid="grid-responsive-note">
        Responsive export note: auto-fit and auto-fill emit repeat(auto-*, minmax(itemMin, 1fr)); fixed columns emit repeat(columns, minmax(0, 1fr)) with max-width constrained to the preview shell.
      </p>
    </div>
    </SectionCard>
  );
}
