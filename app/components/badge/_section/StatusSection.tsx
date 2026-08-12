"use client";
import React from "react";
import { SectionCard } from "@/app/components/controls/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";
import Switch from "@/app/components/controls/input/Switch";

const PRESET_STATUS_COLORS = ["#ef4444", "#10b981", "#f59e0b", "#64748b"];

export default function StatusSection(props: {
  showDot: boolean;
  setShowDot: (v: boolean) => void;
  dotColor: string;
  setDotColor: (v: string) => void;
  dotPulse: boolean;
  setDotPulse: (v: boolean) => void;
}) {
  return (
    <SectionCard title="Status Indicator" subtitle="Dot and pulse signals.">
      <div className="space-y-4">
        <Switch
          label={<>Show Status Dot</>}
          checked={props.showDot}
          onChange={(checked) => props.setShowDot(checked)}
        />

        {props.showDot && (
          <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
            <ColorControl
              label="Dot Color"
              palette={PRESET_STATUS_COLORS}
              value={props.dotColor}
              onChange={props.setDotColor}
            />

            <Switch
              label={<>Pulse Animation</>}
              checked={props.dotPulse}
              onChange={(checked) => props.setDotPulse(checked)}
            />
          </div>
        )}
      </div>
    </SectionCard>
  );
}
