"use client";

import React from "react";
import { SectionCard } from "./ui";
import SizeControl from "./SizeControl";

export default function ActiveStateSection(props: {
  idActive: string;

  activeEnabled: boolean;
  setActiveEnabled: (v: boolean) => void;

  activeTranslateYText: string;
  setActiveTranslateYText: (v: string) => void;
  activeTranslateY: number;

  activeScaleText: string;
  setActiveScaleText: (v: string) => void;
  activeScale: number;
}) {
  const {
    idActive,
    activeEnabled,
    setActiveEnabled,
    activeTranslateYText,
    setActiveTranslateYText,
    activeTranslateY,
    activeScaleText,
    setActiveScaleText,
    activeScale,
  } = props;

  return (
    <SectionCard title="Active State" subtitle="Press feedback (translate + scale).">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2">
          <input
            id={idActive}
            type="checkbox"
            checked={activeEnabled}
            onChange={(e) => setActiveEnabled(e.target.checked)}
          />
          <label htmlFor={idActive} className="text-sm uf-clickable" style={{ color: "var(--text)" }}>
            Enable active press effect
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SizeControl
            label={`Active translateY (${activeTranslateY}px)`}
            valueText={activeTranslateYText}
            setValueText={setActiveTranslateYText}
            min={-8}
            max={8}
          />
          <SizeControl
            label={`Active scale (${activeScale})`}
            valueText={activeScaleText}
            setValueText={setActiveScaleText}
            min={0.8}
            max={1.2}
            step={0.01}
          />
        </div>
      </div>
    </SectionCard>
  );
}
