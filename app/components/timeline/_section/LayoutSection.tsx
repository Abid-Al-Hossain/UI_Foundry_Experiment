"use client";

import { SectionCard } from "@/app/components/controls/layout/SectionCard";
import Select from "@/app/components/controls/input/Select";
import Switch from "@/app/components/controls/input/Switch";
import type { TimelineState } from "../types";

type Props = { state: TimelineState; update: <K extends keyof TimelineState>(key: K, value: TimelineState[K]) => void };

export default function LayoutSection({ state, update }: Props) {
  return <SectionCard title="Layout" subtitle="Layout controls for native timeline generation.">
      <div className="space-y-4"><Select label="Orientation" value={state.orientation} options={[
  "horizontal",
  "vertical"
]} onChange={(value) => update("orientation", value)} />
<Switch label="Alternating vertical cards" checked={state.alternating} onChange={(value) => update("alternating", value)} />
<Select label="Marker style" value={state.markerStyle} options={[
  "dot",
  "number",
  "icon"
]} onChange={(value) => update("markerStyle", value)} />
<Select label="Connector style" value={state.connectorStyle} options={[
  "solid",
  "dashed",
  "dotted"
]} onChange={(value) => update("connectorStyle", value)} />
<Select label="Date placement" value={state.datePlacement} options={[
  "side",
  "top",
  "hidden"
]} onChange={(value) => update("datePlacement", value)} /></div>
    </SectionCard>;
}
