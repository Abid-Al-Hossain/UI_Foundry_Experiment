"use client";

import React from "react";
import type { DividerState } from "../types";
import { SectionCard } from "@/app/components/controls/ui";
import SizeControl from "@/app/components/controls/input/SizeControl";

type SetterValue<T> = T | ((prev: T) => T);
type DividerSetter = <K extends keyof DividerState>(
  key: K,
) => (val: SetterValue<DividerState[K]>) => void;

export default function DividerSurfaceSection({
  state,
  setKey,
}: {
  state: DividerState;
  setKey: DividerSetter;
}) {
  return (
    <SectionCard title="Surface" subtitle="Line roundness and overall presence.">
      <div className="space-y-4">
        <SizeControl
          label="Corner Radius (px)"
          value={state.borderRadius}
          onChange={setKey("borderRadius")}
          min={0}
          max={999}
          step={1}
        />
        <SizeControl
          label="Opacity"
          value={state.opacity}
          onChange={setKey("opacity")}
          min={0}
          max={1}
          step={0.05}
        />
      </div>
    </SectionCard>
  );
}
