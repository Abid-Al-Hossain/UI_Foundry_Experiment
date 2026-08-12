"use client";

import React from "react";
import { SectionCard } from "./ui";
import Switch from "@/app/components/controls/input/Switch";

export default function StatePreviewSection(props: {
  forceHover: boolean;
  setForceHover: (v: boolean) => void;

  forceActive: boolean;
  setForceActive: (v: boolean) => void;

  forceFocus: boolean;
  setForceFocus: (v: boolean) => void;
}) {
  return (
    <SectionCard title="State Preview" subtitle="Force states in the preview.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Switch
          label={<>Force hover</>}
          checked={props.forceHover}
          onChange={(checked) => props.setForceHover(checked)}
        />
        <Switch
          label={<>Force active</>}
          checked={props.forceActive}
          onChange={(checked) => props.setForceActive(checked)}
        />
        <Switch
          label={<>Force focus</>}
          checked={props.forceFocus}
          onChange={(checked) => props.setForceFocus(checked)}
        />
      </div>
    </SectionCard>
  );
}
