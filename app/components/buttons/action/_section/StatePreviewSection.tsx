"use client";

import React from "react";
import { SectionCard } from "./ui";

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
        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.forceHover}
            onChange={(e) => props.setForceHover(e.target.checked)}
            className="uf-clickable"
          />
          Force hover
        </label>
        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.forceActive}
            onChange={(e) => props.setForceActive(e.target.checked)}
            className="uf-clickable"
          />
          Force active
        </label>
        <label className="flex items-center gap-2 text-sm uf-clickable" style={{ color: "var(--text)" }}>
          <input
            type="checkbox"
            checked={props.forceFocus}
            onChange={(e) => props.setForceFocus(e.target.checked)}
            className="uf-clickable"
          />
          Force focus
        </label>
      </div>
    </SectionCard>
  );
}
