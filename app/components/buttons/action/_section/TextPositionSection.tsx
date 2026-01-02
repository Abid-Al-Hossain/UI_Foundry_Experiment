"use client";

import React from "react";
import { SectionCard } from "./ui";

export type AlignKey =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export default function TextPositionSection(props: {
  align: AlignKey;
  setAlign: (v: AlignKey) => void;
}) {
  const { align, setAlign } = props;

  return (
    <SectionCard title="Text Position" subtitle="Align the label inside the button.">
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            ["top-left", "TL"],
            ["top-center", "TC"],
            ["top-right", "TR"],
            ["middle-left", "ML"],
            ["middle-center", "MC"],
            ["middle-right", "MR"],
            ["bottom-left", "BL"],
            ["bottom-center", "BC"],
            ["bottom-right", "BR"],
          ] as const
        ).map(([key, label2]) => (
          <button
            key={key}
            type="button"
            onClick={() => setAlign(key)}
            className="rounded-xl border px-3 py-2 text-sm font-semibold transition uf-clickable"
            style={{
              borderColor: "var(--border)",
              background: align === key ? "var(--primary)" : "color-mix(in oklab, var(--surface) 65%, transparent)",
              color: align === key ? "white" : "var(--text)",
            }}
          >
            {label2}
          </button>
        ))}
      </div>
    </SectionCard>
  );
}
