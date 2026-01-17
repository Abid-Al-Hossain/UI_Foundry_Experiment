"use client";
import React from "react";
import { SectionCard } from "../../buttons/action/_section/ui";
import ColorControl from "@/app/components/controls/color/ColorControl";

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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">
            Show Status Dot
          </label>
          <input
            type="checkbox"
            checked={props.showDot}
            onChange={(e) => props.setShowDot(e.target.checked)}
            className="accent-blue-500 scale-125"
          />
        </div>

        {props.showDot && (
          <div className="pl-4 border-l-2 border-slate-700/50 space-y-4 mt-4">
            <ColorControl
              label="Dot Color"
              palette={PRESET_STATUS_COLORS}
              value={props.dotColor}
              onChange={props.setDotColor}
            />

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                Pulse Animation
              </label>
              <input
                type="checkbox"
                checked={props.dotPulse}
                onChange={(e) => props.setDotPulse(e.target.checked)}
                className="accent-blue-500 scale-125"
              />
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
