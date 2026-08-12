"use client";

import React from "react";
import { SectionCard, Segmented } from "./ui";
import SizeControl from "@/app/components/controls/input/SizeControl";
import Switch from "@/app/components/controls/input/Switch";

export type GroupAlign = "left" | "center" | "right";

export default function GroupPreviewSection(props: {
  groupEnabled: boolean;
  setGroupEnabled: (v: boolean) => void;

  groupAlign: GroupAlign;
  setGroupAlign: (v: GroupAlign) => void;

  groupGapText: string;
  setGroupGapText: (v: string) => void;
  groupGapPx: number;
}) {
  return (
    <SectionCard title="Button Group" subtitle="Alignment and spacing preview.">
      <div className="space-y-4">
        <Switch
          label={<>Show group preview</>}
          checked={props.groupEnabled}
          onChange={(checked) => props.setGroupEnabled(checked)}
        />

        <div className="space-y-2">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Alignment
          </div>
          <Segmented
            value={props.groupAlign}
            onChange={(v) => props.setGroupAlign(v as GroupAlign)}
            items={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
          />
        </div>

        <SizeControl
          label={`Spacing (${props.groupGapPx}px)`}
          value={Number(props.groupGapText) || 0}
          onChange={(v) => props.setGroupGapText(String(v))}
          min={0}
          max={32}
          step={1}
        />
      </div>
    </SectionCard>
  );
}
